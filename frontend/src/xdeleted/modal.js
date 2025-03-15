import { Modal } from "bootstrap";

export function openModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
        console.error(`Modal with ID '${modalId}' not found.`);
        return;
    }

    const myModal = new Modal(modalElement);
    myModal.show();

    // ✅ Ajoute un délai pour forcer la mise à jour du DOM
    setTimeout(() => {
        modalElement.removeAttribute("aria-hidden");
    }, 100);
}


export function closeModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
        console.error(`Modal with ID '${modalId}' not found.`);
        return;
    }

    const myModal = Modal.getInstance(modalElement);
    if (myModal) {
        myModal.hide();

        // ✅ Attendre la fin de l'animation pour modifier aria-hidden et déplacer le focus
        setTimeout(() => {
            modalElement.setAttribute("aria-hidden", "true");

            // ✅ Déplacer le focus vers <body> pour éviter le problème d'accessibilité
            document.body.focus();
        }, 300); // Correspond au temps d'animation du modal Bootstrap
    }
}
