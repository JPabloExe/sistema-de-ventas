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
                <td class="numero">${compra.id}</td>
                <td class="proveedor">${compra.proveedor}</td>
                <td class="fecha">${compra.fecha}</td>
                <td class="total">COP ${formatearCOP(compra.total)}</td>
                <td>
                    <span class=${compra.estado === "Completada"
                ? "badge-completed"
                : "badge-pending"}>

                        <i class="${compra.estado === "Completada"
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-clock"}">
                        </i>
                        ${compra.estado}
                    </span>
                </td>


                <td class="acciones">
                    <i id="btn-detalles" class="fa-solid fa-circle-info detalles" title="Detalles de la compra"
                        data-compra="${compra.id}"
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
                    data-compra="${compra.id}"  
                    data-proveedor="${compra.proveedor}">  
                    </i>

                    <i id="btn-eliminar" class="fa-solid fa-trash btn-eliminar" title="Eliminar compra"
                        data-compra="${compra.id}">  
                    </i>

                </td>

            <tr>
        `;

        tbody.appendChild(fila);

    }

    pCantidadCompras.textContent = compras.length;

}

export function llenarRecepcion(boton, items) {

    document.getElementById("lbl-recibir-titulo").textContent = `Recibir compra N°: ${boton.dataset.compra}`;
    document.getElementById("lbl-recibir-usuario").textContent = "Proveedor";
    document.getElementById("p-recibir-usuario").textContent = boton.dataset.proveedor;

    llenarTablaRecepcion(items);

}

function llenarTablaRecepcion(recibidos) {

    const tbody = document.getElementById("tbody-recepcion");

    tbody.innerHTML = "";

    for (const recibido of recibidos) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <tr>
                <td>${recibido.nombre}</td>
                <td>${recibido.cantidad}</td>
                <td>
                    <input 
                        type="number" 
                        min="0" 
                        id="input-recibido" 
                        class="input-recibido"
                        data-producto="${recibido.id_producto}">
                </td>
            </tr>
        `;
        tbody.appendChild(fila);
    }

}

export function obtenerDatosRecepcion(boton) {

    const inputs = document.querySelectorAll(".input-recibido");

    const datos = [];

    inputs.forEach(input => {

        if (input.value > 0) {
            datos.push({
                'id_producto': input.dataset.producto,
                'cantidad': Number(input.value)
            });
        }

    });

    return {
        "compra": boton.dataset.compra,
        "productos": datos
    }

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
            "id": producto.dataset.id,
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
    document.getElementById("p-estado").innerHTML = `
        <span class=${boton.dataset.estado === "Completada"
            ? "badge-completed"
            : "badge-pending"}>
            
            <i class="${boton.dataset.estado === "Completada"
            ? "fa-solid fa-circle-check"
            : "fa-solid fa-clock"}">
            </i> 
            
            ${boton.dataset.estado}

        </span>
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

export function obtenerDatosSelectAcciones() {

    return {
        'id_proveedor': document.getElementById('select-proveedores-acciones').value,
        'id_estado': document.getElementById('select-estados-acciones').value
    }

}

export function obtenerNumFactura() {

    return document.getElementById('input-buscar').value;

}