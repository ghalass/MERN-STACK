const express = require('express')

// controller functions
const {
    // createTypepanne,
    getTypelubrifiant,
    // getTypepanne,
    // deleteTypepanne,
    // updateTypepanne
} = require('../controllers/typelubrifiantController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.get('/', getTypelubrifiant)

// // GET single workout
// router.get('/:id', getTypepanne)

// // POST a new workout
// router.post('/', createTypepanne)

// // UPDATE a workout
// router.patch('/:id', updateTypepanne)

// // DELETE a workout
// router.delete('/:id', deleteTypepanne)


module.exports = router