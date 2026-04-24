URL_API = "http://127.0.0.1:5000"

function formatearCOP(valor) {
    return valor.toLocaleString("es-CO", {
        style: "decimal", // Quita el $ del valor
        currency: "COP",
        minimumFractionDigits: 2
    });
}

function abrirVentanas(ventana) {
    if (ventana != "") {
        window.location.href = `/${ventana}`;
    } else {
        window.location.href = '/';
    }
};

function obtenerFechaActual() {
    const fecha = new Date();

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Enero = 0
    const anio = fecha.getFullYear();

    const formato = `${dia}/${mes}/${anio}`;

    return formato; // 28/02/2026
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
};

async function obtenerProductos() {
    const respuesta = await fetch(`/obtenerProductos?categoria=${''}`);

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        if (info["error"] == 0) {
            mostrarToast("No hay productos en inventario", "error");
            return;
        }
        mostrarToast(info["error"], "error");
        return;
    }
    return info["productos"];
}

async function obtenerVentas() {
    const intervalo = {
        "inicial": obtenerFechaActual(),
        "final": obtenerFechaActual()
    }

    const respuesta = await fetch(`/buscarVentas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intervalo)
    });

    const info = await respuesta.json();

    if (info["mensaje"] == "n") {
        if (info["error"] == 0) {
            mostrarToast("No hay ventas registradas", "error");
            return;
        }
        mostrarToast(info["error"], "error");
        return;
    }
    return info["ventas"];
}


async function productosEnInventario() {
    const lblProductos = document.getElementById("lbl-productos");

    const productos = await obtenerProductos();

    lblProductos.textContent = `${productos.length}`;
}

async function valorInventario() {
    const lblValorInventario = document.getElementById("lbl-valor-inventario");

    const productos = await obtenerProductos();
    let total = 0;

    for (const producto of productos) {
        total += producto["valor_unitario"];
    }

    lblValorInventario.textContent = `COP ${formatearCOP(total)}`;
}

async function stockBajo() {
    const lblStockBajo = document.getElementById("lbl-stock-bajo");

    const productos = await obtenerProductos();
    let stockBajo = 0;

    for (const producto of productos) {
        if (producto["stock"] <= 5) {
            stockBajo++;
        }
    }

    lblStockBajo.textContent = `${stockBajo}`;
}

async function valorVentasHoy() {
    const lblValorVentasHoy = document.getElementById("lbl-valor-ventas-hoy");

    lblValorVentasHoy.textContent = `COP ${formatearCOP(0)}`;
    
    const ventas = await obtenerVentas();

     let totalVentas = 0;

    for (const venta of ventas) {
        totalVentas += venta["total"];
    }

    lblValorVentasHoy.textContent = `COP ${formatearCOP(totalVentas)}`;
}

async function ventasHoy() {
    const lblVentasHoy = document.getElementById("lbl-ventas-hoy");

    lblVentasHoy.textContent = `${0} ventas - COP ${formatearCOP(0)}`;
    
    const ventas = await obtenerVentas();

     let totalVentas = 0;
     let cantVentas = ventas.length;

    for (const venta of ventas) {
        totalVentas += venta["total"];
    }

    lblVentasHoy.textContent = `${cantVentas} ventas - COP ${formatearCOP(totalVentas)}`;
    
}

document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const sidebar = document.getElementById("sidebar");
    const contenedor = document.getElementById("contenedor");
    const divboton = document.getElementById("div-boton");

    if (btnMenu && sidebar) {
        btnMenu.addEventListener("click", () => {
            btnMenu.classList.toggle("active");
            sidebar.classList.toggle("active");
            contenedor.classList.toggle("active");
            divboton.classList.toggle("active");
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("link-inicio");

    link.addEventListener("click", () => {
        abrirVentanas("")
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("link-inventario");

    link.addEventListener("click", () => {
        abrirVentanas("inventario")
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("link-punto-ventas");

    link.addEventListener("click", () => {
        abrirVentanas("puntoVentas")
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("link-ventas");

    link.addEventListener("click", () => {
        abrirVentanas("ventas")
    });
});

document.addEventListener("DOMContentLoaded", () => {
    productosEnInventario();
    valorInventario();
    stockBajo();
    valorVentasHoy();
    ventasHoy();
});