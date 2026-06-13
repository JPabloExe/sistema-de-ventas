export function mostrarToast(mensaje, tipo) {

    const template = document.getElementById("toast-template");

    const toast = template.content.firstElementChild.cloneNode(true);

    const icono = toast.querySelector(".toast-icon");
    const texto = toast.querySelector(".toast-message");

    icono.className = `toast-icon ${obtenerIcono(tipo)}`;
    texto.textContent = mensaje;

    toast.classList.add(tipo);

    const contenedor = document.getElementById("contenedor-toasts");

    contenedor.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

function obtenerIcono(tipo) {

    switch (tipo) {
        case "success":
            return "fa-solid fa-circle-check";

        case "error":
            return "fa-solid fa-circle-xmark";
            
            case "exception":
            return "fa-solid fa-triangle-exclamation";

        default:
            return "";
    }
}