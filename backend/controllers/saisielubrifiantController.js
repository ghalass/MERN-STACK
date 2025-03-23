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
            data: { lubrifiantId: parseInt(lubrifiantId), qte: parseFloat(qte), obs, saisiehimId: parseInt(saisiehimId) }
        })
        return res.status(201).json(savedSaisie)
    } catch (error) {
        console.log(error);
    }
}


module.exports = {

    createSaisieLubrifiant,
}