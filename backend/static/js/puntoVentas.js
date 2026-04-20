URL_API = "http://127.0.0.1:5000"

function formatearCOP(valor) {
    return valor.toLocaleString("es-CO", {
        style: "decimal", // Quita el $ del valor
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
    letrero.classList.remove('success', 'error', 'warning', 'show');
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

function calcularVueltos(total) {
    const inputMonto = document.getElementById("input-monto-ingresado");
    const btnConfirmar = document.getElementById("btn-confirmar-pago");
    const divVueltos = document.getElementById("div-vueltos");
    const lblVueltos = document.getElementById("lbl-vueltos");
    const lblTotal = document.getElementById("total-venta");

    lblTotal.textContent = `COP ${formatearCOP(total)}`

    inputMonto.addEventListener("input", () => {
        if (inputMonto.value < total) {
            inputMonto.style.outlineColor = "red";
            btnConfirmar.style.backgroundColor = "#86b69bff"
            divVueltos.style.backgroundColor = "#FCD4D4"
            divVueltos.style.color = "#8e3939";
            lblVueltos.textContent = "Monto insuficiente"

        } else {
            let vueltos = inputMonto.value - total;
            inputMonto.style.outlineColor = "green";
            btnConfirmar.style.backgroundColor = "#49775D"
            divVueltos.style.backgroundColor = "#aaf2bbff"
            divVueltos.style.color = "#49775D";
            lblVueltos.textContent = `COP ${formatearCOP(vueltos)}`;
        }
    });
}

async function agregarAlCarrito(codigo) {

    const divCarrito = document.querySelector(".div-carrito");
    const cantidad = document.getElementById("cantidad");

    const respuesta = await fetch(`${URL_API}/buscarProducto?codigo=${codigo}`, {
        method: "POST"
    });

    if (!respuesta.ok) {
        mostrarToast("Ocurrio un error", "error");
        return;
    }

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        mostrarToast("Producto no encontrado", "error");
        return;
    }

    const producto = info["producto"];

    const contenedor = document.createElement("div")

    contenedor.innerHTML = `
        <div class="producto" 
        data-codigo="${producto['codigo']}"
        data-precio="${producto['valor_unitario']}">

            
            <div class="div-info">
                <b>${producto['nombre']}</b>
                <p>Codigo: ${producto['codigo']}</p>
            </div>

            <div class="div-cantidad">
                <button class="btn-disminuir">-</button>
                <input class="input-cantidad" type="number" value="1" min="1">
                <button class="btn-aumentar">+</button>
            </div>

            <div class="div-subtotal">
                <b class="subtotal">COP ${formatearCOP(producto['valor_unitario'])}</b>
                <button class="btn-borrar">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>`;
    divCarrito.appendChild(contenedor);

    mostrarToast("Producto agregado al carrito", "success");
    recalcularTotal();
    cantidad.textContent = `(${productosEnCarrito()} productos)`;
};

function productosEnCarrito() {
    let cantidad = 0;

    const productos = document.querySelectorAll(".div-carrito .producto");

    productos.forEach(producto => {
        cantidad++;
    });

    return cantidad;
};

async function realizarVenta() {

    const productos = document.querySelectorAll(".producto");

    const productosComprados = [];

    productos.forEach(producto => {
        productosComprados.push({
            "codigo": producto.dataset.codigo,
            "cantidad": Number(producto.querySelector(".input-cantidad").value),
            "subtotal": Number(producto.querySelector(".input-cantidad").value) * parseInt(producto.dataset.precio)
        });
    });

    const respuesta = await fetch(`${URL_API}/realizarVenta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productosComprados)
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        mostrarToast(info["excepcion"], 'error');
        return;
    }

    mostrarToast("Venta realizada", "success");
    recalcularTotal();
}

function limpiarCarrito() {
    const carrito = document.querySelectorAll(".div-carrito .producto");

    carrito.forEach(producto => {
        producto.remove();
    });
};

function limpiarDialogPago() {
    const inputMonto = document.getElementById("input-monto-ingresado");
    const btnConfirmar = document.getElementById("btn-confirmar-pago");
    const divVueltos = document.getElementById("div-vueltos");
    const lblVueltos = document.getElementById("lbl-vueltos");

    inputMonto.style.outlineColor = "red";
    btnConfirmar.style.backgroundColor = "#86b69bff";
    divVueltos.style.backgroundColor = "#FCD4D4";
    divVueltos.style.color = "#8e3939";
    lblVueltos.textContent = "Monto insuficiente";
    inputMonto.value = "";
}

// Dialog pagos
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-procesar-venta");
    const botonCerrar = document.getElementById("btn-cancelar-pago");
    const dialogPagos = document.getElementById("dialog-pagos");
    const inputMonto = document.getElementById("input-monto-ingresado");
    const botonConfirmar = document.getElementById("btn-confirmar-pago");
    const cantidad = document.getElementById("cantidad");

    boton.addEventListener("click", () => {
        dialogPagos.showModal();
    });

    inputMonto.addEventListener("focus", () => {
        calcularVueltos(total);
    });
    
    botonCerrar.addEventListener("click", () => {
        dialogPagos.close();
        limpiarDialogPago();
    });

    botonConfirmar.addEventListener("click", () => {
        realizarVenta();
        dialogPagos.close();
        mostrarToast("Venta exitosa", "success");
        limpiarCarrito();
        limpiarDialogPago();
        cantidad.textContent = `(${productosEnCarrito()} productos)`;
    });
});

// Simular placeholder en input de buscar
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-producto-carrito");
    const icon = document.getElementById("icono-buscar")

    input.addEventListener("focus", () => {

        input.addEventListener("input", () => {
            if (input.value.trim() !== "") {
                icon.style.color = "transparent";
            } else {
                icon.style.color = "gray";
            }
        });
    });
});

// Agregar producto al carrito
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-producto-carrito");
    const pCantidad = document.getElementById("cantidad");

    pCantidad.innerHTML = `(${productosEnCarrito()} productos)`;
    pCantidad.style.color = "gray";

    input.addEventListener("input", async () => {

        if (input.value.trim().length == 4) {
            agregarAlCarrito(input.value.trim());
            pCantidad.innerHTML = `(${productosEnCarrito()} productos)`;
            input.value = "";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {

    recalcularTotal();

    const divCarrito = document.querySelector(".div-carrito");
    const cantidad = document.getElementById("cantidad");

    // 1. Escuchar cambios en el input (escribe manual o disparado por botones)
    divCarrito.addEventListener("input", (e) => {
        if (!e.target.classList.contains("input-cantidad")) return;

        const filaProducto = e.target.closest(".producto");
        const precio = parseFloat(filaProducto.dataset.precio);
        const cantidad = parseInt(e.target.value) || 0; // || 0 por si el input queda vacío

        const subtotal = precio * cantidad;

        // Actualizamos el <b> con clase .subtotal
        filaProducto.querySelector(".subtotal").textContent = `COP ${formatearCOP(subtotal)}`;

        if (typeof recalcularTotal === "function") recalcularTotal();
    });

    // 2. Escuchar clics en botones (+, -, borrar)
    divCarrito.addEventListener("click", (e) => {
        // Buscamos el botón más cercano al click (por si hace click en el icono)
        const btnAumentar = e.target.closest(".btn-aumentar");
        const btnDisminuir = e.target.closest(".btn-disminuir");
        const btnBorrar = e.target.closest(".btn-borrar");

        if (btnAumentar) {
            const input = btnAumentar.closest(".producto").querySelector(".input-cantidad");
            input.value = parseInt(input.value) + 1;
            input.dispatchEvent(new Event("input", { bubbles: true })); // Forzamos la actualización
        }

        if (btnDisminuir) {
            const input = btnDisminuir.closest(".producto").querySelector(".input-cantidad");
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                input.dispatchEvent(new Event("input", { bubbles: true }));
            }
        }

        if (btnBorrar) {
            e.target.closest(".producto").remove();
            if (typeof recalcularTotal === "function") recalcularTotal();
            cantidad.textContent = `(${productosEnCarrito()} productos)`;

        }
    });
});

let total = 0;

function recalcularTotal() {
    let totalGeneral = 0;
    // Seleccionamos todos los productos que existen en el carrito en este momento
    const todosLosProductos = document.querySelectorAll(".div-carrito .producto");

    todosLosProductos.forEach(producto => {
        const precio = parseFloat(producto.dataset.precio);
        const cantidad = parseInt(producto.querySelector(".input-cantidad").value) || 0;

        totalGeneral += precio * cantidad;
    });

    // Buscamos el elemento donde quieres mostrar el gran total
    const lblTotal = document.getElementById("total");
    if (lblTotal) {
        lblTotal.textContent = `COP ${formatearCOP(totalGeneral)}`;
        total = totalGeneral;
    }
}