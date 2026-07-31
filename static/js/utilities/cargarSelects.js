export function cargarSelect(datos, select) {

    // Borra las opciones y los indices se reorganizan 
    // (borra siempre el indice 1 hasta que solo quede la opcion 0)
    while (select.options.length > 1) {
        select.remove(1);
    }

    datos.forEach(dato => {
        const option = document.createElement("option");

        option.value = dato.id;
        option.textContent = dato.nombre;

        select.appendChild(option);
    });

}