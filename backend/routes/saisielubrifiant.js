const express = require('express')

// controller functions
const {

    createSaisieLubrifiant,

}
    = require('../controllers/saisielubrifiantController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.post('/createSaisieLubrifiant', createSaisieLubrifiant)

module.exports = router