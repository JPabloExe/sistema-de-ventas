import { abrirVentanas } from "../utilities/ventanas.js";

import { cargarInformeInventario } from "../controllers/inventarioController.js";

import { cargarInformeVentas } from "../controllers/ventasController.js";

import { usuarioActualController } from "../controllers/usuariosController.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import { activarSidebar } from "../components/sidebar.js";

document.addEventListener("DOMContentLoaded", () => {
    activarSidebar();
    botonDesplegableCompras();
    cargarInformeInventario();
    cargarInformeVentas();
    usuarioActualController();
});

// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const botonPVentas = document.getElementById("btn-pos");
    const botonInventario = document.getElementById("btn-inventario");
    const botonStockBajo = document.getElementById("btn-stock-bajo");
    const botonVentasHoy = document.getElementById("btn-ventas-hoy");
    const botonVerProductos = document.getElementById("btn-ver-productos");
    const botonValorInventario = document.getElementById("btn-valor-inventario");

    botonPVentas.addEventListener("click", () => {
        abrirVentanas("puntoVentas");
    });

    botonInventario.addEventListener("click", () => {
        abrirVentanas("inventario");
    });

    botonStockBajo.addEventListener("click", () => {
        window.location.href = "/inventario?stock_bajo=true";
    });

    botonVentasHoy.addEventListener("click", () => {
        window.location.href = "/ventas?ventas_hoy=true";
    });

    botonVerProductos.addEventListener("click", () => {
        window.location.href = "/inventario";
    });

    botonValorInventario.addEventListener("click", () => {
        window.location.href = "/inventario";
    });
});