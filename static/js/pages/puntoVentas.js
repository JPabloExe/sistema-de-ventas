function productosEnCarrito() {
    let cantidad = 0;

    const productos = document.querySelectorAll(".div-carrito .producto");

    productos.forEach(producto => {
        cantidad++;
    });

    return cantidad;
};

function limpiarCarrito() {
    const carrito = document.querySelectorAll(".div-carrito .producto");

    carrito.forEach(producto => {
        producto.remove();
    });
};

// Dialog pagos
document.addEventListener("DOMContentLoaded", () => {
    const botonProcesar = document.getElementById("btn-procesar-venta");
    const botonCerrar = document.getElementById("btn-cancelar-pago");
    const botonConfirmar = document.getElementById("btn-confirmar-pago");

    botonProcesar.addEventListener("click", () => {
        realizarVenta();
        mostrarToast("Venta exitosa", "success");
        limpiarCarrito();
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
    const lblTotal = document.getElementById("totalPagar");
    if (lblTotal) {
        lblTotal.value = `COP ${formatearCOP(totalGeneral)}`;
        total = totalGeneral;
        calcular();
    }
}

const totalInput = document.getElementById("totalPagar");
const recibidoInput = document.getElementById("recibido");
const cambioInput = document.getElementById("cambio");
const estado = document.getElementById("estadoPago");


function calcular() {
    const recibido = parseInt(recibidoInput.value) || 0;

    const cambio = recibido - total;

    cambioInput.value = cambio >= 0 ? `COP ${formatearCOP(cambio)}` : `COP ${formatearCOP(0)}`;

    if (recibido === 0) {
        estado.textContent = "";
    } else if (cambio < 0) {
        estado.textContent = "Pago incompleto";
        estado.style.color = "red";
    } else {
        estado.textContent = "Pago completo";
        estado.style.color = "green";
    }
}


function agregarMonto(valor) {
    recibidoInput.value = (parseFloat(recibidoInput.value) || 0) + valor;
    calcular();
}

recibidoInput.addEventListener("input", calcular);
