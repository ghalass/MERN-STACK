const prisma = require('../prismaClient')

// get all
const getLubrifiants = async (req, res) => {
    try {
        const lubrifiants = await prisma.lubrifiant
            .findMany({
                orderBy: { name: 'asc' },
            });
        res.status(200).json(lubrifiants)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get a single lubrifiant
const getLubrifiant = async (req, res) => {
    const { id } = req.params
    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" });
        }

        const lubrifiant = await prisma.lubrifiant.findFirst({
            where: { id: parseInt(id) }
        });

        if (!lubrifiant) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        res.status(200).json(lubrifiant)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create new lubrifiant
const createLubrifiant = async (req, res) => {
    const { name } = req.body

    let emptyFields = [];

    if (!name) emptyFields.push('name')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Veuillez remplir tout les champs!', emptyFields })
    }

    try {
        const exists = await prisma.lubrifiant.findFirst({
            where: { name: name }
        });

        if (exists) {
            return res.status(400).json({ error: 'lubrifiant déjà utilisé' })
        }

        const lubrifiant = await prisma.lubrifiant.create({
            data: { name }
        })
        res.status(201).json(lubrifiant)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a lubrifiant
const deleteLubrifiant = async (req, res) => {
    const { id } = req.params
    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'est pas trouvé!" });
        }

        const lubrifiant = await prisma.lubrifiant.findFirst({
            where: { id: parseInt(id) }
        });

        if (!lubrifiant) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        await prisma.lubrifiant.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json(lubrifiant)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update a lubrifiant
const updateLubrifiant = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {

        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'est pas trouvé!" });
        }

        const lubrifiant = await prisma.lubrifiant.findFirst({
            where: { id: parseInt(id) }
        });

        // check if name not already exist
        const nameExist = await prisma.lubrifiant.findFirst({
            where: { name: name, id: { not: parseInt(id) } },

        });
        if (nameExist) {
            return res.status(400).json({ error: "Nom déjà utilisé!" })
        }

        if (!lubrifiant) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        const updatedWorkout = await prisma.lubrifiant.update({
            where: { id: parseInt(id) },
            data: { name }
        });

        res.status(200).json(updatedWorkout)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createLubrifiant,
    getLubrifiants,
    getLubrifiant,
    deleteLubrifiant,
    updateLubrifiant
}