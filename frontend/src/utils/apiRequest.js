import { API } from "./constants";

// /**
//  * Fonction générique pour effectuer des requêtes API
//  * @param {string} endpoint - L'endpoint de l'API (ex: "/workouts")
//  * @param {string} method - La méthode HTTP (GET, POST, PUT, DELETE)
//  * @param {object} body - Les données à envoyer (null pour GET)
//  * @param {string} token - Le token d'authentification
//  * @returns {Promise<object>} - Retourne les données de la réponse ou une erreur
//  */

export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API}${endpoint}`, options);

        // Vérifier si le serveur ne répond pas du tout
        if (!response) {
            throw new Error("Aucune réponse du serveur.");
        }

        // Gérer les erreurs spécifiques HTTP
        if (response.status === 404) {
            throw new Error(`Endpoint non trouvé : ${endpoint}`);
        }
        if (response.status === 500) {
            throw new Error("Erreur interne du serveur. Veuillez réessayer plus tard.");
        }

        let data;
        try {
            data = await response.json(); // Essayer de parser le JSON
        } catch (parseError) {
            throw new Error("Réponse invalide du serveur.");
        }

        if (!response.ok) {
            throw new Error(data?.error || "Une erreur est survenue lors de la requête.");
        }

        return data;
    } catch (error) {
        // console.error("Erreur lors de la requête API :", error);
        throw new Error(error.message || "Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
};
