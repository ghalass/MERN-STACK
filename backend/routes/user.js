const express = require('express')

// controller functions
const { loginUser, signupUser, getByEmail, changePassword,
    getUsers, updateUser
} = require('../controllers/userController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// require auth for all routes bellow
router.use(requireAuth)

// get user route
router.post('/getByEmail', getByEmail)

// get user route
router.post('/changePassword', changePassword)

// GET all users
router.get('/users', getUsers)

// UPDATE an user
router.patch('/updateUser', updateUser)

module.exports = router