export function mostrarToast(mensaje, tipo) {

    const toast = document.createElement("div");
    toast.className = 'toast';
    toast.classList.add("toast", tipo);

    toast.innerHTML = `
        <i class="${obtenerIcono(tipo)}"></i>
        <span>${mensaje}</span>
    `;

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