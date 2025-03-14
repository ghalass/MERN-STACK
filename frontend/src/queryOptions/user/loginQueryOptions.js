import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiRequest";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router";

import { toast as t } from "react-toastify";
import { useAuth } from "../../context/Auth";
// import { toast as t2 } from "react-hot-toast";

export default function loginQueryOptions() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/";
    return queryOptions({
        mutationFn: login,
        onSuccess: (response) => {
            const token = response.token;
            auth.login(response?.user);
            auth.setToken(token);
            navigate(redirectPath, { replace: true });
            t.success("Connecté avec succès.");
        },
    })
}

const login = async (data) => {
    return await apiRequest(API_PATHS.AUTH.LOGIN, "POST", data);
};
