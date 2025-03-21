// routes/rapports.js
const express = require('express')

// controller functions
const {
    getRapportRje,
    getRapportUnitePhysique,
    getEtatMensuel,
    getIndispoParParc
}
    = require('../controllers/rapportsController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

router.post('/getRapportRje', getRapportRje)
router.post('/getRapportUnitePhysique', getRapportUnitePhysique)
router.post('/getEtatMensuel', getEtatMensuel)
router.post('/getIndispoParParc', getIndispoParParc)

module.exports = router