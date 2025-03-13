import Swal from 'sweetalert2'

/**
 * Show SweetAlert2 Message
 * @param {string} icon - Type of alert ['success', 'error', 'warning', 'info'].
 * @param {*} text - Text of the alert
 * @param {*} title - Title of the alert (optional)
 * @returns
 *
 * @example
 * showAlert('info', 'Opération réussie!', 'Info!')
 * showAlert('error', 'Opération réussie!', 'Error!')
 * showAlert('success', 'Opération réussie!', 'Success!')
 * showAlert('warning', 'Opération réussie!', 'Warning!')
 */
export function showAlert(icon, text, title = '', timer = null) {
    if (title != '') {
        switch (icon) {
            case 'info':
                title = 'Info!'
                break;
            case 'error':
                title = 'Error!'
                break;
            case 'success':
                title = 'Success!'
                break;
            case 'warning':
                title = 'Warning!'
                break;
            default:
                break;
        }
    }
    return Swal.fire({
        toast: true,
        icon: icon,
        title: title,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        animation: true,
        position: 'top-end',
        showConfirmButton: false,
        text: text,
        confirmButtonText: 'OK',
        timer: timer === 'static' ? null : 4000,
        showCloseButton: true
    })
}

export function useSwalConfirm(message, callback) {
    Swal.fire({
        title: "Etes-vous sûr?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, continuer!"
    }).then((result) => {
        if (result.isConfirmed) {
            callback()
        }
    });
}
