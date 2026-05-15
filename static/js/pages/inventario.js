import { 
    inicializarDialogEliminar,
    llenarFormularioProducto, 
    llenarTablaInventario
} from "../ui/inventarioUI.js";

import { 
    cargarInventario,
    eliminarProductoController,
    agregarProductoController,
    actualizarProductoController,
    buscarProductoController
 } from "../controllers/inventarioController.js"; 

document.addEventListener("DOMContentLoaded", () => {

    inicializarDialogEliminar(eliminarProductoController);
    
});

document.addEventListener("DOMContentLoaded", () => {

    cargarInventario("");

});

// Agregar Producto
document.addEventListener("DOMContentLoaded", () => {
    
    const botonAbrir = document.getElementById("btn-nuevo-producto");
    const botonCerrar = document.getElementById("btn-cerrar-dialog-agregar");
    const dialogAgregar = document.getElementById("dialog-agregar");
    const btnAgregar = document.getElementById("btn-dialog-agregar");
    const formAgregar = document.getElementById("form-agregar");

    botonAbrir.addEventListener("click", () => {
        dialogAgregar.showModal();
    });

    botonCerrar.addEventListener("click", () => {
        dialogAgregar.close()
    });
    btnAgregar.addEventListener("click", () => {
        agregarProductoController(formAgregar);
    });
    
});

// Actualizar Producto
document.addEventListener("DOMContentLoaded", () => {
    
    const tbody = document.getElementById("cuerpo-tabla-inventario");
    const botonCerrar = document.getElementById("btn-cerrar-dialog-actualizar");
    const botonActualizar = document.getElementById("btn-actualizar");
    const dialogActualizar = document.getElementById("dialog-actualizar");
    const formActualizar = document.getElementById("form-actualizar");
    
    tbody.addEventListener("click", (e) => {
        const botonAbrir = e.target.closest(".editar");

        if (botonAbrir) {
            llenarFormularioProducto(formActualizar, botonAbrir);
            dialogActualizar.showModal();
        }
    });

    botonCerrar.addEventListener("click", () => {
        dialogActualizar.close();
    });
    
    botonActualizar.addEventListener("click", () => {
        actualizarProductoController(formActualizar);
        dialogActualizar.close();
    });
    
});

// Recargar Pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});


// Simular placeholder en input de buscar
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-producto");
    const icon = document.getElementById("icono-buscar")

    input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
            icon.style.color = "transparent";
        } else {
            icon.style.color = "gray";
        }
    });
});

// Buscar Producto
document.addEventListener("DOMContentLoaded", () => {
    
    const input = document.getElementById("input-producto");

    input.addEventListener("input", () => {

        if (input.value.trim() === "") {
            cargarInventario("");
        }
        if (input.value.trim().length == 4) {
            buscarProductoController(input.value.trim());
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const select = document.getElementById("select-categorias-acciones");

    select.addEventListener("change", () => {
        cargarInventario(select.value);
    });

});