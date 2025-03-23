const prisma = require('../prismaClient')

const createSaisieLubrifiant = async (req, res) => {
    try {
        // return res.status(201).json(req.body)
        const { lubrifiantId, qte, saisiehimId, obs } = req.body
        // Vérification des champs obligatoires
        const missingFields = ["lubrifiantId", "qte", "saisiehimId"].filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Veuillez remplir tous les champs!", missingFields });
        }
        // check if panneId exist
        const lubrifiantIdExist = await prisma.lubrifiant.findFirst({
            where: { id: parseInt(lubrifiantId) }
        });
        if (!lubrifiantIdExist) return res.status(400).json({ error: "lubrifiant n'existe pas", panneId });

        // check if saisiehimId exist
        const saisiehimIdExist = await prisma.saisiehim.findFirst({
            where: { id: parseInt(saisiehimId) }
        });
        if (!saisiehimIdExist) return res.status(400).json({ error: "saisiehim n'existe pas", saisiehimId });

        // check if already exist
        exist = await prisma.saisielubrifiant.findFirst({
            where: { lubrifiantId: parseInt(lubrifiantId), saisiehimId: parseInt(saisiehimId) }
        });
        if (exist) return res.status(400).json({ error: "Saisie déjà faite pour cet engin à cette date!", exist });

        const savedSaisie = await prisma.saisielubrifiant.create({
            data: { lubrifiantId: parseInt(lubrifiantId), qte: parseFloat(qte), obs, saisiehimId: parseInt(saisiehimId) }, include: {
                Lubrifiant: { include: { Typelubrifiant: true } },
            }
        })
        return res.status(201).json(savedSaisie)
    } catch (error) {
        console.log(error);
    }
}

const deleteSaisieLubrifiant = async (req, res) => {
    try {
        const { id } = req.body
        if (isNaN(id) || parseInt(id) != id) {
            return res.status(404).json({ error: "Enregistrement n'est pas trouvé!" });
        }

        const existSaisielubrifiant = await prisma.saisielubrifiant.findFirst({
            where: { id: parseInt(id) }
        });

        if (!existSaisielubrifiant) {
            return res.status(404).json({ error: "Enregistrement n'existe pas!" })
        }

        await prisma.saisielubrifiant.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json(existSaisielubrifiant)
    } catch (error) {
        console.log(error);
    }
}


module.exports = {

    createSaisieLubrifiant,
    deleteSaisieLubrifiant
}