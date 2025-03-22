// controllers/rapportsController.js

const prisma = require('../prismaClient')

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

const getRapportUnitePhysique = async (req, res) => {
    try {
        const { du } = req.body;  // Date donnée
        const dateCible = new Date(du);  // Convertir la date donnée en date JavaScript

        // Calcul des dates de début et de fin pour le mois en cours
        const debutMois = new Date(dateCible.getFullYear(), dateCible.getMonth(), 1);  // 1er jour du mois
        const finMois = new Date(dateCible.getFullYear(), dateCible.getMonth() + 1, 0);  // Dernier jour du mois

        // Calcul des dates de début et de fin pour l'année en cours
        const debutAnnee = new Date(dateCible.getFullYear(), 0, 1);  // 1er jour de l'année
        const finAnnee = new Date(dateCible.getFullYear(), 11, 31);  // Dernier jour de l'année

        // Récupérer tous les parcs avec leurs engins et sites associés
        const parcs = await prisma.parc.findMany({
            include: {
                engins: {
                    include: {
                        Site: true,
                        Saisiehrm: {
                            where: {
                                OR: [
                                    { du: { gte: debutMois, lte: finMois } },  // Filtre pour le mois en cours
                                    { du: { gte: debutAnnee, lte: finAnnee } }  // Filtre pour l'année en cours
                                ]
                            },
                            include: {
                                Saisiehim: true  // Inclure les Saisiehim liées à chaque Saisiehrm
                            }
                        }
                    }
                }
            }
        });

        // Calculer les données pour chaque parc
        const result = parcs.map(parc => {
            const engins = parc.engins;

            // Objet pour regrouper les données par site
            const sitesData = {};

            engins.forEach(engin => {
                const siteName = engin.Site.name;

                // Initialiser les données du site si nécessaire
                if (!sitesData[siteName]) {
                    sitesData[siteName] = {
                        site: siteName,
                        hrm_m: 0,
                        him_m: 0,
                        hrm_a: 0,
                        him_a: 0
                    };
                }

                // Calculer HRM mensuel pour ce site
                sitesData[siteName].hrm_m += engin.Saisiehrm
                    .filter(saisie => saisie.du >= debutMois && saisie.du <= finMois)
                    .reduce((sum, saisie) => sum + saisie.hrm, 0);

                // Calculer HIM mensuel pour ce site
                sitesData[siteName].him_m += engin.Saisiehrm
                    .filter(saisie => saisie.du >= debutMois && saisie.du <= finMois)
                    .flatMap(saisie => saisie.Saisiehim)  // Extraire les Saisiehim liées
                    .reduce((sum, saisie) => sum + saisie.him, 0);

                // Calculer HRM annuel pour ce site
                sitesData[siteName].hrm_a += engin.Saisiehrm
                    .filter(saisie => saisie.du >= debutAnnee && saisie.du <= finAnnee)
                    .reduce((sum, saisie) => sum + saisie.hrm, 0);

                // Calculer HIM annuel pour ce site
                sitesData[siteName].him_a += engin.Saisiehrm
                    .filter(saisie => saisie.du >= debutAnnee && saisie.du <= finAnnee)
                    .flatMap(saisie => saisie.Saisiehim)  // Extraire les Saisiehim liées
                    .reduce((sum, saisie) => sum + saisie.him, 0);
            });

            // Convertir l'objet sitesData en tableau
            const par_site = Object.values(sitesData);

            // Calculer les totaux pour tous les sites
            const hrm_m_total = par_site.reduce((sum, site) => sum + site.hrm_m, 0);
            const him_m_total = par_site.reduce((sum, site) => sum + site.him_m, 0);
            const hrm_a_total = par_site.reduce((sum, site) => sum + site.hrm_a, 0);
            const him_a_total = par_site.reduce((sum, site) => sum + site.him_a, 0);

            return {
                parc: parc.name,
                nombre_d_engin: engins.length,
                par_site,  // Array of objects
                hrm_m_total,
                him_m_total,
                hrm_a_total,
                him_a_total
            };
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};


module.exports = {
    getRapportRje,
    getRapportUnitePhysique
};