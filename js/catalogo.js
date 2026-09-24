const contador = document.getElementById("contador-juegos");
const contenedor = document.getElementById("contenedor-juegos");
const buscador = document.getElementById("buscar");

// ==============================
// MOSTRAR JUEGOS
// ==============================

function mostrarJuegos(lista){

    contenedor.innerHTML = "";

    contador.textContent = `Mostrando ${lista.length} juego${lista.length !== 1 ? "s" : ""}`;

    if(lista.length === 0){

        contenedor.innerHTML = `

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
            .addEventListener("click", () => {

                buscador.value = "";

                categoriaSeleccionada = "Todos";

                actualizarBotonActivo();

                aplicarFiltros();

            });

        return;

    }

    lista.forEach((juego, index) => {

        const claseStock = juego.stock ? "" : "sin-stock";

        const delay = index * 0.08;

        const tarjeta = `

        <div class="card ${claseStock}"
             style="animation-delay:${delay}s"
             onclick="abrirJuego(${juego.id})">

            <img src="${juego.imagen}" alt="${juego.nombre}">

            ${!juego.stock ? `
                <div class="stock-badge">
                    Sin Stock
                </div>
            ` : ""}

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

        contenedor.innerHTML += tarjeta;

    });

}

// ==============================
// ORDENAR ALFABÉTICAMENTE
// ==============================

const juegosOrdenados = [...juegos].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es")
);

mostrarJuegos(juegosOrdenados);

// ==============================
// ABRIR JUEGO
// ==============================

function abrirJuego(id){

    window.location.href = `juego.html?id=${id}`;

}

// ==============================
// BUSCADOR
// ==============================

buscador.addEventListener("input", aplicarFiltros);

// ==============================
// CATEGORÍAS
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
// FILTROS
// ==============================

function aplicarFiltros() {

    // ==============================
    // MOSTRAR ARMA TU BOX
    // ==============================

    const seccionBox = document.getElementById("arma-box");

    if (categoriaSeleccionada === "Arma tu Box") {

        contenedor.innerHTML = "";
        contador.textContent = "";

        seccionBox.style.display = "block";

        return;
    }

    // Ocultar Box cuando estamos viendo el catálogo normal
    seccionBox.style.display = "none";


    // ==============================
    // FILTROS NORMALES
    // ==============================

    const texto = buscador.value.toLowerCase();

    const filtrados = [...juegos]
        .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
        .filter(juego => {

            const coincideBusqueda =
                juego.nombre.toLowerCase().includes(texto);

            const coincideCategoria =
                categoriaSeleccionada === "Todos" ||
                juego.categoria === categoriaSeleccionada ||
                (categoriaSeleccionada === "Disponibles" && juego.stock === true) ||
                (categoriaSeleccionada === "Sin Stock" && juego.stock === false);

            return coincideBusqueda && coincideCategoria;

        });

    mostrarJuegos(filtrados);

}

// ==============================
// BOTÓN ACTIVO
// ==============================

function actualizarBotonActivo(){

    botonesCategorias.forEach(boton => {

        boton.classList.remove("activo");

        if(boton.dataset.categoria === categoriaSeleccionada){

            boton.classList.add("activo");

        }

    });

}
// ==============================
// ARMAR BOX
// ==============================

const contenedorPrincipales = document.getElementById("juegos-principales");
const contenedorSecundarios = document.getElementById("juegos-secundarios");

let juegoPrincipalSeleccionado = null;
let juegoSecundarioSeleccionado = null;


function cargarJuegosBox() {

    const principales = juegos.filter(
        juego => juego.tipoBox === "principal"
    );

    const secundarios = juegos.filter(
        juego => juego.tipoBox === "secundario"
    );


    contenedorPrincipales.innerHTML = "";

    principales.forEach(juego => {

        contenedorPrincipales.innerHTML += `
    <div class="box-juego ${!juego.stock ? 'sin-stock-box' : ''}"
         data-id="${juego.id}"
         data-tipo="principal">
        <img src="${juego.imagen}" alt="${juego.nombre}">
        <h4>${juego.nombre}</h4>
        ${!juego.stock ? '<span class="stock-box">Sin Stock</span>' : ''}
    </div>
`;

    });


    contenedorSecundarios.innerHTML = "";

    secundarios.forEach(juego => {

        contenedorSecundarios.innerHTML += `
    <div class="box-juego ${!juego.stock ? 'sin-stock-box' : ''}"
         data-id="${juego.id}"
         data-tipo="secundario">
        <img src="${juego.imagen}" alt="${juego.nombre}">
        <h4>${juego.nombre}</h4>
        ${!juego.stock ? '<span class="stock-box">Sin Stock</span>' : ''}
    </div>
`;

    });


    // ==============================
    // SELECCIÓN
    // ==============================

    document.querySelectorAll(".box-juego").forEach(elemento => {

        elemento.addEventListener("click", () => {

            const id = Number(elemento.dataset.id);
            const tipo = elemento.dataset.tipo;

            const juego = juegos.find(j => j.id === id);


            if (tipo === "principal") {

                juegoPrincipalSeleccionado = juego;

                document
                    .querySelectorAll('#juegos-principales .box-juego')
                    .forEach(item => item.classList.remove("seleccionado"));

            }


            if (tipo === "secundario") {

                juegoSecundarioSeleccionado = juego;

                document
                    .querySelectorAll('#juegos-secundarios .box-juego')
                    .forEach(item => item.classList.remove("seleccionado"));

            }


            elemento.classList.add("seleccionado");

            actualizarBox();

        });

    });

}


cargarJuegosBox();

function actualizarBox() {

    const seleccion = document.getElementById("box-seleccion");
    const precio = document.getElementById("box-precio");


    if (!juegoPrincipalSeleccionado && !juegoSecundarioSeleccionado) {

        seleccion.textContent =
            "Selecciona 1 juego principal y 1 secundario";

        precio.textContent = "";

        return;
    }


    if (juegoPrincipalSeleccionado && !juegoSecundarioSeleccionado) {

        seleccion.textContent =
            `${juegoPrincipalSeleccionado.nombre} + Selecciona un juego secundario`;

        precio.textContent = "";

        return;
    }


    if (!juegoPrincipalSeleccionado && juegoSecundarioSeleccionado) {

        seleccion.textContent =
            `Selecciona un juego principal + ${juegoSecundarioSeleccionado.nombre}`;

        precio.textContent = "";

        return;
    }


    seleccion.textContent =
        `${juegoPrincipalSeleccionado.nombre} + ${juegoSecundarioSeleccionado.nombre}`;

    precio.textContent = "$16.000";

}