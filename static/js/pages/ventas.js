import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import { inicializarDialogEliminarVenta } from "../ui/ventasUI.js";

import {
    eliminarVentaController,
    buscarVentasController,
    cargarVentas,
    buscarDetallesController
} from "../controllers/ventasController.js";

document.addEventListener("DOMContentLoaded", () => {

    activarSidebar();
    botonDesplegableCompras();
    inicializarDialogEliminarVenta(eliminarVentaController);
    cargarVentas();

});


//Ver detalles
document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("dialog-detalles");
    const tbody = document.getElementById("tbody-ventas");
    const btnCerrar = document.getElementById("btn-cerrar-detalles");
    const btnX = document.getElementById("btn-x-detalles");
    const lblNumeroOperacion = document.getElementById("lbl-numero-operacion");
    const lblTituloOperacion = document.getElementById("lbl-titulo-operacion");
    const lblUsuario = document.getElementById("lbl-usuario");

    tbody.addEventListener("click", (e) => {
        const boton = e.target.closest(".detalles");

        if (boton) {
            buscarDetallesController(boton)
            lblTituloOperacion.textContent = "Detalles de la Venta";
            lblNumeroOperacion.textContent = "N° Venta";
            lblUsuario.textContent = "Usuario";

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

