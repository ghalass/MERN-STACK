import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { fr } from "date-fns/locale";

export function formatDateAgo(theDate) {
    return formatDistanceToNow(new Date(theDate), {
        addSuffix: true,
        locale: fr,
    })
}

export const getUserRole = (user) => {
    let re = "";
    switch (user?.role) {
        case "ADMIN":
            re = `Administrateur`;
            break;

        case "SUPER_ADMIN":
            re = `Super Administrateur`;
            break;

        case "USER":
            re = `Utilisateur`;
            break;

        case "USER":
            re = `Visiteur`;
            break;

        default:
            re = `NON ATTRIBUÉ`;
            break;
    }
    return re;
};