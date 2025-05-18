const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ IMPORT your controller functions
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);


module.exports = router;
