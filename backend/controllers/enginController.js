const prisma = require('../prismaClient')

// get all
const getEngins = async (req, res) => {
    try {
        const engins = await prisma.engin
            .findMany({
                orderBy: { createdAt: 'desc' }
            });
        res.status(200).json(engins)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get a single engin
const getEngin = async (req, res) => {
    const { id } = req.params
    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" });
        }

        const engin = await prisma.engin.findFirst({
            where: { id: parseInt(id) }
        });

        if (!engin) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        res.status(200).json(engin)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create new engin
const createEngin = async (req, res) => {
    // return res.status(201).json(req.body)
    try {
        const { name, typeenginId } = req.body

        let emptyFields = [];

        if (!name) emptyFields.push('name')
        if (!typeenginId) emptyFields.push('typeenginId')

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Veuillez remplir tout les champs!', emptyFields })
        }

        const exists = await prisma.engin.findFirst({
            where: { name }
        });

        if (exists) {
            return res.status(400).json({ error: 'Engin déjà utilisé' })
        }

        const engin = await prisma.engin.create({
            data: { name, typeenginId: parseInt(typeenginId) }
        })
        res.status(201).json(engin)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a engin
const deleteEngin = async (req, res) => {
    const { id } = req.params
    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'est pas trouvé!" });
        }

        const engin = await prisma.engin.findFirst({
            where: { id: parseInt(id) }
        });
        if (!engin) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        await prisma.engin.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json(engin)
    } catch (error) {
        console.warn(error);

        res.status(500).json({ error: error.message });
    }
}

// update a engin
const updateEngin = async (req, res) => {
    const { id } = req.params
    const { name, typeenginId } = req.body

    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'est pas trouvé!" });
        }

        const engin = await prisma.engin.findFirst({
            where: { id: parseInt(id) }
        });

        // check if name not already exist
        const nameExist = await prisma.engin.findFirst({
            where: { name, id: { not: parseInt(id) } },

        });
        if (nameExist) {
            return res.status(401).json({ error: "Nom déjà utilisé!" })
        }

        if (!engin) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        const updatedWorkout = await prisma.engin.update({
            where: { id: parseInt(id) },
            data: { name, typeenginId: parseInt(typeenginId) }
        });

        res.status(200).json(updatedWorkout)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createEngin,
    getEngins,
    getEngin,
    deleteEngin,
    updateEngin
}