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

/**
 * @swagger
 * /api/sites:
 *   get:
 *     summary: Get all sites
 *     description: Retrieve a list of sites (Authentication Required).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sites.
 */
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

/**
 * @swagger
 * /api/sites:
 *   post:
 *     summary: Get all sites
 *     description: Create a new Site (Authentication Required).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sites.
 */
// POST a new workout
router.post('/', createSite)

/**
 * @swagger
 * /api/sites:
 *   patch:
 *     summary: Get all sites
 *     description: Update a Site (Authentication Required).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sites.
 */
// UPDATE a workout
router.patch('/:id', updateSite)

/**
 * @swagger
 * /api/sites:
 *   delete:
 *     summary: Get all sites
 *     description: Delete a new Site (Authentication Required).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sites.
 */
// DELETE a workout
router.delete('/:id', deleteSite)


module.exports = router