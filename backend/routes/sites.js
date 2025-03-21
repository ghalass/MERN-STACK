const express = require('express')

// controller functions
const {
    createSite,
    getSites,
    getSite,
    deleteSite,
    updateSite
} = require('../controllers/siteController')

const requireAuth = require('../middleware/requireAuth')
// const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)
// router.use(verifyJWT)

// GET all
router.get('/', getSites)

// GET single workout
router.get('/:id', getSite)

// POST a new workout
router.post('/', createSite)

// UPDATE a workout
router.patch('/:id', updateSite)

// DELETE a workout
router.delete('/:id', deleteSite)


module.exports = router