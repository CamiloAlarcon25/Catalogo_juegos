const contador = document.getElementById("contador-juegos");
const contenedor = document.getElementById("contenedor-juegos");
const buscador = document.getElementById("buscar");


function mostrarJuegos(lista){

    contenedor.innerHTML = "";
    contador.textContent = `Mostrando ${lista.length} juego${lista.length !== 1 ? "s" : ""}`;
    if(lista.length===0){

    contenedor.innerHTML=`

        <div class="sin-resultados">

            <h2>😕</h2>

            <h3>No encontramos juegos</h3>

            <p>Prueba otra búsqueda o selecciona otra categoría.</p>

            <button id="limpiarFiltros">

                Mostrar todos

            </button>

        </div>

    `;

    document
        .getElementById("limpiarFiltros")
        .addEventListener("click",()=>{

            buscador.value="";

            categoriaSeleccionada="Todos";

            actualizarBotonActivo();

            aplicarFiltros();

        });

    return;

}

    for(const juego of lista){

        const tarjeta = `

        <div class="card" onclick="abrirJuego(${juego.id})">

            <img src="${juego.imagen}" alt="${juego.nombre}">

            <div class="card-body">

                <h3>${juego.nombre}</h3>

                <p class="categoria">${juego.categoria}</p>

                <div class="info">

                    <span>👥 ${juego.jugadores}</span>

                    <span>🎂 ${juego.edad}</span>

                    <span>⏱ ${juego.duracion}</span>

                </div>

                <button class="btn-info">
                    Ver información
                </button>

            </div>

        </div>

        `;

        const delay = lista.indexOf(juego) * 0.08;

contenedor.innerHTML += tarjeta.replace(
    '<div class="card"',
    `<div class="card" style="animation-delay:${delay}s"`
);

    }

}
const juegosOrdenados = [...juegos].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es")
);

mostrarJuegos(juegosOrdenados);
function abrirJuego(id) {
    window.location.href = `juego.html?id=${id}`;
}
// ==============================
// BUSCADOR
// ==============================

buscador.addEventListener("input", aplicarFiltros);
// ==============================
// FILTRO POR CATEGORÍA
// ==============================

const botonesCategorias = document.querySelectorAll(".categorias-grid button");

let categoriaSeleccionada = "Todos";
actualizarBotonActivo();

botonesCategorias.forEach(boton => {

    boton.addEventListener("click", () => {

        categoriaSeleccionada = boton.dataset.categoria;

        actualizarBotonActivo();

        aplicarFiltros();

    });

});
// ==============================
// APLICAR FILTROS
// ==============================

function aplicarFiltros() {

    const texto = buscador.value.toLowerCase();

    const filtrados = [...juegos]
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
    .filter(juego => {

        const coincideBusqueda =
            juego.nombre.toLowerCase().includes(texto);

        const coincideCategoria =
            categoriaSeleccionada === "Todos" ||
            juego.categoria === categoriaSeleccionada;

        return coincideBusqueda && coincideCategoria;

    });

    mostrarJuegos(filtrados);

}
// ==============================
// BOTÓN ACTIVO
// ==============================

function actualizarBotonActivo(){

    botonesCategorias.forEach(boton=>{

        boton.classList.remove("activo");

        if(boton.dataset.categoria===categoriaSeleccionada){

            boton.classList.add("activo");

        }

    });

}