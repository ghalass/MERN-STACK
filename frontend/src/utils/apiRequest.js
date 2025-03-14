
// const TIME_OUT = 1000; // FOR TEST LOADING TIME

// export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
//     try {
//         const headers = { "Content-Type": "application/json" };

//         const options = { method, headers, credentials: 'include' };

//         if (body) options.body = JSON.stringify(body)

//         const baseUrl = import.meta.env.VITE_BASE_URL;
//         const url = `${baseUrl}${endpoint}`;

//         const response = await fetch(url, options);

//         // Vérifier si le serveur ne répond pas du tout
//         if (!response) throw new Error("Aucune réponse du serveur.")

//         // Gérer les erreurs spécifiques HTTP
//         if (response.status === 404) throw new Error(`Endpoint non trouvé : ${endpoint}`);

//         if (response.status === 500) throw new Error("Erreur interne du serveur. Veuillez réessayer plus tard.");

//         let data;
//         try {
//             data = await response.json(); // Essayer de parser le JSON
//         } catch (parseError) {
//             throw new Error("Réponse invalide du serveur.");
//         }

//         if (!response.ok) throw new Error(data?.error || "Une erreur est survenue lors de la requête.");


//         await new Promise((resolve) => setTimeout(resolve, TIME_OUT))

//         return data;
//     } catch (error) {
//         // console.log(error);     
//         // throw new Error(error.message || "Une erreur s'est produite. Veuillez réessayer plus tard.");
//         console.error(`Erreur (${error.status}): ${error.message}`);
//         console.log(error.status);

//         if (error.status === 401) {
//             alert("Votre session a expiré. Veuillez vous reconnecter.");
//             // Redirection vers la page de connexion
//             window.location.href = "/login";
//         }
//     }
// };

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
        console.error(`API Error (${error.status ?? "UNKNOWN"}):`, error.message);
        // CHECK IF AUTHENTICATED USER OR
        if (error.status === 401) {
            // Redirection vers la page de connexion
            window.location.href = "/login";
        }

        throw {
            message: error?.message || "Une erreur est survenue lors de la requête.",
            status: error.status
        };

    }
};
