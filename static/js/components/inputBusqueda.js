export function cargarInputBusqueda(datos) {

    const input = document.getElementById("input-buscar");
    const lista = document.getElementById("listaDatos");

    input.addEventListener("input", function () {
        const texto = input.value.toLowerCase();

        lista.innerHTML = "";

        if (texto === "") {
            lista.style.display = "none";
            return;
        }

        const resultados = datos.filter(dato =>
            dato.nombre.toLowerCase().includes(texto)
        );

        if (resultados.length === 0) {
            lista.style.display = "none";
            return;
        }

        resultados.forEach(dato => {
            const li = document.createElement("li");

            li.textContent = dato.nombre;

            li.addEventListener("click", function () {
                input.value = dato.id_busqueda;
                lista.style.display = "none";
                input.focus();
            });

            lista.appendChild(li);
        });

        lista.style.display = "block";
    });
}
