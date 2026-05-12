import {formatearCOP} from "/ui/moneda.js"

function llenarTablaInventario(productos) {
    const tbody = document.getElementById("cuerpo-tabla-inventario");

    tbody.innerHTML = "";

    for (const producto of productos) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td class="producto">
            <div class="nombre">${producto["nombre"]}</div>
        </td>
        <td class="codigo">${producto["codigo"]}</td>
        <td class="precio">COP ${formatearCOP(producto["valor_unitario"])}</td>
        <td class="costo">COP ${formatearCOP(producto["costo"])}</td>
        <td class="stock">
            <div class="cantidad">${producto["stock"]} UNIDADES</div>
        </td>
        <td class="acciones">
            <i id="btn-actualizar-producto" class="fa-solid fa-pen-to-square editar"
                data-codigo="${producto["codigo"]}"
                data-nombre="${producto["nombre"]}"
                data-stock="${producto["stock"]}"
                data-precio="${producto["valor_unitario"]}"
                data-costo="${producto["costo"]}"
                data-caducidad="${producto["fecha_caducidad"]}"
                data-categoria="${producto["categoria"]}">
            </i>

            <i id="btn-eliminar-producto" class="fa-solid fa-trash eliminar"
                data-codigo="${producto["codigo"]}">
            </i>
            </td>`;

        tbody.appendChild(fila);
    }

    const divCantidad = document.createElement("div");

    divCantidad.innerHTML = `
            <div class="div-cantidad-inventario">  
                <p class="p-total">Total:</p>
                <p class="p-cantidad-productos-inventario">${productos.length}</p>
                <p class="p-productos">productos</p>
            </div>
        `;

    divProductos.appendChild(divCantidad);
};

export function obtenerDatosFormularioProducto() {
    
    const select = document.getElementById("select-categoria");

    return {
        "codigo": document.getElementById("input-codigo").value,
        "nombre": document.getElementById("input-nombre").value,
        "stock": document.getElementById("input-stock").value,
        "valor_unitario": document.getElementById("input-precio").value,
        "costo": document.getElementById("input-costo").value,
        "fecha_caducidad": document.getElementById("input-caducidad").value,
        "categoria": select.options[select.selectedIndex].text
    }
}

export function limpiarFormularioProducto() {
    document.querySelector("formularios-dialog-inventario").reset();
}

export function mostrarInformeInventario(informe) {

    const lblProductos = document.getElementById("lbl-productos");
    const lblValorInventario = document.getElementById("lbl-valor-inventario");
    const lblStockBajo = document.getElementById("lbl-stock-bajo");
    
    lblProductos.textContent = `${informe["productos"]}`;
    lblStockBajo.textContent = `${informe["stock_bajo"]}`;
    lblValorInventario.textContent = `COP ${formatearCOP(informe["valor_total"])}`;

}