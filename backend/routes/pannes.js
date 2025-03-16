const express = require('express')

// controller functions
const {
    createPanne,
    getPannes,
    getPanne,
    deletePanne,
    updatePanne,
    getPannesByParcId
} = require('../controllers/panneController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.get('/', getPannes)

router.get('/parc/:id', getPannesByParcId)

// GET single workout
router.get('/:id', getPanne)

// POST a new workout
router.post('/', createPanne)

// UPDATE a workout
router.patch('/:id', updatePanne)

// DELETE a workout
router.delete('/:id', deletePanne)


module.exports = router