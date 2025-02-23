const express = require('express')

// controller functions
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// middlewares
const requireAuth = require('../middleware/requireAuth')
// const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

// router.use(verifyJWT)

// GET all workouts
router.get('/', getWorkouts)

// GET single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)


module.exports = router