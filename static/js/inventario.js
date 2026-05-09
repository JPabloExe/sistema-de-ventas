// Abrir y cerrar el dialog de actualizar producto
document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("cuerpo-tabla-inventario");
    const botonCerrar = document.getElementById("btn-cerrar-dialog-actualizar");
    const dialogActualizar = document.getElementById("dialog-actualizar-producto");

    tbody.addEventListener("click", (e) => {
        const botonAbrir = e.target.closest(".editar");

        if (botonAbrir) {

            document.getElementById("input-actualizar-codigo").value = botonAbrir.dataset.codigo;
            document.getElementById("input-actualizar-nombre").value = botonAbrir.dataset.nombre;
            document.getElementById("input-actualizar-stock").value = botonAbrir.dataset.stock;
            document.getElementById("input-actualizar-precio").value = botonAbrir.dataset.precio;
            document.getElementById("input-actualizar-costo").value = botonAbrir.dataset.costo;
            document.getElementById("input-actualizar-caducidad").value = botonAbrir.dataset.caducidad;
            document.getElementById("select-actualizar-categoria").value = botonAbrir.dataset.categoria.toLowerCase();

            dialogActualizar.showModal();
        }
    });

    botonCerrar.addEventListener("click", () => {
        dialogActualizar.close()
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

// Abrir y cerrar el dialog de agregar producto nuevo
document.addEventListener("DOMContentLoaded", () => {
    const botonAbrir = document.getElementById("btn-agregar-producto");
    const botonCerrar = document.getElementById("btn-cerrar-dialog-agregar");
    const dialogAgregar = document.getElementById("dialog-agregar-producto");

    botonAbrir.addEventListener("click", () => {
        dialogAgregar.showModal();
    });

    botonCerrar.addEventListener("click", () => {
        dialogAgregar.close()
    });
});


// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

// Agregar un producto nuevo
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-dialog-agregar");

    boton.addEventListener("click", () => {
        agregarProducto();
    });
});

// Buscar Producto
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-producto");

    llenarTabla("");

    input.addEventListener("input", () => {

        if (input.value.trim() == "") {
            llenarTabla("");
        }
        if (input.value.trim().length == 4) {
            buscarProducto(input.value.trim());
        }
    });
});

// Actualizar producto
document.addEventListener("DOMContentLoaded", () => {
    const dialogActualizar = document.getElementById("dialog-actualizar-producto");
    const boton = document.getElementById("btn-actualizar");

    boton.addEventListener("click", (event) => {
        event.preventDefault()
        actualizarProducto();
        dialogActualizar.close();
    });
});

// Eliminar un producto
document.addEventListener("DOMContentLoaded", () => {
    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-confirmacion");
    const tbody = document.getElementById("cuerpo-tabla-inventario");

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
            eliminarProducto(codigoAEliminar);
            dialogConfirmacion.close();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const select = document.getElementById("select-categorias");

    llenarTabla("");

    select.addEventListener("change", () => {
        llenarTabla(select.value);

    });
});


