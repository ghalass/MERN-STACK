const express = require('express')

// controller functions
const {
    // saveOrUpdateSaisiehrm,
    get_byengin_and_date,

    createSaisieHrm,
    updateSaisieHrm,

    createSaisieHim,
    deleteSaisieHim,

    getSaisieHrm,

    getRapportRje,
}
    = require('../controllers/saisiehrmController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

// router.post('/saveSaisiehrm', saveOrUpdateSaisiehrm)

router.post('/getSaisieHrm', getSaisieHrm)
router.post('/createSaisieHrm', createSaisieHrm)
router.patch('/updateSaisieHrm', updateSaisieHrm)

router.post('/createSaisieHim', createSaisieHim)
router.delete('/deleteSaisieHim', deleteSaisieHim)

router.post('/byengin_and_date', get_byengin_and_date)

router.post('/getRapportRje', getRapportRje)


module.exports = router