import { formatearCOP } from "../utilities/moneda.js"

export function llenarTablaCompras(compras) {

    const tbody = document.getElementById('tbody-compras');

    if (compras === null) {

        tbody.innerHTML = '';
        return;
    }

    tbody.innerHTML = '';

    for (const compra of compras) {

        const fila = document.createElement('tr')

        fila.innerHTML = `
          
            <tr>
                <td>${compra.compra}</td>
                <td>${compra.proveedor}</td>
                <td>${compra.fecha}</td>
                <td>COP ${formatearCOP(compra.total)}</td>
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


                <td>
                    <i id="btn-detalles" class="fa-solid fa-circle-info detalles"
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

                    <i class="fa-solid fa-box recibir"  title="Recibir mercancía"
                    data-id="${compra.compra}">  
                    </i>

                    <i id="btn-eliminar" class="fa-solid fa-trash btn-eliminar"
                        data-id="${compra.compra}">  
                    </i>

                </td>

            <tr>
        `;

        tbody.appendChild(fila);

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
            "codigo": producto.dataset.codigo,
            "cantidad": Number(producto.querySelector(".input-cantidad").value)
        });
    });

    return productosEnCarrito;
}