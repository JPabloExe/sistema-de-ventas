import { llenarTablaInventario } from "../ui/tablas.js";
import {URL_API} from "../config/config.js"

async function agregarProducto(producto) {
   
    const respuesta = await fetch(`${URL_API}/agregarProducto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });

    return await respuesta.json();

};

async function actualizarProducto(productoActualizado) {

    const respuesta = await fetch(`${URL_API}/actualizarProducto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado)
    });

    return await respuesta.json();

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

async function obtenerInformeInventario() {

    const respuesta = await fetch(`/obtenerInformeInventario`);

    const info = await respuesta.json();

    return info["informe"];

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

    const productos = info["productos"];

    llenarTablaInventario(productos);
};

export async function obtenerProductos(categoria) {

    const respuesta = await fetch(`${URL_API}/obtenerProductos?categoria=${categoria}`);

    return await respuesta.json();
}
