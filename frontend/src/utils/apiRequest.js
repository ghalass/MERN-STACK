// import Cookies from "js-cookie";


export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            credentials: "include"
        };

        // const tokenCookie = Cookies.get('accessToken');

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        // if (tokenCookie) {
        //     // headers.set("authorization", `Bearer ${tokenCookie}`);
        //     headers["Authorization"] = `Bearer ${tokenCookie}`;
        // }

        const options = {
            method,
            headers,
            credentials: 'include'
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const url = `${baseUrl}${endpoint}`;

        const response = await fetch(url, options);

        // REFRESH TOKEN START
        // if (response.status === 403) {
        //     console.log('sending refresh token');
        //     // need to call refresh api to get new access token
        //     const refreshResult = await fetch(`${baseUrl}/auth/refresh`, {
        //         method: 'GET'
        //     });

        //     if (refreshResult?.ok) {
        //         const { accessToken } = await refreshResult.json();
        //         Cookies.set('accessToken', accessToken);
        //         response = await fetch(url, options);
        //     } else {
        //         if (refreshResult.status === 403) {
        //             console.log("Your login has expired.");
        //             throw new Error("Your login has expired.");
        //         } else {
        //             throw new Error(refreshResult.statusText);
        //         }
        //     }
        // }
        // REFRESH TOKEN END

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
        throw new Error(error.message || "Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
};
