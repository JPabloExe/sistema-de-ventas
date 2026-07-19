import { formatearCOP } from "../utilities/moneda.js";

let ventaAEliminar = null;

export function inicializarDialogEliminarVenta(onConfirmar) {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-confirmacion");
    const tbody = document.getElementById("tbody-ventas");


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
            onConfirmar(ventaAEliminar);
            dialogConfirmacion.close();
        }
    });

}

export function mostrarInformeVentas(informe) {

    const lblValorVentasHoy = document.getElementById("lbl-valor-ventas-hoy");
    const lblVentasHoy = document.getElementById("lbl-ventas-hoy");

    lblValorVentasHoy.textContent = `COP ${formatearCOP(informe["valor_ventas"])}`;
    lblVentasHoy.textContent = `${informe["ventas"]} ventas - COP ${formatearCOP(informe["valor_ventas"])}`;

}

export function llenarTablaVentas(ventas) {

    const tbody = document.getElementById("tbody-ventas");

    tbody.innerHTML = "";

    for (const venta of ventas) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <tr>
                <td class="numero">#${venta.id}</td>

                <td class="fecha">
                    <div>
                        <p class="p-fecha">${venta.fecha}</p>
                        <p class="p-hora">${venta.hora}</p>
                    </div>
                </td>
                <td class="usuario">${venta.usuario}</td>
                <td class="items">${venta.items}</td>
                <td class="metodo">     
                    <p class="p-metodo">${venta.metodo}</p>
                </td>
                <td class="total">COP ${formatearCOP(venta.total)}</td>
                
                <td class="acciones">
                    <i id="btn-detalles" class="fa-solid fa-circle-info detalles"
                        data-numero="${venta.id}"
                        data-fecha="${venta.fecha}"
                        data-hora="${venta.hora}"
                        data-usuario="${venta.usuario}"
                        data-metodo="${venta.metodo}"
                        data-total="${venta.total}">
                    </i>
                    <i id="btn-eliminar-venta" class="fa-solid fa-trash eliminar"
                        data-numero="${venta["numero"]}">
                    </i>
                </td>
            </tr>
        `;
        tbody.appendChild(fila);
    }
};

export function llenarDetalles(boton, items) {

    document.getElementById("p-numero-venta").textContent = boton.dataset.numero;
    document.getElementById("p-fecha").textContent = boton.dataset.fecha;
    document.getElementById("p-hora").textContent = boton.dataset.hora;
    document.getElementById("p-usuario").textContent = boton.dataset.usuario;
    document.getElementById("p-metodo").textContent = boton.dataset.metodo;
    document.getElementById("p-total").textContent = `COP ${formatearCOP(parseInt(boton.dataset.total))}`;

    llenarTablaItems(items);

}

function llenarTablaItems(items) {

    const tbody = document.getElementById("tbody-detalles");

    tbody.innerHTML = "";

    for (const item of items) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>COP ${formatearCOP(item.valorU)}</td>
                <td>COP ${formatearCOP(item.subtotal)}</td>
            </tr>
        `;
        tbody.appendChild(fila);
    }

}