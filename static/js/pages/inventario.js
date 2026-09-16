import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import {
    llenarFormularioProducto,
    limpiarFormularioProducto
} from "../ui/inventarioUI.js";

import {
    cargarInventarioController,
    eliminarProductoController,
    agregarProductoController,
    actualizarProductoController,
    buscarProductoController,
    crearCategoriaController,
    cargarCategoriasController,
    cargarInputBusquedaController,
    cargarProveedoresController,
    cargarProductosStockBajoController,
    cargarProductosAVencerController,
    cargarTiposPerecibilidadController
} from "../controllers/inventarioController.js";

document.addEventListener("DOMContentLoaded", () => {

    const selectCategorias = document.getElementById("select-categorias");
    const selectProveedores = document.getElementById("select-proveedor-dialog");
    const selectPerecibilidad = document.getElementById("select-perecibilidad-dialog");

    const urlParams = new URLSearchParams(window.location.search);
    const stockBajo = urlParams.get("stock_bajo");
    const aVencer = urlParams.get("aVencer");

    activarSidebar();
    botonDesplegableCompras();

    if (stockBajo) {
        cargarProductosStockBajoController();
    } else if (aVencer) {
        cargarProductosAVencerController();
    } else {
        cargarInventarioController(0);
    }

    cargarCategoriasController(selectCategorias);
    cargarProveedoresController(selectProveedores);
    cargarTiposPerecibilidadController(selectPerecibilidad);
    cargarInputBusquedaController();

});

// Agregar y actualizar producto
document.addEventListener("DOMContentLoaded", () => {

    const btnNuevoProducto = document.getElementById("btn-nuevo-producto");
    const botonCerrar = document.getElementById("btn-cancelar-productos");
    const dialog = document.getElementById("dialog-productos");
    const btnAccion = document.getElementById("btn-accion-dialog-productos");
    const form = document.getElementById("form-productos");
    const tbody = document.getElementById("tbody-productos");
    const inputCodigo = document.getElementById("input-codigo");
    const select = document.getElementById("select-categorias-dialog");

    cargarCategoriasController(select);

    let modo = null;

    // Abrir dialog para agregar
    btnNuevoProducto.addEventListener("click", () => {
        modo = "agregar"
        limpiarFormularioProducto(form);
        btnAccion.textContent = "Agregar";
        inputCodigo.readOnly = false;

        dialog.showModal();
    });

    // Abrir dialog para actualizar
    tbody.addEventListener("click", (e) => {
        const boton = e.target.closest(".actualizar");

        if (boton) {
            modo = "actualizar";
            llenarFormularioProducto(boton);
            btnAccion.textContent = "Actualizar";
            inputCodigo.readOnly = true;

            dialog.showModal();
        }
    })

    // Cerrar dialog
    botonCerrar.addEventListener("click", () => {
        dialog.close();
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (modo === "agregar") {

            await agregarProductoController(form);

        } else if (modo === "actualizar") {

            await actualizarProductoController(form);
            dialog.close();

        }

        await cargarInventarioController(0);

        inputCodigo.focus();

    })

});

// Crear Categoria
document.addEventListener("DOMContentLoaded", () => {

    const dialog = document.getElementById("dialog-categoria");
    const btnNuevaCategoria = document.getElementById("btn-nueva-categoria");
    const btnCancelar = document.getElementById("btn-cancelar-categoria");
    const btnCrearCategoria = document.getElementById("btn-crear-categoria");
    const form = document.getElementById("form-categoria");

    btnNuevaCategoria.addEventListener("click", () => {
        dialog.showModal();
    });

    btnCancelar.addEventListener("click", () => {
        dialog.close();
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await crearCategoriaController();
        dialog.close();
    });

});

// Eliminar Producto
document.addEventListener("DOMContentLoaded", () => {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-eliminar");
    const tituloDialog = document.getElementById("titulo");
    const tbody = document.getElementById("tbody-productos");

    let codigoAEliminar = null;

    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".eliminar");

        if (botonEliminar) {
            tituloDialog.textContent = "¿Deseas borrar este producto?";
            codigoAEliminar = botonEliminar.dataset.codigo;
            dialogConfirmacion.showModal();
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialogConfirmacion.close();
    });

    btnConfirmar.addEventListener("click", () => {
        if (codigoAEliminar) {
            eliminarProductoController(codigoAEliminar);
            cargarInventarioController(0);
            dialogConfirmacion.close();
        }
    });

});

// Recargar Pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.href = "/inventario";
    });
});

// Buscar Producto
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("input-buscar");
    input.setAttribute("placeholder", "Buscar producto por codigo");

    input.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        const codigo = input.value.trim();

        if (codigo) {
            buscarProductoController(codigo);
        }
    });

    input.addEventListener("input", () => {
        const codigo = input.value.trim();

        if (!codigo) {
            cargarInventarioController(0);
        }
    });
});

// Cargar inventario por categoria
document.addEventListener("DOMContentLoaded", () => {

    const select = document.getElementById("select-categorias");

    select.addEventListener("change", () => {
        cargarInventarioController(select.value);
    });

});

document.addEventListener("DOMContentLoaded", () => {

    const perecibilidad = document.getElementById("select-perecibilidad-dialog");
    const inputCaducidad = document.getElementById("input-caducidad");

    perecibilidad.addEventListener("change", () => {

        if (perecibilidad.value === "1") {
            inputCaducidad.required = true;
            inputCaducidad.readOnly = false;

        } else if (perecibilidad.value === "2") {
            inputCaducidad.required = false;
            inputCaducidad.readOnly = true;
            inputCaducidad.value = '';

        } else {
            inputCaducidad.required = true;
            inputCaducidad.readOnly = true;

        }

    });

});