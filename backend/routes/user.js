const express = require('express')

// controller functions
const { loginUser, signupUser, getByEmail, changePassword,
    getUsers, updateUser, refresh, deleteUser, logoutUser, checkToken
} = require('../controllers/userController')

const requireAuth = require('../middleware/requireAuth')
const checkRole = require('../middleware/checkRole')

const router = express.Router()

// login route
router.post('/login', loginUser)

// logout route
router.post('/logout', logoutUser)



// refresh route
router.post('/refresh', refresh)

// checktoken route
router.get('/checktoken', checkToken)

/********* REQUIRE AUTH FOR ALL ROUTES BELLOW *********/
router.use(requireAuth)

// get user route
router.post('/getByEmail', getByEmail)

// get user route
router.post('/changePassword', changePassword)

// GET ALL USERS
router.get('/users', getUsers)

// CREATE A NEW ROUTE ==> ONLY ADMIN IS ALLOWRD
router.post('/signup', checkRole(['ADMIN']), signupUser)

// UPDATE AN USER
router.patch('/updateUser', checkRole(['ADMIN']), updateUser)

// DELETE AN USER
router.delete('/:id', checkRole(['ADMIN']), deleteUser)

module.exports = router