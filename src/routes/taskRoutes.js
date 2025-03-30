const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');
const verifyToken = require('../middleware/authMiddleware.js');
// Define routes for tasks
router.get('/',verifyToken, getAllTasks);         // GET /api/tasks
router.post('/',verifyToken, createTask);      // POST /api/tasks
router.put('/:id',verifyToken, updateTask);    // PUT /api/tasks/:id
router.delete('/:id',verifyToken, deleteTask); // DELETE /api/tasks/:id

module.exports = router;
