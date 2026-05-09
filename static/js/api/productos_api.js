async function agregarProducto() {
    const select = document.getElementById("select-agregar-categoria");

    const producto = {
        "codigo": document.getElementById("codigo").value,
        "nombre": document.getElementById("nombre").value,
        "stock": document.getElementById("stock").value,
        "valor_unitario": document.getElementById("precio").value,
        "costo": document.getElementById("costo").value,
        "fecha_caducidad": document.getElementById("caducidad").value,
        "categoria": select.options[select.selectedIndex].text
    }

    const respuesta = await fetch(`${URL_API}/agregarProducto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "s") {
        mostrarToast("Producto agregado", "success");
        document.querySelector(".formularios-dialog-inventario").reset();
        llenarTabla("");
    }
};

async function actualizarProducto() {

    const select = document.getElementById("select-actualizar-categoria");

    const producto = {
        "codigo": document.getElementById("input-actualizar-codigo").value,
        "nombre": document.getElementById("input-actualizar-nombre").value,
        "stock": document.getElementById("input-actualizar-stock").value,
        "valor_unitario": document.getElementById("input-actualizar-precio").value,
        "costo": document.getElementById("input-actualizar-costo").value,
        "fecha_caducidad": document.getElementById("input-actualizar-caducidad").value,
        "categoria": select.options[select.selectedIndex].text
    }

    const respuesta = await fetch(`${URL_API}/actualizarProducto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "s") {
        llenarTabla("");
        mostrarToast("Producto actualizado", "success");
        document.querySelector(".formularios-dialog-inventario").reset();
    }
};

async function buscarProducto(codigo) {

    const tbody = document.getElementById("cuerpo-tabla-inventario");

    const respuesta = await fetch(`${URL_API}/buscarProducto?codigo=${codigo}`, {
        method: "POST"
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        mostrarToast("Producto no encontrado", "error");
        return;
    }

    const producto = info["producto"];

    tbody.innerHTML = "";

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td class="producto">
            <div class="nombre">${producto["nombre"]}</div>
        </td>
        <td>${producto["codigo"]}</td>
        <td class="precio">COP ${formatearCOP(producto["valor_unitario"])}</td>
        <td class="costo">COP ${formatearCOP(producto["costo"])}</td>
        <td class="stock">
            <div class="cantidad">${producto["stock"]} UNIDADES</div>
        </td>
        <td class="acciones">
            <i id="btn-actualizar-producto" class="fa-solid fa-pen editar"></i>
            <i id="btn-eliminar-producto" class="fa-solid fa-trash eliminar"></i>
        </td>`

    tbody.appendChild(fila)
    mostrarToast("Producto encontrado", "success");
};

async function eliminarProducto(codigo) {

    const respuesta = await fetch(`${URL_API}/eliminarProducto?codigo=${codigo}`, {
        method: "POST"
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        mostrarToast(info["excepcion"], "error");
        return;
    }

    llenarTabla("");
    mostrarToast("Producto eliminado", "success");
}

async function informeInventario() {
    const lblProductos = document.getElementById("lbl-productos");
    const lblValorInventario = document.getElementById("lbl-valor-inventario");
    const lblStockBajo = document.getElementById("lbl-stock-bajo");
    
    const respuesta = await fetch(`/obtenerInformeInventario`);

    const info = await respuesta.json();

    const informe = info["informe"];

    lblProductos.textContent = `${informe["productos"]}`;
    lblStockBajo.textContent = `${informe["stock_bajo"]}`;
    lblValorInventario.textContent = `COP ${formatearCOP(informe["valor_total"])}`;
}

async function llenarTabla(categoria) {
    const tbody = document.getElementById("cuerpo-tabla-inventario");
    const divProductos = document.querySelector(".div-productos-inventario");

    const respuesta = await fetch(`${URL_API}/obtenerProductos?categoria=${categoria}`);

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        mostrarToast("No se han registrado productos", "error");
        return;
    }

    const productos = info["productos"]
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

    divProductos.innerHTML = "";
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
