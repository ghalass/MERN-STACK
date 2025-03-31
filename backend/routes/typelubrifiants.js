const express = require('express')

// controller functions
const {
    createTypelubrifiant,
    getTypelubrifiant,
    // getTypepanne,
    deleteTypelubrifiant,
    updateTypelubrifiant
} = require('../controllers/typelubrifiantController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.get('/', getTypelubrifiant)

// // GET single workout
// router.get('/:id', getTypepanne)

// POST a new workout
router.post('/', createTypelubrifiant)

// UPDATE a workout
router.patch('/:id', updateTypelubrifiant)

// DELETE a workout
router.delete('/:id', deleteTypelubrifiant)


module.exports = router