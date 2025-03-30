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

        default:
            re = `NON ATTRIBUÉ`;
            break;
    }
    return re;
};

// CETTE FONCTION SERT POUR CREER UNE LISTE POUR PAGINATION
export function getMultiplesOf10(num) {
    let multiples = [];

    // Si le nombre est inférieur à 10, retourner [10]
    if (num < 10) {
        return [10];
    }

    // Trouver les multiples de 10 jusqu'à num
    for (let i = 10; i <= num; i += 10) {
        multiples.push(i);
    }

    return multiples;
}


// EXCEL EXPORT
import * as XLSX from "xlsx";
import { format } from 'date-fns';
export const exportExcel = (tableId, title = "exportedData") => {
    const dateNow = new Date()
    const formattedDate = format(dateNow, 'dd_MM_yyyy_HH_mm_ss');
    const table = document.getElementById(tableId);
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, `${title + "_" + formattedDate}.xlsx`);
};
