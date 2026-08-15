import { formatearCOP } from "../utilities/moneda.js";

import { mostrarEstadoVacio } from "../components/estadoVacio.js";

export function mostrarInformeVentas(informe) {

    const lblValorVentasHoy = document.getElementById("lbl-valor-ventas-hoy");
    const lblVentasHoy = document.getElementById("lbl-ventas-hoy");

    lblValorVentasHoy.textContent = `COP ${formatearCOP(informe["valor_ventas"])}`;
    lblVentasHoy.textContent = `${informe["ventas"]} ventas - COP ${formatearCOP(informe["valor_ventas"])}`;

}

export function llenarTablaVentas(ventas) {

    const tbody = document.getElementById("tbody-ventas");

    if (ventas === null || ventas[0] === null) {

        mostrarEstadoVacio(tbody, "No se encontraron ventas registradas");
        return;

    }

    tbody.innerHTML = "";

    for (const venta of ventas) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <tr>
                <td class="numero">${venta.num_venta}</td>

                <td class="fecha">
                    <div>
                        <p class="p-fecha">${venta.fecha}</p>
                        <p class="p-hora">${venta.hora}</p>
                    </div>
                </td>
                <td class="usuario">${venta.usuario}</td>
                <td class="total">COP ${formatearCOP(venta.total)}</td>
                <td class="metodo">     
                <p class="p-metodo">${venta.metodo}</p>
                </td>
                <td>
                    <span class=${venta.estado === "Completada"
                ? "badge-completed"
                : "badge-pending"}>

                        <i class="${venta.estado === "Completada"
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-clock"}">
                        </i>
                        ${venta.estado}
                    </span>
                </td>
                
                <td class="acciones">
                    <i id="btn-detalles" class="fa-solid fa-circle-info detalles"
                        data-id="${venta.id}"
                        data-numero="${venta.num_venta}"
                        data-fecha="${venta.fecha}"
                        data-hora="${venta.hora}"
                        data-usuario="${venta.usuario}"
                        data-metodo="${venta.metodo}"
                        data-estado="${venta.estado}"
                        data-total="${venta.total}">
                    </i>
                    <i id="btn-eliminar-venta" class="fa-solid fa-trash eliminar"
                        data-id="${venta.id}">
                    </i>
                </td>
            </tr>
        `;
        tbody.appendChild(fila);
    }
};

export function llenarDetalles(boton, items) {

    document.getElementById("p-numero-operacion").textContent = boton.dataset.numero;
    document.getElementById("p-fecha").textContent = boton.dataset.fecha;
    document.getElementById("p-hora").textContent = boton.dataset.hora;
    document.getElementById("p-usuario").textContent = boton.dataset.usuario;
    document.getElementById("p-metodo").textContent = boton.dataset.metodo;
    document.getElementById("p-total").textContent = `COP ${formatearCOP(parseInt(boton.dataset.total))}`;
    document.getElementById("p-estado").innerHTML = `
        <span class=${boton.dataset.estado === "Completada"
            ? "badge-completed"
            : "badge-pending"}>

            <i class="${boton.dataset.estado === "Completada"
            ? "fa-solid fa-circle-check"
            : "fa-solid fa-clock"}">
            </i>
            ${boton.dataset.estado}
        </span>`;

    llenarTablaItems(items);

}

function llenarTablaItems(items) {

    const tbody = document.getElementById("tbody-detalles");

    if (items === null) {

        mostrarEstadoVacio(tbody, "No se encontraron los detalles de la venta");
        return;

    }

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