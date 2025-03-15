const prisma = require('../prismaClient')

const saveOrUpdateSaisiehrm = async (req, res) => {
    try {
        const { id, du, enginId, siteId, hrm, hims } = req.body;

        // Vérification des champs obligatoires
        const missingFields = ["du", "enginId", "siteId", "hrm"].filter(
            (field) => !req.body[field]
        );
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Veuillez remplir tous les champs!", missingFields });
        }

        // Conversion et validation des types
        const dateDu = new Date(du);
        if (isNaN(dateDu.getTime())) {
            return res.status(400).json({ error: "La date fournie est invalide." });
        }
        const enginIdInt = parseInt(enginId);
        const siteIdInt = parseInt(siteId);
        if (isNaN(enginIdInt) || isNaN(siteIdInt)) {
            return res
                .status(400)
                .json({ error: "enginId et siteId doivent être des nombres valides." });
        }

        // Vérification que la somme des HIM et HRM ne dépasse pas 24
        const totalHim = hims.reduce((sum, him) => sum + parseFloat(him.him || 0), 0);
        if (totalHim + hrm > 24) {
            return res.status(400).json({
                error: "La somme des HIM et HRM ne doit pas dépasser 24.",
                totalHim,
            });
        }

        // Vérification de l'existence d'une saisie HRM pour ce jour et cet engin
        const existingSaisiehrm = await prisma.saisiehrm.findFirst({
            where: { du: dateDu, enginId: enginIdInt },
        });

        // Si aucune saisie HRM n'existe, c'est une insertion
        let saisiedHRM;
        if (!existingSaisiehrm) {
            // Insertion de la saisie HRM
            saisiedHRM = await prisma.saisiehrm.create({
                data: { du: dateDu, enginId: enginIdInt, siteId: siteIdInt, hrm },
            });
        } else {
            // Si une saisie HRM existe déjà, on effectue une mise à jour
            saisiedHRM = await prisma.saisiehrm.update({
                where: { id: existingSaisiehrm.id },
                data: { du: dateDu, enginId: enginIdInt, siteId: siteIdInt, hrm },
            });
        }

        // Vérification de l'existence des HIM déjà enregistrés
        const existingHIMRecords = await prisma.saisiehim.findMany({
            where: { du: dateDu, enginId: enginIdInt },
            select: { panneId: true },
        });

        const existingPanneIds = new Set(
            existingHIMRecords.map((record) => record.panneId)
        );

        // Vérifier que chaque enregistrement HIM du payload ne crée pas un doublon
        const duplicateHims = hims.filter((him) => {
            const panneId = parseInt(him.panneId);
            return !isNaN(panneId) && existingPanneIds.has(panneId);
        });
        if (duplicateHims.length > 0) {
            return res.status(400).json({
                error: "La combinaison (du, enginId, panneId) existe déjà pour certains enregistrements HIM.",
                duplicateHims,
            });
        }

        // Création ou mise à jour des saisies HIM en parallèle
        const saisiedHIM = await Promise.all(
            hims.map((him) => {
                const panneId = parseInt(him.panneId);
                if (isNaN(panneId)) {
                    throw new Error("panneId invalide dans l'un des enregistrements HIM.");
                }

                // On fait un upsert pour créer ou mettre à jour les saisies HIM
                return prisma.saisiehim.upsert({
                    where: {
                        du_enginId_panneId: {
                            du: dateDu,
                            enginId: parseInt(enginIdInt),
                            panneId: parseInt(panneId),
                        },
                    },
                    update: {
                        him: parseFloat(him.him),
                        ni: parseInt(him.ni),
                    },
                    create: {
                        du: dateDu,
                        enginId: parseInt(enginIdInt),
                        panneId: parseInt(panneId),
                        him: parseFloat(him.him),
                        ni: parseInt(him.ni),
                    },
                });
            })
        );

        res.status(201).json({ saisiedHRM, saisiedHIM });
    } catch (error) {
        console.error("Erreur lors de la sauvegarde :", error);
        res.status(500).json({ error: error.message });
    }
};

const get_byengin_and_date = async (req, res) => {
    try {

        const { du, enginId } = req.body;

        const saisieHRM = await prisma.saisiehrm.findMany({
            where: {
                enginId: parseInt(enginId),
                du: new Date(du)
            }
        });

        const saisieHIM = await prisma.saisiehim.findMany({
            where: {
                enginId: parseInt(enginId),
                du: new Date(du)
            }
        });


        res.status(200).json({
            saisieHRM, saisieHIM
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createSaisieHrm = async (req, res) => {
    try {
        const { du, enginId, siteId, hrm } = req.body
        // Vérification des champs obligatoires
        const missingFields = ["du", "enginId", "siteId", "hrm"].filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Veuillez remplir tous les champs!", missingFields });
        }

        // check if already exist
        exist = await prisma.saisiehrm.findFirst({
            where: { du: new Date(du), enginId }
        });
        if (exist) return res.status(401).json({ error: "Saisie déjà faite pour cet engin à cette date!", exist });
        const savedSaisie = await prisma.saisiehrm.create({
            data: { du: new Date(du), enginId: parseInt(enginId), siteId: parseInt(siteId), hrm: parseFloat(hrm) }
        })
        return res.status(201).json(savedSaisie)
    } catch (error) {
        console.log(error);
    }
}

const createSaisieHim = async (req, res) => {
    try {
        const { panneId, him, ni, saisiehrmId } = req.body
        // Vérification des champs obligatoires
        const missingFields = ["panneId", "him", "ni", "saisiehrmId"].filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Veuillez remplir tous les champs!", missingFields });
        }

        // check if already exist
        exist = await prisma.saisiehim.findFirst({
            where: { panneId, saisiehrmId }
        });
        if (exist) return res.status(401).json({ error: "Saisie déjà faite pour cet engin à cette date!", exist });
        const savedSaisie = await prisma.saisiehim.create({
            data: { panneId: parseInt(panneId), him: parseFloat(him), ni: parseInt(ni), saisiehrmId: parseInt(saisiehrmId) }
        })
        return res.status(201).json(savedSaisie)
    } catch (error) {
        console.log(error);
    }
}

const getSaisieHrm = async (req, res) => {
    try {
        const { du, enginId } = req.body
        // Vérification des champs obligatoires
        const missingFields = ["du", "enginId"].filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Veuillez remplir tous les champs!", missingFields });
        }
        const saisiehrm = await prisma.saisiehrm.findMany({
            where: { du: new Date(du), enginId: parseInt(enginId) },
            include: {
                Saisiehim: { include: { Panne: { include: { Typepanne: true } } } },
                Engin: true,
                Site: true,
            },
            orderBy: { du: 'desc' },
        });
        return res.status(200).json(saisiehrm)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveOrUpdateSaisiehrm,
    get_byengin_and_date,


    createSaisieHrm,
    createSaisieHim,
    getSaisieHrm
}