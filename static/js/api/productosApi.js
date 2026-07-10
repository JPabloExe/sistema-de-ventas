import { llenarTablaInventario } from "../ui/inventarioUI.js";
import {URL_API} from "../config/config.js"

export async function agregarProducto(producto) {
   
    const respuesta = await fetch(`${URL_API}/agregarProducto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });

    return await respuesta.json();

};

export async function crearCategoria(categoria) {
   
    const respuesta = await fetch(`${URL_API}/crearCategoria`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria)
    });

    return await respuesta.json();

};

export async function actualizarProducto(productoActualizado) {

    const respuesta = await fetch(`${URL_API}/actualizarProducto`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado)
    });

    return await respuesta.json();

};

export async function buscarProducto(codigo) {

    const respuesta = await fetch(`${URL_API}/buscarProducto?codigo=${codigo}`, {
        method: "POST"
    });

    return await respuesta.json();

};

export async function eliminarProducto(codigo) {

    const respuesta = await fetch(`${URL_API}/eliminarProducto?codigo=${codigo}`, {
        method: "DELETE"
    });

    return await respuesta.json();

}

export async function obtenerInformeInventario() {

    const respuesta = await fetch(`/obtenerInformeInventario`);

    return await respuesta.json();

}

export async function obtenerProductos(categoria) {

    const respuesta = await fetch(`${URL_API}/obtenerProductos?categoria=${categoria}`);

    return await respuesta.json();
    
}

export async function obtenerCategorias() {

    const respuesta = await fetch(`${URL_API}/obtenerCategorias`);

    return await respuesta.json();
    
}
