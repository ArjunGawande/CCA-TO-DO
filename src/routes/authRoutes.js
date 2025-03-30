const express = require('express');
const router = express.Router();
const { signup,login  } = require('../controllers/authController');

//inko protected routes nahi karna hai kyunki signup aur login protected nahi hote
router.post('/signup',signup);
router.post('/login',login);

module.exports = router;