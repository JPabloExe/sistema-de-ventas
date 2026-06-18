import { activarSidebar } from "../components/sidebar.js";

import { 
    llenarFormularioProducto, 
    llenarTablaInventario,
    limpiarFormularioProducto
} from "../ui/inventarioUI.js";

import { 
    cargarInventarioController,
    eliminarProductoController,
    agregarProductoController,
    actualizarProductoController,
    buscarProductoController
} from "../controllers/inventarioController.js"; 

import { limpiarFormulario } from "../ui/usuariosUI.js";

document.addEventListener("DOMContentLoaded", () => {
    
    activarSidebar();
    cargarInventarioController(0);
    
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
        dialog.close()
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (modo === "agregar") {

            await agregarProductoController();

        } else if (modo === "actualizar") {

            await actualizarProductoController();

        }

        await cargarInventarioController(0);
        limpiarFormulario(form);

    })
    
});

// Eliminar Producto
document.addEventListener("DOMContentLoaded", () => {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-eliminar");
    const tbody = document.getElementById("tbody-productos");

    let codigoAEliminar = null;

    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".eliminar");

        if (botonEliminar) {
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
        window.location.reload();
    });
});

// Buscar Producto
document.addEventListener("DOMContentLoaded", () => {
    
    const input = document.getElementById("input-buscar-producto");

    input.addEventListener("input", () => {

        if (input.value.trim() === "") {
            cargarInventarioController(0);
        }
        if (input.value.trim().length === 4) {
            buscarProductoController(input.value.trim());
        }
    });
});

// Cargar inventario por categoria
document.addEventListener("DOMContentLoaded", () => {

    const select = document.getElementById("select-categorias-acciones");

    select.addEventListener("change", () => {
        cargarInventarioController(parseInt(select.value));
    });

});