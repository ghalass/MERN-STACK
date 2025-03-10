const express = require('express')
const router = express.Router()
const authController = require("../controllers/authController")

// register route
router.post('/register', authController.register)

// login route
router.post('/login', authController.login)

// refresh access token route
router.get('/refresh', authController.refresh)

// logout route
router.post('/logout', authController.logout)

module.exports = router