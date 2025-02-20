const express = require('express')

// controller functions
const {
    createEngin,
    getEngins,
    getEngin,
    deleteEngin,
    updateEngin
} = require('../controllers/enginController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.get('/', getEngins)

// GET single workout
router.get('/:id', getEngin)

// POST a new workout
router.post('/', createEngin)

// UPDATE a workout
router.patch('/:id', updateEngin)

// DELETE a workout
router.delete('/:id', deleteEngin)


module.exports = router