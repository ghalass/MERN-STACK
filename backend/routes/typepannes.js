const express = require('express')

// controller functions
const {
    createTypepanne,
    getTypepannes,
    getTypepanne,
    deleteTypepanne,
    updateTypepanne
} = require('../controllers/typepanneController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.get('/', getTypepannes)

// GET single workout
router.get('/:id', getTypepanne)

// POST a new workout
router.post('/', createTypepanne)

// UPDATE a workout
router.patch('/:id', updateTypepanne)

// DELETE a workout
router.delete('/:id', deleteTypepanne)


module.exports = router