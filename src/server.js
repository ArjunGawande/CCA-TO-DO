const express = require('express');
const cors = require('cors');
const taskrouter = require('./routes/taskRoutes.js');
const authrouter = require('./routes/authRoutes.js');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser'); 
// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Routes
app.use('/api/tasks', taskrouter);
app.use('/api/auth', authrouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
