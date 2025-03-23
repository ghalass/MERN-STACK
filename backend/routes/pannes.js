const express = require('express')

// controller functions
const {
    createPanne,
    getPannes,
    getPanne,
    deletePanne,
    updatePanne,
    fetchPannesByTypepanne,

} = require('../controllers/panneController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.get('/', getPannes)

// GET single workout
router.get('/:id', getPanne)

// GET single workout
router.get('/typepanne/:id', fetchPannesByTypepanne)

// POST a new workout
router.post('/', createPanne)

// UPDATE a workout
router.patch('/:id', updatePanne)

// DELETE a workout
router.delete('/:id', deletePanne)


module.exports = router