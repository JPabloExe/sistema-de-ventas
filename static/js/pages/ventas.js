import { activarSidebar } from "../components/sidebar.js";

import { inicializarDialogEliminarVenta } from "../ui/ventasUI.js";

import { 
    eliminarVentaController,
    cargarVentas
} from "../controllers/ventasController.js";

document.addEventListener("DOMContentLoaded", () => {
    
    inicializarDialogEliminarVenta(eliminarVentaController);
    cargarVentas(null, null);
    activarSidebar();
    
});

// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("btn-actualizar-pagina");

    boton.addEventListener("click", () => {
        window.location.reload();
    });
});

// Buscar Ventas
document.addEventListener("DOMContentLoaded", () => {

    const btnBuscar = document.getElementById("btn-buscar");
    
    btnBuscar.addEventListener("click", () => {
        const fechaInicial = document.getElementById("input-fecha-inicial").value;
        const fechaFinal = document.getElementById("input-fecha-final").value;

        if (fechaInicial.trim() === "" && fechaFinal.trim() === "") {
            cargarVentas(null, null);
            return;
        }
        
        cargarVentas(fechaInicial, fechaFinal);

    });

});

