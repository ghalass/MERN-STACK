const express = require('express')

// controller functions
const {

    createSaisieLubrifiant,
    deleteSaisieLubrifiant

}
    = require('../controllers/saisielubrifiantController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.post('/createSaisieLubrifiant', createSaisieLubrifiant)
router.delete('/deleteSaisieLubrifiant', deleteSaisieLubrifiant)


module.exports = router