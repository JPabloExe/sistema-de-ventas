import { activarSidebar } from "../components/sidebar.js";

import { botonDesplegableCompras } from "../utilities/botonDesplegable.js";

import {
    cargarCompras
} from "../controllers/comprasController.js";

document.addEventListener('DOMContentLoaded', () => {
    activarSidebar();
    botonDesplegableCompras();
    cargarCompras();
});