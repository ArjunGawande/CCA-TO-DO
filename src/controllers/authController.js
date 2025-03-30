const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        const token = generateToken(user.id);

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: false, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        });

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ error: 'Signup failed' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id);

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: false, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        });
        console.log(token); 
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};


module.exports = { signup,login };
