import {abrirVentanas} from "../ui/ventanas.js"

import {
    cargarInformeInventario
} from "../controllers/inventarioController.js"

document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const sidebar = document.getElementById("sidebar");
    const contenedor = document.getElementById("contenedor");
    const divboton = document.getElementById("div-boton");

    if (btnMenu && sidebar) {
        btnMenu.addEventListener("click", () => {
            btnMenu.classList.toggle("active");
            sidebar.classList.toggle("active");
            contenedor.classList.toggle("active");
            divboton.classList.toggle("active");
        });
    }
});

// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const linkIndex = document.getElementById("link-inicio");
    const linkInventario = document.getElementById("link-inventario");
    const linkPVentas = document.getElementById("link-punto-ventas");
    const linkVentas = document.getElementById("link-ventas");
    const botonPVentas = document.getElementById("pVentas");
    const botonInventario = document.getElementById("inventario");

    linkIndex.addEventListener("click", () => {
        abrirVentanas("")
    });

    linkInventario.addEventListener("click", () => {
        abrirVentanas("inventario")
    });
    
    linkPVentas.addEventListener("click", () => {
        abrirVentanas("puntoVentas")
    });
    
    linkVentas.addEventListener("click", () => {
        abrirVentanas("ventas")
    });

    botonPVentas.addEventListener("click", () => {
        abrirVentanas("puntoVentas")
    });

    botonInventario.addEventListener("click", () => {
        abrirVentanas("inventario")
    });
});

document.addEventListener("DOMContentLoaded", () => {
    cargarInformeInventario();
    //informeVentas();
});