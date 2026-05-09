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

async function informeVentas() {
    const lblValorVentasHoy = document.getElementById("lbl-valor-ventas-hoy");
    const lblVentasHoy = document.getElementById("lbl-ventas-hoy");
    
    const respuesta = await fetch('/obtenerInformeVentas');
    const info = await respuesta.json();
    const informe = info['informe']
    
    lblValorVentasHoy.textContent = `COP ${formatearCOP(informe["valor_ventas"])}`;
    lblVentasHoy.textContent = `${informe["ventas"]} ventas - COP ${formatearCOP(informe["valor_ventas"])}`;
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

// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const linkIndex = document.getElementById("link-inicio");
    const linkInventario = document.getElementById("link-inventario");
    const linkPVentas = document.getElementById("link-punto-ventas");
    const linkVentas = document.getElementById("link-ventas");
    const botonPVentas = document.getElementById("pVentas");
    const botonInventario = document.getElementById("inventario");

    linkIndex.addEventListener("click", () => {
        abrirVentanas("")
    });

    linkInventario.addEventListener("click", () => {
        abrirVentanas("inventario")
    });
    
    linkPVentas.addEventListener("click", () => {
        abrirVentanas("puntoVentas")
    });
    
    linkVentas.addEventListener("click", () => {
        abrirVentanas("ventas")
    });

    botonPVentas.addEventListener("click", () => {
        abrirVentanas("puntoVentas")
    });

    botonInventario.addEventListener("click", () => {
        abrirVentanas("inventario")
    });
});

document.addEventListener("DOMContentLoaded", () => {
    informeInventario();
    informeVentas();
});