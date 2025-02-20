const express = require('express')

// controller functions
const {
    createTypeparc,
    getTypeparcs,
    getTypeparc,
    deleteTypeparc,
    updateTypeparc
} = require('../controllers/typeparcController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.get('/', getTypeparcs)

// GET single workout
router.get('/:id', getTypeparc)

// POST a new workout
router.post('/', createTypeparc)

// UPDATE a workout
router.patch('/:id', updateTypeparc)

// DELETE a workout
router.delete('/:id', deleteTypeparc)


module.exports = router