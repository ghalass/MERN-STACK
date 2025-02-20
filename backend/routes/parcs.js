const express = require('express')

// controller functions
const {
    createParc,
    getParcs,
    getParc,
    deleteParc,
    updateParc
} = require('../controllers/parcController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.get('/', getParcs)

// GET single workout
router.get('/:id', getParc)

// POST a new workout
router.post('/', createParc)

// UPDATE a workout
router.patch('/:id', updateParc)

// DELETE a workout
router.delete('/:id', deleteParc)


module.exports = router