import { formatearCOP } from "../utilities/moneda.js"

export function llenarTablaCompras(compras) {

    const tbody = document.getElementById('tbody-compras');
    const pCantidadCompras = document.getElementById("p-cantidad-compras");

    if (compras === null) {
        tbody.innerHTML = '';
        return;
    }

    tbody.innerHTML = '';

    for (const compra of compras) {

        const fila = document.createElement('tr')

        fila.innerHTML = `
          
            <tr>
                <td class="numero">${compra.compra}</td>
                <td class="proveedor">${compra.proveedor}</td>
                <td class="fecha">${compra.fecha}</td>
                <td class="total">COP ${formatearCOP(compra.total)}</td>
                <td>
                    <span class=${compra.estado === 1
                ? "badge-completed"
                : "badge-pending"}>

                        <i class="${compra.estado === 1
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-clock"}">
                        </i>
                        ${compra.estado === 1 ? "Completada" : "Pendiente"}
                    </span>
                </td>


                <td class="acciones">
                    <i id="btn-detalles" class="fa-solid fa-circle-info detalles" title="Detalles de la compra"
                        data-compra="${compra.compra}"
                        data-proveedor="${compra.proveedor}"
                        data-usuario="${compra.usuario}"
                        data-fecha="${compra.fecha}"
                        data-hora="${compra.hora}"
                        data-factura="${compra.factura}"
                        data-metodo_pago="${compra.metodo_pago}"
                        data-total="${compra.total}"
                        data-estado="${compra.estado}">
                    </i>

                    <i class="fa-solid fa-box recibir" title="Recibir mercancía"
                    data-id="${compra.compra}">  
                    </i>

                    <i id="btn-eliminar" class="fa-solid fa-trash btn-eliminar" title="Eliminar compra"
                        data-id="${compra.compra}">  
                    </i>

                </td>

            <tr>
        `;

        tbody.appendChild(fila);

    }

    pCantidadCompras.textContent = compras.length;

}


export function obtenerDatosFormularioCompras() {

    return {
        'proveedor': document.getElementById('select-proveedor').value,
        'metodo_pago': document.getElementById('select-metodo-pago').value,
        'productos': obtenerProductosDeCarrito()
    }

}

function obtenerProductosDeCarrito() {

    const productos = document.querySelectorAll(".producto");

    const productosEnCarrito = [];

    productos.forEach(producto => {
        productosEnCarrito.push({
            "codigo": producto.dataset.codigo,
            "cantidad": Number(producto.querySelector(".input-cantidad").value)
        });
    });

    return productosEnCarrito;
}

export function llenarDetalles(boton, items) {

    document.getElementById("p-numero-operacion").textContent = boton.dataset.factura;
    document.getElementById("p-fecha").textContent = boton.dataset.fecha;
    document.getElementById("p-hora").textContent = boton.dataset.hora;
    document.getElementById("p-usuario").textContent = boton.dataset.proveedor;
    document.getElementById("p-metodo").innerHTML = `
        <i class="fa-solid fa-coins"></i> 
        ${boton.dataset.metodo_pago}
    `;
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