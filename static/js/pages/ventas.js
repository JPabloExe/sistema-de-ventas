import { activarSidebar } from "../components/sidebar.js";

import { inicializarDialogEliminarVenta } from "../ui/ventasUI.js";

import {
    eliminarVentaController,
    buscarVentasController,
    cargarVentas,
    buscarDetallesController
} from "../controllers/ventasController.js";

document.addEventListener("DOMContentLoaded", () => {

    inicializarDialogEliminarVenta(eliminarVentaController);
    cargarVentas();
    activarSidebar();

});

document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("dialog-detalles-ventas");
    const tbody = document.getElementById("tbody-ventas");
    const btnCerrar = document.getElementById("btn-cerrar-detalles");
    const btnX = document.getElementById("btn-x-detalles");

    tbody.addEventListener("click", (e) => {
        const boton = e.target.closest(".detalles");

        if (boton) {
            buscarDetallesController(boton)
            dialog.showModal();
        }
    });

    btnX.addEventListener("click", () => {
        dialog.close();
    });

    btnCerrar.addEventListener("click", () => {
        dialog.close();
    });
});

// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

// Buscar Ventas
document.addEventListener("DOMContentLoaded", () => {

    const btnBuscar = document.getElementById("btn-buscar");

    btnBuscar.addEventListener("click", () => {
        const fechaInicial = document.getElementById("input-fecha-inicial").value;
        const fechaFinal = document.getElementById("input-fecha-final").value;

        buscarVentasController(fechaInicial, fechaFinal);

    });

});

