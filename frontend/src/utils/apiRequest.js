import { API } from "./constants";

/**
 * Fonction générique pour effectuer des requêtes API
 * @param {string} endpoint - L'endpoint de l'API (ex: "/workouts")
 * @param {string} method - La méthode HTTP (GET, POST, PUT, DELETE)
 * @param {object} body - Les données à envoyer (null pour GET)
 * @param {string} token - Le token d'authentification
 * @returns {Promise<object>} - Retourne les données de la réponse ou une erreur
 */
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

        if (response.status === 404) {
            return {
                error: `Endpoint non trouvé : ${endpoint}`
            };
        }

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    } catch (err) {
        console.log(err);
        return err;
        // throw err;
    }
};
