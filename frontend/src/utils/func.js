import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { fr } from "date-fns/locale";

export function formatDateAgo(theDate) {
    return formatDistanceToNow(new Date(theDate), {
        addSuffix: true,
        locale: fr,
    })
}

