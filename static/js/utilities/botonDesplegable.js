export function botonDesplegableCompras() {

    const comprasBtn = document.getElementById("comprasBtn");
    const submenuCompras = document.getElementById("submenuCompras");
    const flechaCompras = document.getElementById("flechaCompras");

    // Todos los botones del sidebar
    const botonesSidebar = document.querySelectorAll(".sidebar-btn");

    // Estado inicial
    comprasBtn.classList.remove("activo");
    submenuCompras.classList.remove("activo");

    flechaCompras.classList.remove("fa-chevron-up");
    flechaCompras.classList.add("fa-chevron-down");


    // Botón Compras
    comprasBtn.addEventListener("click", () => {

        // Quitar activo de todos los botones
        botonesSidebar.forEach(boton => {
            boton.classList.remove("activo");
        });

        // Abrir/cerrar submenú
        submenuCompras.classList.toggle("activo");

        // Activar Compras solamente si el submenú está abierto
        if (submenuCompras.classList.contains("activo")) {
            comprasBtn.classList.add("activo");
        }

        // Cambiar flecha
        if (submenuCompras.classList.contains("activo")) {

            flechaCompras.classList.remove("fa-chevron-down");
            flechaCompras.classList.add("fa-chevron-up");

        } else {

            flechaCompras.classList.remove("fa-chevron-up");
            flechaCompras.classList.add("fa-chevron-down");

        }

    })
}