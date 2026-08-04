const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));

const juego = juegos.find(j => j.id === id);

if (!juego) {

    document.body.innerHTML = "<h1>Juego no encontrado</h1>";

} else {

    document.getElementById("nombre").textContent = juego.nombre;

    document.getElementById("imagen").src = juego.imagen;
    document.getElementById("imagen").alt = juego.nombre;

    document.getElementById("categoria").textContent = juego.categoria;
    document.getElementById("edad").textContent = juego.edad;
    document.getElementById("jugadores").textContent = juego.jugadores;
    document.getElementById("duracion").textContent = juego.duracion;

    document.getElementById("descripcion").textContent = juego.descripcion;
    document.getElementById("objetivo").textContent = juego.objetivo;

    // Habilidades

    const listaHabilidades = document.getElementById("habilidades");

    listaHabilidades.innerHTML = "";

    juego.habilidades.forEach(habilidad => {

        listaHabilidades.innerHTML += `<li>✅ ${habilidad}</li>`;

    });

    // Beneficios

    const listaBeneficios = document.getElementById("beneficios");

    listaBeneficios.innerHTML = "";

    juego.beneficios.forEach(beneficio => {

        listaBeneficios.innerHTML += `<li>🌱 ${beneficio}</li>`;

    });

    // Contenido

    const listaContenido = document.getElementById("contenido");

    listaContenido.innerHTML = "";

    juego.contenido.forEach(item => {

        listaContenido.innerHTML += `<li>📦 ${item}</li>`;

    });

}