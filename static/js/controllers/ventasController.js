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

    if(!info.ok) {

        mostrarToast(info.message, info.type);
        return;
        
    }
    
    cargarVentas("", "");
    mostrarToast(info.message, info.type);
    
}

export async function cargarInformeVentas() {
    
    const info = await obtenerInformeVentas();
    
    if(!info.ok) {
    
        mostrarToast(info.message, info.type);
        return;
        
    }
    
    mostrarInformeVentas(info.data);
    mostrarToast(info.message, info.type);
  
}

export async function cargarVentas(fechaInicial, fechaFinal) {

    const info = await buscarVentas(fechaInicial, fechaFinal);

    if (!info.ok) {

        mostrarToast(info.message, info.type)
        return;

    }

    llenarTablaVentas(info.data);
    mostrarToast(info.message, info.type);
    
}