import { formatearCOP } from "../utilities/moneda.js";

export function llenarTablaInventario(productos) {
    const tbody = document.getElementById("tbody-productos");
    const pCantidadProductosInventario = document.getElementById("p-cantidad-productos-inventario");

    if (productos === null) {    
        pCantidadProductosInventario.textContent = 0;
        tbody.innerHTML = "";
        return;
    }    

    tbody.innerHTML = "";

    for (const producto of productos) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td class="producto">
                <div class="nombre">${producto.nombre}</div>
            </td>
            <td class="codigo">${producto.codigo}</td>
            <td class="precio">COP ${formatearCOP(producto.valor_unitario)}</td>
            <td class="costo">COP ${formatearCOP(producto.costo)}</td>
            <td class="stock">
                <div class="cantidad">${producto.stock} UNIDADES</div>
            </td>
            <td class="acciones">
                <i id="btn-actualizar-producto" class="fa-solid fa-pen-to-square actualizar"
                    data-codigo="${producto.codigo}"
                    data-nombre="${producto.nombre}"
                    data-stock="${producto.stock}"
                    data-precio="${producto.valor_unitario}"
                    data-costo="${producto.costo}"
                    data-caducidad="${producto.fecha_caducidad}"
                    data-categoria="${producto.id_categoria}">
                </i>

                <i id="btn-eliminar-producto" class="fa-solid fa-trash eliminar"
                    data-codigo="${producto.codigo}">
                </i>
                </td>
            `;

        tbody.appendChild(fila);
    }

    const divCantidad = document.createElement("div");

    pCantidadProductosInventario.textContent = productos.length;
};

export function obtenerDatosFormularioProducto() {

    return {
        "codigo": document.getElementById("input-codigo").value,
        "nombre": document.getElementById("input-producto").value,
        "stock": document.getElementById("input-cantidad").value,
        "valor_unitario": document.getElementById("input-precio").value,
        "costo": document.getElementById("input-costo").value,
        "fecha_caducidad": document.getElementById("input-caducidad").value,
        "categoria": document.getElementById("select-categorias-dialog").value
    }

}

export function obtenerDatosFormularioCategoria() {
    
    return {
        "nombre": document.getElementById("input-nombre-categoria").value,
        "descripcion": document.getElementById("input-descripcion").value
    }

}

export function limpiarFormularioProducto(form) {
    form.reset();
}

export function mostrarInformeInventario(informe) {

    const lblProductos = document.getElementById("lbl-productos");
    const lblValorInventario = document.getElementById("lbl-valor-inventario");
    const lblStockBajo = document.getElementById("lbl-stock-bajo");

    lblProductos.textContent = `${informe["productos"]}`;
    lblStockBajo.textContent = `${informe["stock_bajo"]}`;
    lblValorInventario.textContent = `COP ${formatearCOP(informe["valor_total"])}`;

}

export function llenarFormularioProducto(boton) {

    document.getElementById("input-codigo").value = boton.dataset.codigo;
    document.getElementById("input-producto").value = boton.dataset.nombre;
    document.getElementById("input-cantidad").value = boton.dataset.stock;
    document.getElementById("input-precio").value = boton.dataset.precio;
    document.getElementById("input-costo").value = boton.dataset.costo;
    document.getElementById("input-caducidad").value = boton.dataset.caducidad;
    document.getElementById("select-categorias-dialog").value = boton.dataset.categoria;
  
}

export function cargarCategorias(categorias, select) {

    select.innerHTML = '';

    select.innerHTML = '<option value="0">Todas las categorias</option>';   

    for (const categoria of categorias) {

        select.innerHTML += `
            <option value="${categoria.id}">
                ${categoria.nombre}
            </option>
        `;

    }

}