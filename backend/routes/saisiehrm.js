const express = require('express')

// controller functions
const {
    saveOrUpdateSaisiehrm,
    get_byengin_and_date,
    createSaisieHrm,
    createSaisieHim,
    getSaisieHrm
}
    = require('../controllers/saisiehrmController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.post('/saveSaisiehrm', saveOrUpdateSaisiehrm)

router.post('/createSaisieHrm', createSaisieHrm)
router.post('/createSaisieHim', createSaisieHim)
router.post('/getSaisieHrm', getSaisieHrm)

router.post('/byengin_and_date', get_byengin_and_date)


module.exports = router