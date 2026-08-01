export function cargarInputBusqueda(datos) {

    const datalist = document.getElementById('datos');

    datalist.innerHTML = '';

    datos.forEach(dato => {
        const option = document.createElement('option');
        option.value = dato.id_busqueda;
        option.textContent = dato.nombre;

        datalist.appendChild(option);
    });

}

