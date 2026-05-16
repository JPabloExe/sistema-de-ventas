import {
    obtenerInformeVentas,
    buscarVentas,
    eliminarVenta
} from "../api/ventasApi.js"

import { 
    llenarTablaVentas,
    mostrarInformeVentas,
} from "../ui/ventasUI.js";

import { mostrarToast } from "../components/toast.js";

export async function eliminarVentaController(numeroVenta) {
    
    const info = await eliminarVenta(numeroVenta);

    if(info["mensaje"] === "n") {
        mostrarToast(info["excepcion"], "error");
        return;
    }

    cargarVentas("", "");
    mostrarToast("Venta eliminada", "success");

}

export async function cargarInformeVentas() {

    const info = await obtenerInformeVentas();

    mostrarInformeVentas(info["informe"]);
  
}

export async function cargarVentas(fechaInicial, fechaFinal) {

    const info = await buscarVentas(fechaInicial, fechaFinal);

    if (info["mensaje"] == "n") {

        if (info["error"] == 0) {
            mostrarToast("Ventas no encontradas en este intervalo", "error");
            return;
        }
        mostrarToast(info["error"], "error")
        return;
    }

    llenarTablaVentas(info["ventas"]);
    
}