import { formatearCOP } from "../utilities/moneda.js";

let codigoAEliminar = null;

export function inicializarDialogEliminar(onConfirmar) {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-confirmacion");
    const tbody = document.getElementById("cuerpo-tabla-inventario");


    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".eliminar");

        if (botonEliminar) {
            codigoAEliminar = botonEliminar.dataset.codigo;
            dialogConfirmacion.showModal();
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialogConfirmacion.close();
    });

    btnConfirmar.addEventListener("click", () => {
        if (codigoAEliminar) {
            onConfirmar(codigoAEliminar);
            dialogConfirmacion.close();
        }
    });

}

export function llenarTablaInventario(productos) {
    const tbody = document.getElementById("cuerpo-tabla-inventario");
    const pCantidadProductosInventario = document.getElementById("p-cantidad-productos-inventario");

    const p = productos;
    
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

    pCantidadProductosInventario.textContent = productos.length;
};

export function obtenerDatosFormularioProducto(formulario) {

    const select = formulario.categorias;

    return {
        "codigo": formulario.codigo.value,
        "nombre": formulario.nombre.value,
        "stock": formulario.stock.value,
        "valor_unitario": formulario.precio.value,
        "costo": formulario.costo.value,
        "fecha_caducidad": formulario.caducidad.value,
        "categoria": select.options[select.selectedIndex].text
    }
}

export function limpiarFormularioProducto(formulario) {
    formulario.reset();
}

export function mostrarInformeInventario(informe) {

    const lblProductos = document.getElementById("lbl-productos");
    const lblValorInventario = document.getElementById("lbl-valor-inventario");
    const lblStockBajo = document.getElementById("lbl-stock-bajo");

    lblProductos.textContent = `${informe["productos"]}`;
    lblStockBajo.textContent = `${informe["stock_bajo"]}`;
    lblValorInventario.textContent = `COP ${formatearCOP(informe["valor_total"])}`;

}

export function llenarFormularioProducto(formulario, boton) {

    formulario.codigo.value = boton.dataset.codigo;
    formulario.nombre.value = boton.dataset.nombre;
    formulario.stock.value = boton.dataset.stock;
    formulario.precio.value = boton.dataset.precio;
    formulario.costo.value = boton.dataset.costo;
    formulario.caducidad.value = boton.dataset.caducidad;
    formulario.categorias.value = boton.dataset.categoria.toLowerCase();

}