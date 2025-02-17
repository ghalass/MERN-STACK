const express = require('express')

// controller functions
const { createSite,
    getSites,
    getSite,
    deleteSite,
    updateSite
} = require('../controllers/siteController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

// GET all 
router.get('/', getSites)

// CREATE
router.post('/', createSite)

module.exports = router