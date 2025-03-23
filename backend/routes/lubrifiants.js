const express = require('express')

// controller functions
const {
    createLubrifiant,
    getLubrifiants,
    deleteLubrifiant,
    updateLubrifiant
} = require('../controllers/lubrifiantController')

const requireAuth = require('../middleware/requireAuth')
// const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)
// router.use(verifyJWT)

// GET all
router.get('/', getLubrifiants)

// GET single workout
router.get('/:id', getLubrifiants)

// POST a new workout
router.post('/', createLubrifiant)

// UPDATE a workout
router.patch('/:id', updateLubrifiant)

// DELETE a workout
router.delete('/:id', deleteLubrifiant)


module.exports = router