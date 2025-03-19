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
                Saisiehim: { include: { Panne: { include: { Typepanne: true } }, Saisielubrifiant: { include: { Lubrifiant: { include: { Typelubrifiant: true } } } } } },
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

const getRapportRje = async (req, res) => {
    try {
        const { du } = req.body;  // Date donnée
        const dateCible = new Date(du);  // Convertir la date donnée en date JavaScript
        const debutMois = new Date(dateCible.getFullYear(), dateCible.getMonth(), 1);  // 1er jour du mois
        const debutAnnee = new Date(dateCible.getFullYear(), 0, 1);  // 1er jour de l'année

        // Période journalière (uniquement le jour donné)
        const nho_j = 24;  // 24 heures pour le jour donné
        const finJournee = new Date(dateCible.getTime() + 86400000);  // Fin de la journée (jour suivant)

        // Période mensuelle (du 1er jour du mois jusqu'au jour donné)
        const nho_m = dateCible.getDate() * 24;  // Nombre d'heures du 1er jour du mois jusqu'à la date donnée

        // Période annuelle (du 1er janvier jusqu'au jour donné)
        const joursEcoules = Math.floor((dateCible - debutAnnee) / 86400000) + 1;  // Nombre de jours écoulés dans l'année
        const nho_a = joursEcoules * 24;  // Nombre d'heures écoulées dans l'année

        // Fonction pour obtenir la somme des HIM, HRM et NI pour une période donnée et un engin donné
        const getHimHrmNi = async (enginId, startDate, endDate) => {
            const him = await prisma.saisiehim.aggregate({
                _sum: { him: true },
                where: {
                    Saisiehrm: {
                        du: { gte: startDate, lte: endDate },  // Filtre par période
                        enginId: enginId,  // Filtre par engin
                    },
                },
            });

            const hrm = await prisma.saisiehrm.aggregate({
                _sum: { hrm: true },
                where: {
                    du: { gte: startDate, lte: endDate },  // Filtre par période
                    enginId: enginId,  // Filtre par engin
                },
            });

            const ni = await prisma.saisiehim.count({
                where: {
                    Saisiehrm: {
                        du: { gte: startDate, lte: endDate },  // Filtre par période
                        enginId: enginId,  // Filtre par engin
                    },
                },
            });

            return {
                him: him._sum.him || 0,  // Somme des HIM pour la période
                hrm: hrm._sum.hrm || 0,  // Somme des HRM pour la période
                ni: ni || 0,  // Nombre d'interventions (NI) pour la période
            };
        };

        // Fonction pour calculer les indicateurs (dispo, mtbf, tdm)
        const calculateIndicators = (him, hrm, ni, nho) => {
            const dispo = ((1 - him / nho) * 100).toFixed(2);  // Disponibilité
            const mtbf = (hrm / ni).toFixed(2);  // MTBF
            const tdm = ((100 * hrm) / nho).toFixed(2);  // TDM

            return { dispo, mtbf, tdm };
        };

        // Récupérer tous les engins
        const engins = await prisma.engin.findMany({
            select: { id: true, name: true },
        });

        // Construire le tableau de résultats par engin
        const finalData = await Promise.all(
            engins.map(async (engin) => {
                // Calcul des sommes pour chaque période
                const [dataJ, dataM, dataA] = await Promise.all([
                    getHimHrmNi(engin.id, dateCible, finJournee),  // Période journalière
                    getHimHrmNi(engin.id, debutMois, dateCible),  // Période mensuelle
                    getHimHrmNi(engin.id, debutAnnee, dateCible),  // Période annuelle
                ]);

                // Calcul des indicateurs pour chaque période
                const indicatorsJ = calculateIndicators(dataJ.him, dataJ.hrm, dataJ.ni, nho_j);  // Journalier
                const indicatorsM = calculateIndicators(dataM.him, dataM.hrm, dataM.ni, nho_m);  // Mensuel
                const indicatorsA = calculateIndicators(dataA.him, dataA.hrm, dataA.ni, nho_a);  // Annuel

                return {
                    engin: engin.name,
                    // Période journalière
                    nho_j,
                    dispo_j: indicatorsJ.dispo,
                    mtbf_j: indicatorsJ.mtbf,
                    tdm_j: indicatorsJ.tdm,
                    him_j: dataJ.him,
                    hrm_j: dataJ.hrm,
                    ni_j: dataJ.ni,

                    // Période mensuelle
                    nho_m,
                    dispo_m: indicatorsM.dispo,
                    mtbf_m: indicatorsM.mtbf,
                    tdm_m: indicatorsM.tdm,
                    him_m: dataM.him,
                    hrm_m: dataM.hrm,
                    ni_m: dataM.ni,

                    // Période annuelle
                    nho_a,
                    dispo_a: indicatorsA.dispo,
                    mtbf_a: indicatorsA.mtbf,
                    tdm_a: indicatorsA.tdm,
                    him_a: dataA.him,
                    hrm_a: dataA.hrm,
                    ni_a: dataA.ni,
                };
            })
        );

        return res.status(200).json(finalData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};





module.exports = {
    saveOrUpdateSaisiehrm,
    get_byengin_and_date,


    createSaisieHrm,
    updateSaisieHrm,

    createSaisieHim,
    deleteSaisieHim,

    getRapportRje,

    getSaisieHrm
}