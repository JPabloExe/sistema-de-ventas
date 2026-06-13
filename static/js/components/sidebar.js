export function activarSidebar() {
    const btnMenu = document.getElementById("btn-menu");
    const sidebar = document.getElementById("sidebar");
    const contenedor = document.getElementById("contenedor");
    const divboton = document.getElementById("div-boton");

    if (btnMenu && sidebar) {
        btnMenu.addEventListener("click", () => {
            console.log("click sidebar");
            btnMenu.classList.toggle("active");
            sidebar.classList.toggle("active");
            contenedor.classList.toggle("active");
            divboton.classList.toggle("active");

            console.log(sidebar.className);
            console.log(contenedor.className);
            console.log(divboton.className);
        });
    }
};