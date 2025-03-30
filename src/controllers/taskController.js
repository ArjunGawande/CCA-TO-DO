const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, completed = false, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const newTask = await prisma.task.create({
            data: { 
                title, 
                description, 
                completed: completed === "true" || completed === true, 
                userId
            },
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received ID:", id); // Debugging: Check if ID is received correctly

        const existingTask = await prisma.task.findUnique({ where: { id } });

        if (!existingTask) {
            console.log("Task not found for ID:", id); // Debugging: Check if task exists
            return res.status(404).json({ error: 'Task not found' });
        }

        const { title, description, completed } = req.body;

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { title, description, completed },
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: 'Failed to update task' });
    }
};


// Delete a task

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const cleanId = id.replace(/^:/, ''); 

        console.log("Clean ID:", cleanId);  

        const existingTask = await prisma.task.findUnique({
            where: { id: cleanId }
        });

        if (!existingTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        await prisma.task.delete({ where: { id: cleanId } });
        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
};
module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
};
