// Eliminar una venta
document.addEventListener("DOMContentLoaded", () => {
    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-confirmacion");
    const tbody = document.getElementById("cuerpo-tabla-ventas");

    let ventaAEliminar = null;

    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".eliminar");

        if (botonEliminar) {
            ventaAEliminar = botonEliminar.dataset.numero;
            dialogConfirmacion.showModal();
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialogConfirmacion.close();
    });
    
    
    btnConfirmar.addEventListener("click", () => {
        if (ventaAEliminar) {
            eliminarVenta(ventaAEliminar);
            dialogConfirmacion.close();
        }
    });
});

// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btn-buscar");
    
    btnBuscar.addEventListener("click", () => {
        const fechaInicial = document.getElementById("input-fecha-inicial").value;
        const fechaFinal = document.getElementById("input-fecha-final").value;
        
        if (fechaInicial.trim() == "" && fechaFinal.trim() == "") {
            cargarTabla();
        } else {
            buscarVentas(fechaInicial, fechaFinal);
        }
    });
});

