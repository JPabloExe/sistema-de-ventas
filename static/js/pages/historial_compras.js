import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import { abrirVentanas } from "../utilities/ventanas.js";

import {
    cargarCompras,
    obtenerDetallesController,
    cargarProveedoresController,
    cargarInputBusquedaController,
    buscarComprasController,
    recibirCompraController,
    eliminarCompraController,
    obtenerProductosRecepcionController
} from "../controllers/comprasController.js";

document.addEventListener('DOMContentLoaded', () => {

    const selectProveedoresAcciones = document.getElementById("select-proveedores-acciones");

    activarSidebar();
    botonDesplegableCompras();
    cargarCompras();
    cargarProveedoresController(selectProveedoresAcciones);
    cargarInputBusquedaController();
});

// Buscar Compra
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("input-buscar");
    input.setAttribute("placeholder", "Buscar compra por factura");

    input.addEventListener("input", () => {

        if (input.value.trim() === "") {
            cargarCompras();
        }
        if (input.value.trim().length >= 1) {
            buscarComprasController(input.value.trim());
        }
    });
});


// Ver detalles de una compra
document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("dialog-detalles");
    const tbody = document.getElementById("tbody-compras");
    const btnCerrar = document.getElementById("btn-cerrar-detalles");
    const btnX = document.getElementById("btn-x-detalles");
    const lblNumeroOperacion = document.getElementById("lbl-numero-operacion");
    const lblTituloOperacion = document.getElementById("lbl-titulo-operacion");
    const lblUsuario = document.getElementById("lbl-usuario");

    tbody.addEventListener("click", (e) => {
        const boton = e.target.closest(".detalles");

        if (boton) {
            obtenerDetallesController(boton)
            lblTituloOperacion.textContent = "Detalles de la Compra";
            lblNumeroOperacion.textContent = "N° Factura";
            lblUsuario.textContent = "Proveedor";

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

// Recibir mercancia(compras)
document.addEventListener("DOMContentLoaded", () => {

    const dialog = document.getElementById("dialog-recibir-mercancia");
    const tbody = document.getElementById("tbody-compras");
    const btnCerrar = document.getElementById("btn-cancelar-recepcion");
    const btnX = document.getElementById("btn-x-recibir");
    const btnConfirmar = document.getElementById("btn-confirmar-recepcion");
    let botonTemp = null;

    tbody.addEventListener("click", (e) => {
        const boton = e.target.closest(".recibir");

        if (boton) {
            botonTemp = boton;
            obtenerProductosRecepcionController(boton);

            dialog.showModal();
        }
    });

    btnX.addEventListener("click", () => {
        dialog.close();
    });

    btnCerrar.addEventListener("click", () => {
        dialog.close();
    });

    btnConfirmar.addEventListener("click", async () => {
        await recibirCompraController(botonTemp);
        await cargarCompras();

        dialog.close();
    });

});

// Eliminar Compra
document.addEventListener("DOMContentLoaded", () => {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogEliminar = document.getElementById("dialog-eliminar");
    const tituloDialog = document.getElementById("titulo");
    const tbody = document.getElementById("tbody-compras");

    let idAEliminar = null;

    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".eliminar");

        if (botonEliminar) {
            tituloDialog.textContent = "¿Deseas borrar esta compra?";
            idAEliminar = botonEliminar.dataset.id;
            dialogEliminar.showModal();
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialogEliminar.close();
    });

    btnConfirmar.addEventListener("click", async () => {
        if (idAEliminar) {
            await eliminarCompraController(idAEliminar);
            await cargarCompras();
            dialogEliminar.close();
        }
    });

});

// Filtrar compras por proveedores
document.addEventListener("DOMContentLoaded", () => {
    const selectProveedoresAcciones = document.getElementById("select-proveedores-acciones");
    const selectEstadoAcciones = document.getElementById("select-estados-acciones");

    selectEstadoAcciones.addEventListener("change", () => {
        cargarCompras();
    });

    selectProveedoresAcciones.addEventListener("change", () => {
        cargarCompras();
    });

});

document.addEventListener("DOMContentLoaded", () => {

    const tbody = document.getElementById("tbody-recepcion");

    tbody.addEventListener("input", (e) => {
        const input = e.target.closest(".input-recibido")

        if (!input) return;

        const fila = input.closest("tr");
        const lblFaltante = fila.querySelector(".lbl-faltante")

        const faltante = parseInt(input.dataset.faltante);
        let valor = parseInt(input.value) || 0;

        if (valor > faltante) {
            valor = faltante;
            input.value = faltante;
        }

        lblFaltante.textContent = Math.max(0, faltante - valor);

    });

});

// Recargar Pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-nueva-compra");

    boton.addEventListener("click", () => {
        abrirVentanas("compras");
    });
});