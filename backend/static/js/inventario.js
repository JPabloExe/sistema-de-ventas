URL_API = "http://127.0.0.1:5000";

function formatearCOP(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2
    });
}

let toastTimeout;

function mostrarToast(mensaje, tipo) {
    const letrero = document.getElementById("letrero");
    const texto = document.getElementById("texto-letrero")
    const icono = document.getElementById("icono-letrero")

    // quitar tipos anteriores
    letrero.classList.remove('success', 'error');
    texto.textContent = mensaje;

    if (tipo == "success") {
        icono.className = 'fa-solid fa-circle-check'
        letrero.classList.add(tipo)
    }

    if (tipo == "error") {
        icono.className = "fa-solid fa-circle-xmark"
        letrero.classList.add(tipo)
    }

    // forzar reflow para que la animación siempre se ejecute
    letrero.offsetHeight;

    letrero.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        letrero.classList.remove('show');
    }, 1500);
}

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

    const respuesta = await fetch(`${URL_API}/agregar`, {
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

    const respuesta = await fetch(`${URL_API}/actualizar`, {
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

    const respuesta = await fetch(`${URL_API}/eliminar?codigo=${codigo}`, {
        method: "POST"
    });

    if (!respuesta.ok) {
        mostrarToast("Ha ocurrido un error", "error");
        return;
    }

    llenarTabla("");
    mostrarToast("Producto eliminado", "success");
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

// Abrir y cerrar el dialog de actualizar producto
document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("cuerpo-tabla-inventario");
    const botonCerrar = document.getElementById("btn-cerrar-dialog-actualizar");
    const dialogActualizar = document.getElementById("dialog-actualizar-producto");

    tbody.addEventListener("click", (e) => {
        const botonAbrir = e.target.closest(".editar");

        if (botonAbrir) {

            document.getElementById("input-actualizar-codigo").value = botonAbrir.dataset.codigo;
            document.getElementById("input-actualizar-nombre").value = botonAbrir.dataset.nombre;
            document.getElementById("input-actualizar-stock").value = botonAbrir.dataset.stock;
            document.getElementById("input-actualizar-precio").value = botonAbrir.dataset.precio;
            document.getElementById("input-actualizar-costo").value = botonAbrir.dataset.costo;
            document.getElementById("input-actualizar-caducidad").value = botonAbrir.dataset.caducidad;
            document.getElementById("select-actualizar-categoria").value = botonAbrir.dataset.categoria.toLowerCase();

            dialogActualizar.showModal();
        }
    });

    botonCerrar.addEventListener("click", () => {
        dialogActualizar.close()
    });
});


// Simular placeholder en input de buscar
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-producto");
    const icon = document.getElementById("icono-buscar")

    input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
            icon.style.color = "transparent";
        } else {
            icon.style.color = "gray";
        }
    });
});

// Abrir y cerrar el dialog de agregar producto nuevo
document.addEventListener("DOMContentLoaded", () => {
    const botonAbrir = document.getElementById("btn-agregar-producto");
    const botonCerrar = document.getElementById("btn-cerrar-dialog-agregar");
    const dialogAgregar = document.getElementById("dialog-agregar-producto");

    botonAbrir.addEventListener("click", () => {
        dialogAgregar.showModal();
    });

    botonCerrar.addEventListener("click", () => {
        dialogAgregar.close()
    });
});


// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

// Agregar un producto nuevo
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-dialog-agregar");

    boton.addEventListener("click", () => {
        agregarProducto();
    });
});

// Buscar Producto
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-producto");

    llenarTabla("");

    input.addEventListener("input", () => {

        if (input.value.trim() == "") {
            llenarTabla("");
        }
        if (input.value.trim().length == 5) {
            buscarProducto(input.value.trim());
        }
    });
});

// Actualizar producto
document.addEventListener("DOMContentLoaded", () => {
    const dialogActualizar = document.getElementById("dialog-actualizar-producto");
    const boton = document.getElementById("btn-actualizar");

    boton.addEventListener("click", (event) => {
        event.preventDefault()
        actualizarProducto();
        dialogActualizar.close();
    });
});

// Eliminar un producto
document.addEventListener("DOMContentLoaded", () => {
    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-confirmacion");
    const tbody = document.getElementById("cuerpo-tabla-inventario");

    let codigoAEliminar = null;

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
            eliminarProducto(codigoAEliminar);
            dialogConfirmacion.close();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const select = document.getElementById("select-categorias");

    llenarTabla("");

    select.addEventListener("change", () => {

        llenarTabla(select.value);

    });
});


