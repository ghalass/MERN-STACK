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

const router = express.Router()

// require auth for all routes bellow
router.use(requireAuth)

// GET all
router.get('/', getSites)

/**
 * @swagger
 * /api/sites/{id}:
 *   get:
 *     summary: Get a single site
 *     description: Retrieve details of a single site by ID (Authentication Required).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The site ID
 *     responses:
 *       200:
 *         description: Site details.
 *       404:
 *         description: Site not found
 */
// GET single workout
router.get('/:id', getSite)

// POST a new workout
router.post('/', createSite)

// UPDATE a workout
router.patch('/:id', updateSite)

// DELETE a workout
router.delete('/:id', deleteSite)


module.exports = router