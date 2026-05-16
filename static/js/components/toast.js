let toastTimeout;

export function mostrarToast(mensaje, tipo) {
    const letrero = document.getElementById("letrero");
    const texto = document.getElementById("texto-letrero")
    const icono = document.getElementById("icono-letrero")

    // quitar tipos anteriores
    letrero.classList.remove('success', 'error', 'warning', 'show');
    texto.textContent = mensaje;

    if (tipo == "success") {
        icono.className = 'fa-solid fa-circle-check'
        letrero.classList.add(tipo)
    }

    if (tipo == "error") {
        icono.className = "fa-solid fa-circle-xmark"
        letrero.classList.add(tipo)
    }

    // forzar reflow para que la animación siempre se ejecute
    letrero.offsetHeight;

    letrero.classList.add("show");


    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        letrero.classList.remove('show');
    }, 2500);
}