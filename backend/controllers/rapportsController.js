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

const getEtatMensuel = async (req, res) => {
    try {
        const { du } = req.body; // Date de référence

        // Convertir la date en objet Date
        const dateDu = new Date(du);

        // Calculer le premier et le dernier jour du mois
        const firstDayOfMonth = new Date(dateDu.getFullYear(), dateDu.getMonth(), 1);
        const lastDayOfMonth = new Date(dateDu.getFullYear(), dateDu.getMonth() + 1, 0);

        // Calculer le premier jour de l'année
        const firstDayOfYear = new Date(dateDu.getFullYear(), 0, 1);

        // Récupérer tous les parcs avec leurs engins et sites associés
        const parcs = await prisma.parc.findMany({
            include: {
                engins: {
                    include: {
                        Saisiehrm: {
                            where: {
                                du: {
                                    gte: firstDayOfYear, // On prend toutes les saisies depuis le début de l'année
                                    lte: lastDayOfMonth // Jusqu'à la fin du mois courant
                                }
                            },
                            include: {
                                Saisiehim: true // Charger les Saisiehim associées
                            }
                        }
                    }
                },
                Typeparc: true
            }
        });

        // Fonction pour calculer les indicateurs mensuels et annuels
        const calculateIndicators = (engins, periodStart, periodEnd) => {
            let nho = 0;
            let hrm = 0;
            let him = 0;
            let ni = 0;

            engins.forEach(engin => {
                // Calcul de NHO (Nombre d'Heures d'Opération)
                const daysInPeriod = (periodEnd - periodStart) / (1000 * 60 * 60 * 24); // Nombre de jours dans la période
                nho += 24 * daysInPeriod;

                // Vérifier si Saisiehrm existe et est un tableau
                if (engin.Saisiehrm && Array.isArray(engin.Saisiehrm)) {
                    engin.Saisiehrm.forEach(saisie => {
                        if (saisie.du >= periodStart && saisie.du <= periodEnd) {
                            hrm += saisie.hrm;

                            // Vérifier si Saisiehim existe et est un tableau
                            if (saisie.Saisiehim && Array.isArray(saisie.Saisiehim)) {
                                saisie.Saisiehim.forEach(saisieHim => {
                                    him += saisieHim.him;
                                    ni += saisieHim.ni;
                                });
                            }
                        }
                    });
                }
            });

            // Calcul des autres indicateurs
            const hrd = nho - (him + hrm);
            const mttr = him / ni || 0; // Éviter la division par zéro
            const dispo = (1 - (him / nho)) * 100 || 0; // Éviter la division par zéro
            const tdm = hrm / nho * 100 || 0; // Éviter la division par zéro
            const mtbf = hrm / ni || 0; // Éviter la division par zéro
            const util = hrm / (hrm + hrd) * 100 || 0; // Éviter la division par zéro

            // Limiter les valeurs à deux chiffres après la virgule
            return {
                nho: parseFloat(nho.toFixed(2)),
                hrm: parseFloat(hrm.toFixed(2)),
                him: parseFloat(him.toFixed(2)),
                ni: parseFloat(ni.toFixed(2)),
                hrd: parseFloat(hrd.toFixed(2)),
                mttr: parseFloat(mttr.toFixed(2)),
                dispo: parseFloat(dispo.toFixed(2)),
                tdm: parseFloat(tdm.toFixed(2)),
                mtbf: parseFloat(mtbf.toFixed(2)),
                util: parseFloat(util.toFixed(2)),
            };
        };

        // Formatage des données
        const result = parcs.map(parc => {
            const engins = parc.engins;
            const nombre_d_engin = engins.length;

            // Calcul des indicateurs mensuels
            const indicators_m = calculateIndicators(engins, firstDayOfMonth, lastDayOfMonth);

            // Calcul des indicateurs annuels
            const indicators_a = calculateIndicators(engins, firstDayOfYear, lastDayOfMonth);

            return {
                typeparc: parc.Typeparc.name,
                parc: parc.name,
                nombre_d_engin,
                // Indicateurs mensuels
                nho_m: indicators_m.nho,
                hrm_m: indicators_m.hrm,
                him_m: indicators_m.him,
                ni_m: indicators_m.ni,
                hrd_m: indicators_m.hrd,
                mttr_m: indicators_m.mttr,
                dispo_m: indicators_m.dispo,
                tdm_m: indicators_m.tdm,
                mtbf_m: indicators_m.mtbf,
                util_m: indicators_m.util,
                // Indicateurs annuels
                nho_a: indicators_a.nho,
                hrm_a: indicators_a.hrm,
                him_a: indicators_a.him,
                ni_a: indicators_a.ni,
                hrd_a: indicators_a.hrd,
                mttr_a: indicators_a.mttr,
                dispo_a: indicators_a.dispo,
                tdm_a: indicators_a.tdm,
                mtbf_a: indicators_a.mtbf,
                util_a: indicators_a.util,
            };
        });

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

const getIndispoParParc = async (req, res) => {
    try {
        const { du } = req.body; // Date de référence

        // Convertir la date en objet Date
        const dateDu = new Date(du);

        // Calculer le premier et le dernier jour du mois
        const firstDayOfMonth = new Date(dateDu.getFullYear(), dateDu.getMonth(), 1);
        const lastDayOfMonth = new Date(dateDu.getFullYear(), dateDu.getMonth() + 1, 0);

        // Calculer le premier jour de l'année
        const firstDayOfYear = new Date(dateDu.getFullYear(), 0, 1);

        // Récupérer tous les parcs avec leurs engins, sites et pannes associés
        const parcs = await prisma.parc.findMany({
            include: {
                engins: {
                    include: {
                        Site: true, // Inclure le site associé
                        Saisiehrm: {
                            where: {
                                du: {
                                    gte: firstDayOfYear, // On prend toutes les saisies depuis le début de l'année
                                    lte: lastDayOfMonth // Jusqu'à la fin du mois courant
                                }
                            },
                            include: {
                                Saisiehim: {
                                    include: {
                                        Panne: true // Inclure les pannes associées
                                    }
                                }
                            }
                        }
                    }
                },
                Typeparc: true
            }
        });

        // Fonction pour calculer les indicateurs par parc et par panne
        const calculateIndicators = (engins, periodStart, periodEnd) => {
            const result = {};
            let him_total = 0; // Total de him pour toutes les pannes

            engins.forEach(engin => {
                // Vérifier si Saisiehrm existe et est un tableau
                if (engin.Saisiehrm && Array.isArray(engin.Saisiehrm)) {
                    engin.Saisiehrm.forEach(saisie => {
                        if (saisie.du >= periodStart && saisie.du <= periodEnd) {
                            // Vérifier si Saisiehim existe et est un tableau
                            if (saisie.Saisiehim && Array.isArray(saisie.Saisiehim)) {
                                saisie.Saisiehim.forEach(saisieHim => {
                                    const panneName = saisieHim.Panne.name;

                                    // Initialiser les indicateurs pour cette panne si nécessaire
                                    if (!result[panneName]) {
                                        result[panneName] = {
                                            ni: 0,
                                            him: 0,
                                        };
                                    }

                                    // Ajouter les valeurs de ni et him
                                    result[panneName].ni += saisieHim.ni;
                                    result[panneName].him += saisieHim.him;

                                    // Ajouter au total de him pour toutes les pannes
                                    him_total += saisieHim.him;
                                });
                            }
                        }
                    });
                }
            });

            return { result, him_total };
        };

        // Formatage des données
        const result = [];

        parcs.forEach(parc => {
            const engins = parc.engins;
            const nombre_d_engin = engins.length;

            // Calcul des indicateurs mensuels
            const { result: indicators_m, him_total: him_total_m } = calculateIndicators(engins, firstDayOfMonth, lastDayOfMonth);

            // Calcul des indicateurs annuels
            const { result: indicators_a, him_total: him_total_a } = calculateIndicators(engins, firstDayOfYear, lastDayOfMonth);

            // Calcul de NHO (Nombre d'Heures d'Opération)
            const daysInMonth = (lastDayOfMonth - firstDayOfMonth) / (1000 * 60 * 60 * 24); // Nombre de jours dans le mois
            const daysInYear = (lastDayOfMonth - firstDayOfYear) / (1000 * 60 * 60 * 24); // Nombre de jours depuis le début de l'année
            const nho_m = 24 * nombre_d_engin * daysInMonth; // NHO mensuel corrigé
            const nho_a = 24 * daysInYear * nombre_d_engin; // NHO annuel

            // Ajouter les résultats pour chaque panne
            Object.keys(indicators_m).forEach(panne => {
                const him_m = indicators_m[panne].him;
                const him_a = indicators_a[panne].him;
                const ni_m = indicators_m[panne].ni;
                const ni_a = indicators_a[panne].ni;

                const indisp_m = (him_m / nho_m) * 100;
                const indisp_a = (him_a / nho_a) * 100;
                const coef_indispo_m = (him_m / him_total_m) * 100; // Coefficient d'indisponibilité mensuel
                const coef_indispo_a = (him_a / him_total_a) * 100; // Coefficient d'indisponibilité annuel

                result.push({
                    typeparc: parc.Typeparc.name,
                    parc: parc.name,
                    panne: panne,
                    nombre_d_engin: nombre_d_engin,
                    nho_m: parseFloat(nho_m.toFixed(2)), // NHO mensuel corrigé
                    nho_a: parseFloat(nho_a.toFixed(2)), // NHO annuel
                    ni_m: parseFloat(ni_m.toFixed(2)),
                    ni_a: parseFloat(ni_a.toFixed(2)),
                    him_m: parseFloat(him_m.toFixed(2)),
                    him_a: parseFloat(him_a.toFixed(2)),
                    indisp_m: parseFloat(indisp_m.toFixed(2)),
                    indisp_a: parseFloat(indisp_a.toFixed(2)),
                    coef_indispo_m: parseFloat(coef_indispo_m.toFixed(2)),
                    coef_indispo_a: parseFloat(coef_indispo_a.toFixed(2)),
                });
            });
        });

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

const getHeuresChassis = async (req, res) => {
    try {
        const { du } = req.body; // Date de référence

        // Convertir la date en objet Date
        const dateDu = new Date(du);

        // Calculer le premier et le dernier jour du mois
        const firstDayOfMonth = new Date(dateDu.getFullYear(), dateDu.getMonth(), 1);
        const lastDayOfMonth = new Date(dateDu.getFullYear(), dateDu.getMonth() + 1, 0);

        // Récupérer tous les engins avec leurs parcs, sites et saisies associées
        const engins = await prisma.engin.findMany({
            include: {
                Parc: {
                    include: {
                        Typeparc: true // Inclure le type de parc
                    }
                },
                Site: true, // Inclure le site associé
                Saisiehrm: true // Inclure toutes les saisies hrm de l'engin
            }
        });

        // Formatage des données
        const result = engins.map(engin => {
            // Calcul de hrm_m (somme des hrm pour l'engin dans le mois)
            const hrm_m = engin.Saisiehrm
                .filter(saisie => saisie.du >= firstDayOfMonth && saisie.du <= lastDayOfMonth)
                .reduce((sum, saisie) => sum + saisie.hrm, 0);

            // Calcul de heuresChassis (somme de tous les hrm de l'engin + initialHeureChassis)
            const sommeHrmTotal = engin.Saisiehrm.reduce((sum, saisie) => sum + saisie.hrm, 0);
            const heuresChassis = sommeHrmTotal + (engin.initialHeureChassis || 0);

            return {
                typeparc: engin.Parc.Typeparc.name,
                parc: engin.Parc.name,
                engin: engin.name,
                hrm_m: parseFloat(hrm_m.toFixed(2)), // hrm_m limité à deux chiffres après la virgule
                heuresChassis: parseFloat(heuresChassis.toFixed(2)), // heuresChassis limité à deux chiffres après la virgule
                site: engin.Site.name
            };
        });

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

const getSpecLub = async (req, res) => {
    try {
        const { typelubrifiantId, year } = req.body;

        // Validation des paramètres
        if (!typelubrifiantId || !year) {
            return res.status(400).json({
                message: "typelubrifiantId and year are required"
            });
        }

        const yearNum = parseInt(year);
        const startDate = new Date(yearNum, 0, 1);
        const endDate = new Date(yearNum + 1, 0, 1);

        // Récupérer le type de lubrifiant
        const typelubrifiant = await prisma.typelubrifiant.findUnique({
            where: { id: parseInt(typelubrifiantId) }
        });

        if (!typelubrifiant) {
            return res.status(404).json({ message: "Typelubrifiant not found" });
        }

        // Récupérer tous les parcs triés par nom avec leurs engins
        const parcs = await prisma.parc.findMany({
            orderBy: { name: 'asc' },
            include: {
                engins: {
                    select: { id: true }
                }
            }
        });

        const result = await Promise.all(parcs.map(async (parc) => {
            const parcResult = {
                parc: parc.name,
                nombe_engin: parc.engins.length,
                typelubrifiantId: parseInt(typelubrifiantId),
                typelubrifiant: typelubrifiant.name,
                hrm_total: 0,
                qte_total: 0
            };

            // Initialiser les valeurs mensuelles (1-12)
            for (let month = 1; month <= 12; month++) {
                parcResult[`hrm_${month}`] = 0;
                parcResult[`qte_${month}`] = 0;
                parcResult[`spec_${month}`] = 0;
            }

            // 1. Calcul des HRM par mois
            const hrmByMonth = await prisma.saisiehrm.groupBy({
                by: ['du'],
                where: {
                    enginId: { in: parc.engins.map(e => e.id) },
                    du: {
                        gte: startDate,
                        lt: endDate
                    }
                },
                _sum: { hrm: true }
            });

            // Traitement des HRM
            hrmByMonth.forEach(({ du, _sum }) => {
                const month = du.getMonth() + 1; // Convertir en 1-12
                parcResult[`hrm_${month}`] += _sum.hrm;
                parcResult.hrm_total += _sum.hrm;
            });

            // 2. Calcul des quantités par mois
            const qteByMonth = await prisma.saisielubrifiant.findMany({
                where: {
                    Lubrifiant: { typelubrifiantId: parseInt(typelubrifiantId) },
                    Saisiehim: {
                        Saisiehrm: {
                            enginId: { in: parc.engins.map(e => e.id) },
                            du: {
                                gte: startDate,
                                lt: endDate
                            }
                        }
                    }
                },
                include: {
                    Saisiehim: {
                        include: {
                            Saisiehrm: {
                                select: { du: true }
                            }
                        }
                    }
                }
            });

            // Traitement des quantités
            qteByMonth.forEach(({ qte, Saisiehim }) => {
                const month = Saisiehim.Saisiehrm.du.getMonth() + 1; // Convertir en 1-12
                parcResult[`qte_${month}`] += qte;
                parcResult.qte_total += qte;
            });

            // Calcul des spécifications mensuelles avec 2 décimales
            for (let month = 1; month <= 12; month++) {
                const hrm = parcResult[`hrm_${month}`];
                const qte = parcResult[`qte_${month}`];
                parcResult[`spec_${month}`] = hrm > 0 ? parseFloat((qte / hrm).toFixed(2)) : 0;
            }

            // Calcul de la spécification totale avec 2 décimales
            parcResult.spec_total = parcResult.hrm_total > 0
                ? parseFloat((parcResult.qte_total / parcResult.hrm_total).toFixed(2))
                : 0;

            return parcResult;
        }));

        res.json(result);

    } catch (error) {
        console.error("Error in getSpecLub:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getParetoIndispoParc = async (req, res) => {
    try {
        const { parcId, date } = req.body;

        // Validation des paramètres
        if (!parcId || !date) {
            return res.status(400).json({
                message: "parcId and date are required"
            });
        }

        const inputDate = new Date(date);
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth() + 1; // 1-12
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        // Calcul du nombre d'heures dans le mois
        const daysInMonth = new Date(year, month, 0).getDate();
        const hoursInMonth = daysInMonth * 24;

        // Récupérer le parc avec ses engins
        const parc = await prisma.parc.findUnique({
            where: { id: parseInt(parcId) },
            include: {
                engins: {
                    select: { id: true }
                }
            }
        });

        if (!parc) {
            return res.status(404).json({ message: "Parc not found" });
        }

        // Calcul du Nho (heures dans le mois * nombre d'engins)
        const nho = hoursInMonth * parc.engins.length;

        // Calcul des Him par panne
        const indispoByPanne = await prisma.saisiehim.groupBy({
            by: ['panneId'],
            where: {
                Saisiehrm: {
                    enginId: { in: parc.engins.map(e => e.id) },
                    du: {
                        gte: startDate,
                        lt: endDate
                    }
                }
            },
            _sum: { him: true },
            orderBy: {
                _sum: { him: 'desc' }
            }
        });

        // Récupérer les noms des pannes
        const panneIds = indispoByPanne.map(item => item.panneId);
        const pannes = await prisma.panne.findMany({
            where: { id: { in: panneIds } },
            select: { id: true, name: true }
        });

        // Créer un map pour accéder rapidement aux noms des pannes
        const panneMap = new Map(pannes.map(panne => [panne.id, panne.name]));

        // Calcul de l'indisponibilité pour chaque panne
        const result = indispoByPanne.map(item => {
            const indispo = nho > 0 ? parseFloat(((100 * item._sum.him) / nho).toFixed(2)) : 0;
            return {
                // parc: parc.name,
                // year: year.toString(),
                // month: month.toString(),
                // nombe_engin: parc.engins.length,
                panne: panneMap.get(item.panneId) || 'Inconnue',
                indispo: indispo
            };
        });

        res.json(result);

    } catch (error) {
        console.error("Error in getParetoIndispoParc:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getParetoMtbfParc = async (req, res) => {
    try {
        const { parcId, date } = req.body;

        // Validation des entrées
        if (!parcId || !date) {
            return res.status(400).json({ error: "parcId et date sont obligatoires" });
        }

        const inputDate = new Date(date);
        const year = inputDate.getFullYear();

        // Récupération du parc avec ses engins actifs
        const parc = await prisma.parc.findUnique({
            where: { id: parseInt(parcId) },
            include: {
                engins: {
                    where: { active: true },
                    select: { id: true }
                }
            }
        });

        if (!parc) {
            return res.status(404).json({ error: "Parc non trouvé" });
        }

        const enginIds = parc.engins.map(engin => engin.id);
        if (enginIds.length === 0) {
            return res.status(400).json({ error: "Aucun engin actif dans ce parc" });
        }

        // Noms des mois en français
        const monthNames = [
            "janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre"
        ];

        const results = [];

        // Traitement pour chaque mois de l'année
        for (let month = 0; month < 12; month++) {
            const monthIndex = month + 1;
            const monthStart = new Date(year, month, 1);
            const monthEnd = new Date(year, month + 1, 0);

            // Récupération des HRM (somme des hrm)
            const hrmResult = await prisma.saisiehrm.aggregate({
                where: {
                    enginId: { in: enginIds },
                    du: { gte: monthStart, lte: monthEnd }
                },
                _sum: { hrm: true }
            });
            const hrm = hrmResult._sum.hrm || 0;

            // Récupération des NI (somme des ni)
            const niResult = await prisma.saisiehim.aggregate({
                where: {
                    Saisiehrm: {
                        enginId: { in: enginIds },
                        du: { gte: monthStart, lte: monthEnd }
                    }
                },
                _sum: { ni: true }
            });
            const ni = niResult._sum.ni || 0;

            // Calcul du MTBF (avec 2 décimales)
            const mtbf = ni > 0 ? parseFloat((hrm / ni).toFixed(2)) : null;

            // Construction de l'objet résultat pour le mois
            results.push({
                mois: monthNames[month],
                // [`hrm_${monthIndex}`]: hrm,
                // [`ni_${monthIndex}`]: ni,
                // [`mtbf_${monthIndex}`]: mtbf,
                [`mtbf`]: mtbf
            });
        }

        res.json(results);

    } catch (error) {
        console.error("Erreur dans getParetoMtbfParc:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};


module.exports = {
    getRapportRje,
    getRapportUnitePhysique,
    getEtatMensuel,
    getIndispoParParc,
    getHeuresChassis,
    getSpecLub,
    getParetoIndispoParc,
    getParetoMtbfParc,
};