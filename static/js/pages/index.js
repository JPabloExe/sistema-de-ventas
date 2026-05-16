import { abrirVentanas } from "../utilities/ventanas.js"

import { cargarInformeInventario } from "../controllers/inventarioController.js"

import { cargarInformeVentas } from "../controllers/ventasController.js"

import { activarSidebar } from "../components/sidebar.js";

document.addEventListener("DOMContentLoaded", () => {
    activarSidebar();
    cargarInformeInventario();
    cargarInformeVentas();
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