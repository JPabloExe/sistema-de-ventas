import { formatearCOP } from "../utilities/moneda.js";

let ventaAEliminar = null;

export function inicializarDialogEliminarVenta(onConfirmar) {

    const btnConfirmar = document.getElementById("btn-confirmar-borrado");
    const btnCancelar = document.getElementById("btn-cancelar-confirmacion");
    const dialogConfirmacion = document.getElementById("dialog-confirmacion");
    const tbody = document.getElementById("cuerpo-tabla-ventas");


    tbody.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".eliminar");

        if (botonEliminar) {
            ventaAEliminar = botonEliminar.dataset.numero;
            dialogConfirmacion.showModal();
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialogConfirmacion.close();
    });
    
    
    btnConfirmar.addEventListener("click", () => {
        if (ventaAEliminar) {
            onConfirmar(ventaAEliminar);
            dialogConfirmacion.close();
        }
    });

}

export function mostrarInformeVentas(informe) {

    const lblValorVentasHoy = document.getElementById("lbl-valor-ventas-hoy");
    const lblVentasHoy = document.getElementById("lbl-ventas-hoy");
    
    lblValorVentasHoy.textContent = `COP ${formatearCOP(informe["valor_ventas"])}`;
    lblVentasHoy.textContent = `${informe["ventas"]} ventas - COP ${formatearCOP(informe["valor_ventas"])}`;
    
}

export function llenarTablaVentas(ventas) {

    const tBody = document.querySelector(".tabla-ventas tbody");



    tBody.innerHTML = "";

    for (const venta of ventas) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <tr>
                <td class="numero">#${venta["id"]}</td>

                <td class="fecha">
                    <div>
                        <p class="p-fecha">${venta["fecha"]}</p>
                        <p class="p-hora">${venta["hora"]}</p>
                    </div>
                </td>
                <td class="usuario">${venta["usuario"]}</td>
                <td class="items">${venta["items"]}</td>
                <td class="metodo">     
                    <p class="p-metodo">${venta["metodo"]}</p>
                </td>
                <td class="total">COP ${formatearCOP(venta["total"])}</td>
                
                <td class="acciones">
                    <i id="btn-info-producto" class="fa-solid fa-circle-info informacion"
                        data-numero="${venta["numero"]}">
                    </i>
                    <i id="btn-eliminar-producto" class="fa-solid fa-trash eliminar"
                        data-numero="${venta["numero"]}">
                    </i>
                </td>
            </tr>
        `;
        tBody.appendChild(fila);
    }
};