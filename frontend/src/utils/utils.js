import { Modal } from 'bootstrap';

export function openModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
        console.error(`Modal with ID '${modalId}' not found.`);
        return;
    }

    const myModal = new Modal(modalElement);
    // Remove aria-hidden from the modal element directly
    modalElement.removeAttribute('aria-hidden');
    myModal.show();
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
        // Directly manipulate the modal DOM element to set aria-hidden
        modalElement.setAttribute('aria-hidden', 'true');
    }
}
