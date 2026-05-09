URL_API = "http://127.0.0.1:5000"

function formatearCOP(valor) {
    return valor.toLocaleString("es-CO", {
        style: "decimal", // Quita el $ del valor
        currency: "COP",
        minimumFractionDigits: 2
    });
}

function mostrarToast(mensaje, tipo) {
    const letrero = document.getElementById("letrero");
    const texto = document.getElementById("texto-letrero")
    const icono = document.getElementById("icono-letrero")

    // quitar tipos anteriores
    letrero.classList.remove('success', 'error', 'warning', 'show');
    texto.textContent = mensaje;

    if (tipo == "success") {
        icono.className = 'fa-solid fa-circle-check'
        letrero.classList.add(tipo)
    }

    if (tipo == "error") {
        icono.className = "fa-solid fa-circle-xmark"
        letrero.classList.add(tipo)
    }

    // forzar reflow para que la animación siempre se ejecute
    letrero.offsetHeight;

    letrero.classList.add("show");


    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        letrero.classList.remove('show');
    }, 1500);
};

function llenarTabla(ventas) {

    const tBody = document.querySelector(".tabla-ventas tbody");

    tBody.innerHTML = "";

    for (const venta of ventas) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <tr>
                <td class="numero">#${venta["id"]}</td>

                <td class="fecha">
                    <div>
                        <p class="p-fecha">${venta["fecha"]}</p>
                        <p class="p-hora">${venta["hora"]}</p>
                    </div>
                </td>
                <td class="usuario">${venta["usuario"]}</td>
                <td class="items">${venta["items"]}</td>
                <td class="metodo">     
                    <p class="p-metodo">${venta["metodo"]}</p>
                </td>
                <td class="total">COP ${formatearCOP(venta["total"])}</td>
                
                <td class="acciones">
                    <i id="btn-info-producto" class="fa-solid fa-circle-info informacion"
                        data-numero="${venta["numero"]}">
                    </i>
                    <i id="btn-eliminar-producto" class="fa-solid fa-trash eliminar"
                        data-numero="${venta["numero"]}">
                    </i>
                </td>
            </tr>
        `;
        tBody.appendChild(fila);
    }
};

async function cargarTabla() {

    const intervalo = {
        "inicial": null,
        "final": null
    }

    const respuesta = await fetch(`${URL_API}/obtenerVentas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intervalo)
    });


    const info = await respuesta.json();

    if (info["mensaje"] == "n") {

        if (info["error"] == 0) {
            mostrarToast("No se han registrado ventas", "error");
            return;
        }
        mostrarToast(info["error"], "error")
        return;
    }

    llenarTabla(info["ventas"]);
};

async function buscarVentas(fechaInicial, fechaFinal) {

    const intervalo = {
        "inicial": fechaInicial,
        "final": fechaFinal
    }

    const respuesta = await fetch(`${URL_API}/obtenerVentas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intervalo)
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {

        if (info["error"] == 0) {
            mostrarToast("Ventas no encontradas en este intervalo", "error");
            return;
        }
        mostrarToast(info["error"], "error")
        return;
    }

    llenarTabla(info["ventas"]);
};

async function eliminarVenta(numeroVenta) {
    const respuesta = await fetch(`${URL_API}/eliminarVenta?numero=${numeroVenta}`, {
        method: "POST"
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        mostrarToast(info["error"], "error")
        return;
    }

    mostrarToast("Venta eliminada", "success");  
    cargarTabla();
}

document.addEventListener("DOMContentLoaded", () => {
    cargarTabla();
});

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

