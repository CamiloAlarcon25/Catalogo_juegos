const contador = document.getElementById("contador-juegos");
const contenedor = document.getElementById("contenedor-juegos");
const buscador = document.getElementById("buscar");


// ==============================
// MOSTRAR JUEGOS
// ==============================

function mostrarJuegos(lista) {

    contenedor.innerHTML = "";

    contador.textContent =
        `Mostrando ${lista.length} juego${lista.length !== 1 ? "s" : ""}`;


    if (lista.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-resultados">

                <h2>😕</h2>

                <h3>No encontramos juegos</h3>

                <p>
                    Prueba otra búsqueda o selecciona otra categoría.
                </p>

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

        const claseStock =
            juego.stock ? "" : "sin-stock";

        const delay =
            index * 0.08;


        const tarjeta = `

            <div
                class="card ${claseStock}"
                style="animation-delay:${delay}s"
                onclick="abrirJuego(${juego.id})"
            >

                <img
                    src="${juego.imagen}"
                    alt="${juego.nombre}"
                >

                ${!juego.stock ? `

                    <div class="stock-badge">
                        Sin Stock
                    </div>

                ` : ""}


                <div class="card-body">

                    <h3>${juego.nombre}</h3>

                    <p class="categoria">
                        ${juego.categoria}
                    </p>

                    <div class="info">

                        <span>
                            👥 ${juego.jugadores}
                        </span>

                        <span>
                            🎂 ${juego.edad}
                        </span>

                        <span>
                            ⏱ ${juego.duracion}
                        </span>

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

function abrirJuego(id) {

    window.location.href =
        `juego.html?id=${id}`;

}


// ==============================
// BUSCADOR
// ==============================

buscador.addEventListener(
    "input",
    aplicarFiltros
);


// ==============================
// CATEGORÍAS
// ==============================

const botonesCategorias =
    document.querySelectorAll(
        ".categorias-grid button"
    );

let categoriaSeleccionada = "Todos";

actualizarBotonActivo();


botonesCategorias.forEach(boton => {

    boton.addEventListener("click", () => {

        categoriaSeleccionada =
            boton.dataset.categoria;

        actualizarBotonActivo();

        aplicarFiltros();

    });

});


// ==============================
// FILTROS
// ==============================

function aplicarFiltros() {

    const seccionBox =
        document.getElementById("arma-box");


    // ==============================
    // CREA TU BOX
    // ==============================

    if (categoriaSeleccionada === "Arma tu Box") {

        contenedor.innerHTML = "";

        contador.textContent = "";

        seccionBox.style.display = "block";

        return;

    }


    // ==============================
    // OCULTAR BOX
    // ==============================

    seccionBox.style.display = "none";


    // ==============================
    // FILTROS NORMALES
    // ==============================

    const texto =
        buscador.value.toLowerCase();


    const filtrados = [...juegos]

        .sort((a, b) =>
            a.nombre.localeCompare(b.nombre, "es")
        )

        .filter(juego => {

            const coincideBusqueda =
                juego.nombre
                    .toLowerCase()
                    .includes(texto);


            const coincideCategoria =

                categoriaSeleccionada === "Todos"

                ||

                juego.categoria ===
                    categoriaSeleccionada

                ||

                (
                    categoriaSeleccionada === "Disponibles"
                    &&
                    juego.stock === true
                )

                ||

                (
                    categoriaSeleccionada === "Sin Stock"
                    &&
                    juego.stock === false
                );


            return (
                coincideBusqueda &&
                coincideCategoria
            );

        });


    mostrarJuegos(filtrados);

}


// ==============================
// BOTÓN ACTIVO
// ==============================

function actualizarBotonActivo() {

    botonesCategorias.forEach(boton => {

        boton.classList.remove("activo");


        if (
            boton.dataset.categoria ===
            categoriaSeleccionada
        ) {

            boton.classList.add("activo");

        }

    });

}


// ==================================================
// CREA TU BOX
// ==================================================

const contenedorBox =
    document.getElementById("juegos-box");


let juegosSeleccionados = [];


// ==============================
// CARGAR JUEGOS PARA BOX
// ==============================

function cargarJuegosBox() {

    const juegosBox =
        juegos.filter(
            juego => juego.box === true
        );


    contenedorBox.innerHTML = "";


    juegosBox.forEach(juego => {

        contenedorBox.innerHTML += `

            <div
                class="box-juego ${!juego.stock ? "sin-stock-box" : ""}"
                data-id="${juego.id}"
            >

                <img
                    src="${juego.imagen}"
                    alt="${juego.nombre}"
                >

                <h4>
                    ${juego.nombre}
                </h4>

                ${!juego.stock ? `

                    <span class="stock-box">
                        Sin Stock
                    </span>

                ` : ""}

            </div>

        `;

    });


    // ==============================
    // SELECCIÓN
    // ==============================

    document
        .querySelectorAll("#juegos-box .box-juego")
        .forEach(elemento => {

            elemento.addEventListener(
                "click",
                () => {

                    const id =
                        Number(elemento.dataset.id);


                    const juego =
                        juegos.find(
                            j => j.id === id
                        );


                    // ==============================
                    // SIN STOCK
                    // ==============================

                    if (!juego.stock) {

                        return;

                    }


                    // ==============================
                    // DESELECCIONAR
                    // ==============================

                    if (
                        juegosSeleccionados.some(
                            j => j.id === id
                        )
                    ) {

                        juegosSeleccionados =
                            juegosSeleccionados.filter(
                                j => j.id !== id
                            );


                        elemento.classList.remove(
                            "seleccionado"
                        );


                        actualizarBox();

                        return;

                    }


// ==============================
// MÁXIMO 2 JUEGOS
// ==============================

if (juegosSeleccionados.length >= 2) {

    // Quitar el primer juego seleccionado
    const juegoAnterior = juegosSeleccionados.shift();

    const elementoAnterior =
        document.querySelector(
            `#juegos-box .box-juego[data-id="${juegoAnterior.id}"]`
        );

    if (elementoAnterior) {
        elementoAnterior.classList.remove("seleccionado");
    }

}


                    // ==============================
                    // SELECCIONAR
                    // ==============================

                    juegosSeleccionados.push(juego);


                    elemento.classList.add(
                        "seleccionado"
                    );


                    actualizarBox();

                }
            );

        });

}


// ==============================
// ACTUALIZAR RESUMEN
// ==============================

function actualizarBox() {

    const seleccion =
        document.getElementById("box-seleccion");

    const precio =
        document.getElementById("box-precio");


    // ==============================
    // 0 JUEGOS
    // ==============================

    if (
        juegosSeleccionados.length === 0
    ) {

        seleccion.textContent =
            "Selecciona 2 juegos";

        precio.textContent = "";

        return;

    }


    // ==============================
    // 1 JUEGO
    // ==============================

    if (
        juegosSeleccionados.length === 1
    ) {

        seleccion.textContent =
            `${juegosSeleccionados[0].nombre} + Elige otro juego`;

        precio.textContent = "";

        return;

    }


    // ==============================
    // 2 JUEGOS
    // ==============================

    seleccion.textContent =
        `${juegosSeleccionados[0].nombre} + ${juegosSeleccionados[1].nombre}`;


    precio.textContent =
        "$16.000";

}


// ==============================
// INICIAR CREA TU BOX
// ==============================

cargarJuegosBox();