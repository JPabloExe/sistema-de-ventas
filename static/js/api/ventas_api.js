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

async function realizarVenta() {

    const productos = document.querySelectorAll(".producto");

    const productosComprados = [];

    productos.forEach(producto => {
        productosComprados.push({
            "codigo": producto.dataset.codigo,
            "cantidad": Number(producto.querySelector(".input-cantidad").value)
        });
    });

    const respuesta = await fetch(`${URL_API}/realizarVenta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productosComprados)
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        mostrarToast(info["excepcion"], 'error');
        return;
    }

    mostrarToast("Venta realizada", "success");
    recalcularTotal();
}

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

async function informeVentas() {
    const lblValorVentasHoy = document.getElementById("lbl-valor-ventas-hoy");
    const lblVentasHoy = document.getElementById("lbl-ventas-hoy");
    
    const respuesta = await fetch('/obtenerInformeVentas');
    const info = await respuesta.json();
    const informe = info['informe']
    
    lblValorVentasHoy.textContent = `COP ${formatearCOP(informe["valor_ventas"])}`;
    lblVentasHoy.textContent = `${informe["ventas"]} ventas - COP ${formatearCOP(informe["valor_ventas"])}`;
}