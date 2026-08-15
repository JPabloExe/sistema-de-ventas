export function mostrarEstadoVacio(tbody, mensaje) {

    tbody.innerHTML = "";

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <tr>
            <td colspan="4" class="text-center">${mensaje}</td>
        </tr>
    `;

    tbody.appendChild(fila);

}