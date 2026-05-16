import {
    eliminarProducto, 
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    buscarProducto,
    obtenerInformeInventario
} from "../api/productosApi.js";

import {
    llenarTablaInventario, 
    obtenerDatosFormularioProducto,
    limpiarFormularioProducto,
    mostrarInformeInventario
} from "../ui/inventarioUI.js";

import { mostrarToast } from "../components/toast.js";

export async function eliminarProductoController(codigo) {
    
    const info = await eliminarProducto(codigo);

    if(info["mensaje"] === "n") {
        mostrarToast(info["excepcion"], "error");
    }

    cargarInventario("");
    mostrarToast("Producto eliminado", "success");

}

export async function cargarInventario(categoria) {

    const info = await obtenerProductos(categoria);

    llenarTablaInventario(info["productos"]);
}

export async function agregarProductoController(formulario) {

    const producto = obtenerDatosFormularioProducto(formulario);

    const info = await agregarProducto(producto);

    if (info["mensaje"] == "n") {
        mostrarToast(info["exepcion"], "error");
        return;
    } 

    mostrarToast("Producto agregado", "success");
    limpiarFormularioProducto(formulario);
    cargarInventario("");
    
}

export async function actualizarProductoController(formulario) {
    
    const productoActualizado = obtenerDatosFormularioProducto(formulario);
    
    const info = await actualizarProducto(productoActualizado);
    
    if (info["mensaje"] == "n") {
        mostrarToast(info["exepcion"], "error");
        return;
    } 

    mostrarToast("Producto actualizado", "success");
    limpiarFormularioProducto(formulario);
    cargarInventario("");
}

export async function buscarProductoController(codigo) {

    const info = await buscarProducto(codigo);
    const prodToList = [];

    if (info["mensaje"] === "n") {
        mostrarToast("Producto no encontrado", "error");
        return;
    }

    prodToList.push(info["producto"]);

    llenarTablaInventario(prodToList);
    mostrarToast("Producto encontrado", "success");
    
}

export async function cargarInformeInventario() {

    const info = await obtenerInformeInventario();

    mostrarInformeInventario(info["informe"]);
  
}