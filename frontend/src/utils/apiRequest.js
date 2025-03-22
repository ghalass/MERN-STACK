const TIME_OUT = 1000; // FOR TEST LOADING TIME

export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
    try {
        const headers = { "Content-Type": "application/json" };

        const options = { method, headers, credentials: "include" };

        if (body) options.body = JSON.stringify(body);

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const url = `${baseUrl}${endpoint}`;

        const response = await fetch(url, options);

        if (!response) throw { message: "Aucune réponse du serveur.", status: null };

        let data;
        try {
            data = await response.json(); // Essayer de parser le JSON
        } catch (parseError) {
            throw { message: "Réponse invalide du serveur.", status: response.status };
        }

        if (!response.ok) {
            throw {
                message: data?.error || "Une erreur est survenue lors de la requête.",
                status: response.status
            };
        }

        await new Promise((resolve) => setTimeout(resolve, TIME_OUT));

        return data;
    } catch (error) {
        // CHECK IF AUTHENTICATED USER OR
        if (error.status === 401) {
            // Redirection vers la page de connexion
            window.location.href = "/login";
        } else {
            console.error(`API Error (${error.status ?? "UNKNOWN"}):`, error.message);
        }

        throw {
            message: error?.message || "Une erreur est survenue lors de la requête.",
            status: error.status
        };

    }
};
