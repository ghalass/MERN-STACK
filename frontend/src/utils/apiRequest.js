
const TIME_OUT = 1000; // FOR TEST LOADING TIME

export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        const options = { method, headers, credentials: 'include' };

        if (body) options.body = JSON.stringify(body)

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const url = `${baseUrl}${endpoint}`;

        const response = await fetch(url, options);

        // Vérifier si le serveur ne répond pas du tout
        if (!response) throw new Error("Aucune réponse du serveur.")

        // Gérer les erreurs spécifiques HTTP
        if (response.status === 404) throw new Error(`Endpoint non trouvé : ${endpoint}`);

        if (response.status === 500) throw new Error("Erreur interne du serveur. Veuillez réessayer plus tard.");

        let data;
        try {
            data = await response.json(); // Essayer de parser le JSON
        } catch (parseError) {
            throw new Error("Réponse invalide du serveur.");
        }

        if (!response.ok) throw new Error(data?.error || "Une erreur est survenue lors de la requête.");


        await new Promise((resolve) => setTimeout(resolve, TIME_OUT))

        return data;
    } catch (error) {
        throw new Error(error.message || "Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
};
