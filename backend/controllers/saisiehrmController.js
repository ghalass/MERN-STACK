const prisma = require('../prismaClient')

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
            where: { du: new Date(du), enginId: parseInt(enginId) }
        });

        if (isNaN(hrm) || hrm > 24 || hrm < 0) return res.status(400).json({ error: `HRM ne doit pas depasser 24h`, hrm });

        if (exist) return res.status(400).json({ error: `Saisie déjà faite pour cet engin à cette date!`, exist });
        const savedSaisie = await prisma.saisiehrm.create({
            data: { du: new Date(du), enginId: parseInt(enginId), siteId: parseInt(siteId), hrm: parseFloat(hrm) }
        })
        return res.status(201).json(savedSaisie)
    } catch (error) {
        console.log(error);
    }
}

const updateSaisieHrm = async (req, res) => {
    try {
        const { id, hrm } = req.body
        // Vérification des champs obligatoires
        const missingFields = ["id", "hrm"].filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Veuillez remplir tous les champs!", missingFields });
        }

        // check if already exist
        exist = await prisma.saisiehrm.findFirst({
            where: { id: parseInt(id) }
        });
        if (!exist) return res.status(404).json({ error: "Saisie n'existe pas!", exist });

        // CHECK TOTAL HRM & HIM
        const totlaHRM = await prisma.saisiehrm.aggregate({
            _sum: { hrm: true },
            where: { id: parseInt(id) },
        });
        const totlaHIM = await prisma.saisiehim.aggregate({
            _sum: { him: true },
            where: { saisiehrmId: parseInt(id) },
        });
        const him_hrm_saisie = totlaHIM._sum.him + Number(hrm)
        let message = `HRM saisie = ${totlaHRM._sum.hrm || 0}\n`;
        message += `HIM saisie = ${totlaHIM._sum.him || 0}\n`;
        message += `Nouveau HRM = ${hrm}\n`;
        message += `Total sera = ${him_hrm_saisie} > 24h\n`;
        message += `** IMPOSSIBLE de dépasser 24h **`;
        if (him_hrm_saisie > 24) return res.status(400).json({ error: message });


        const HrmToUpdate = await prisma.saisiehrm.update({
            where: { id: parseInt(id) },
            data: { hrm: parseFloat(hrm) }
        })
        return res.status(201).json(HrmToUpdate)
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
        // check if panneId exist
        panneExist = await prisma.panne.findFirst({
            where: { id: parseInt(panneId) }
        });
        if (!panneExist) return res.status(400).json({ error: "Panne n'existe pas", panneId });

        // check if already exist
        exist = await prisma.saisiehim.findFirst({
            where: { panneId: parseInt(panneId), saisiehrmId: parseInt(saisiehrmId) }
        });
        if (exist) return res.status(400).json({ error: "Saisie déjà faite pour cet engin à cette date!", exist });

        // CHECK TOTAL HRM & HIM
        const totlaHRM = await prisma.saisiehrm.aggregate({
            _sum: { hrm: true },
            where: { id: parseInt(saisiehrmId) },
        });
        const totlaHIM = await prisma.saisiehim.aggregate({
            _sum: { him: true },
            where: { saisiehrmId: parseInt(saisiehrmId) },
        });
        const him_hrm_saisie = totlaHRM._sum.hrm + totlaHIM._sum.him + Number(him)
        let message = `HRM saisie = ${totlaHRM._sum.hrm || 0}\n`;
        message += `HIM saisie = ${totlaHIM._sum.him || 0}\n`;
        message += `Nouveau HIM = ${him || 0}\n`;
        message += `Total sera = ${him_hrm_saisie} > 24h\n`;
        message += `** IMPOSSIBLE de dépasser 24h **`;
        if (him_hrm_saisie > 24) return res.status(400).json({ error: message });

        const savedSaisie = await prisma.saisiehim.create({
            data: { panneId: parseInt(panneId), him: parseFloat(him), ni: parseInt(ni), saisiehrmId: parseInt(saisiehrmId) }
        })
        return res.status(201).json(savedSaisie)
    } catch (error) {
        console.log(error);
    }
}

const deleteSaisieHim = async (req, res) => {
    try {
        const { id } = req.body
        // Vérification des champs obligatoires
        const missingFields = ["id"].filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Veuillez remplir tous les champs!", missingFields });
        }
        // check if saisiehim exist
        saisiehimExist = await prisma.saisiehim.findFirst({
            where: { id: parseInt(id) }
        });
        if (!saisiehimExist) return res.status(400).json({ error: "Panne n'existe pas", panneId });

        const saisiehimToDelete = await prisma.saisiehim.delete({
            where: { id: parseInt(id) }
        })
        return res.status(201).json(saisiehimToDelete)
    } catch (error) {
        console.log(error);
    }
}

const updateSaisieHim = async (req, res) => {
    try {
        console.log(req.body);

        const { id, panneId, him, ni, saisiehrmId } = req.body
        // Vérification des champs obligatoires
        const missingFields = ["id", "panneId", "him", "ni", "saisiehrmId"].filter((field) => !req.body[field]);
        console.log(missingFields);

        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Veuillez remplir tous les champs!", missingFields });
        }

        // check if already exist
        existSaisiehim = await prisma.saisiehim.findFirst({
            where: { id: parseInt(id) }
        });
        if (!existSaisiehim) return res.status(404).json({ error: "Saisie n'existe pas!", exist });


        // CHECK TOTAL HRM & HIM
        const totlaHRM = await prisma.saisiehrm.aggregate({
            _sum: { hrm: true },
            where: { id: parseInt(saisiehrmId) },
        });
        const totlaHIM = await prisma.saisiehim.aggregate({
            _sum: { him: true },
            where: { saisiehrmId: parseInt(saisiehrmId) },
        });
        const him_hrm_saisie = totlaHRM._sum.hrm + totlaHIM._sum.him + Number(him)
        let message = `HRM saisie = ${totlaHRM._sum.hrm || 0}\n`;
        message += `HIM saisie = ${totlaHIM._sum.him || 0}\n`;
        message += `Nouveau HIM = ${him || 0}\n`;
        message += `Total sera = ${him_hrm_saisie} > 24h\n`;
        message += `** IMPOSSIBLE de dépasser 24h **`;
        if (him_hrm_saisie > 24) return res.status(400).json({ error: message });

        const updated = await prisma.saisiehim.update({
            where: { id: parseInt(id) },
            data: { panneId: parseInt(panneId), him: parseFloat(him), ni: parseInt(ni), }
        })
        return res.status(201).json(updated)
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

        const startDate = new Date(du); // 2025-03-29T00:00:00.000Z
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1); // 2025-03-30T00:00:00.000Z

        const saisiehrm = await prisma.saisiehrm.findMany({
            where: {
                du: {
                    gte: startDate,  // Greater than or equal to start of day
                    lt: endDate      // Less than start of next day
                }, enginId: parseInt(enginId)
            },
            include: {
                Saisiehim: { include: { Panne: { include: { Typepanne: true } }, Saisielubrifiant: { include: { Lubrifiant: { include: { Typelubrifiant: true } }, Typeconsommationlub: true } } } },
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

const getSaisieHrmDay = async (req, res) => {
    try {
        const { du } = req.body;
        const dateCible = new Date(du);

        const startDate = new Date(du); // 2025-03-29T00:00:00.000Z
        startDate.setHours(0, 0, 0, 0); // 00:00:00.000

        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999); // 23:59:59.999

        // Formater la date pour l'affichage (jj-mm-aaaa)
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        // Récupérer toutes les saisies HRM pour la date exacte avec les relations nécessaires
        const saisies = await prisma.saisiehrm.findMany({
            where: {
                du: {
                    gte: startDate,  // Greater than or equal to start of day
                    lte: endDate      // Less than start of next day
                }
            },
            include: {
                Engin: {
                    include: {
                        Parc: {
                            include: {
                                Typeparc: true
                            }
                        }
                    }
                },
                Site: true,  // On inclut maintenant le Site depuis Saisiehrm
                Saisiehim: {
                    include: {
                        Panne: true,
                        Saisielubrifiant: {
                            include: {
                                Lubrifiant: true
                            }
                        }
                    }
                }
            }
        });

        // Préparer le résultat final
        const result = [];

        // Traiter chaque saisie HRM
        saisies.forEach(saisie => {
            const baseData = {
                date: formatDate(dateCible),
                typeparc: saisie.Engin.Parc.Typeparc.name,
                parc: saisie.Engin.Parc.name,
                engin: saisie.Engin.name,
                site: saisie.Site.name,  // On prend maintenant le site depuis Saisiehrm
                hrm: saisie.hrm
            };

            // Si l'engin a des pannes (Saisiehim)
            if (saisie.Saisiehim && saisie.Saisiehim.length > 0) {
                saisie.Saisiehim.forEach(saisieHim => {
                    // Préparer les lubrifiants consommés
                    const lubrifiants = saisieHim.Saisielubrifiant.map(lub => ({
                        name: lub.Lubrifiant.name,
                        qte: lub.qte
                    }));

                    result.push({
                        ...baseData,
                        panne: saisieHim.Panne.name,
                        him: saisieHim.him,
                        ni: saisieHim.ni,
                        lubrifiants: lubrifiants
                    });
                });
            } else {
                // Si l'engin n'a pas de pannes
                result.push({
                    ...baseData,
                    panne: null,
                    him: 0,
                    ni: 0,
                    lubrifiants: []
                });
            }
        });

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};


module.exports = {
    get_byengin_and_date,


    createSaisieHrm,
    updateSaisieHrm,

    createSaisieHim,
    deleteSaisieHim,
    updateSaisieHim,

    getSaisieHrm,

    getSaisieHrmDay,
}