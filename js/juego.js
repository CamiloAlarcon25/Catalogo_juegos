const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));
const juego = juegos.find(j => j.id === id);

if (!juego) {
    document.body.innerHTML = "<h1>Juego no encontrado</h1>";
} else {
    const nombre = document.getElementById("nombre");
    nombre.textContent = juego.nombre;

    // Mostrar precio debajo del nombre, si el producto tiene precio registrado.
    let precio = document.getElementById("precio");
    if (!precio) {
        precio = document.createElement("p");
        precio.id = "precio";
        precio.className = "precio-detalle";
        nombre.insertAdjacentElement("afterend", precio);
    }

    if (juego.precio != null) {
        precio.textContent = `$${juego.precio.toLocaleString("es-CL")}`;
        precio.hidden = false;
    } else {
        precio.textContent = "";
        precio.hidden = true;
    }

    const imagen = document.getElementById("imagen");
    imagen.src = juego.imagen;
    imagen.alt = juego.nombre;

    if (!juego.stock) {
        imagen.classList.add("sin-stock-imagen");
    } else {
        imagen.classList.remove("sin-stock-imagen");
    }

    document.getElementById("categoria").textContent = juego.categoria;
    document.getElementById("edad").textContent = juego.edad;
    document.getElementById("jugadores").textContent = juego.jugadores;
    document.getElementById("duracion").textContent = juego.duracion;

    const actualizarStock = (elemento, claseAgotado = "sin-stock") => {
        if (!elemento) return;

        elemento.textContent = juego.stock
            ? "✅ Disponible"
            : "❌ Sin Stock";

        elemento.classList.toggle("disponible", Boolean(juego.stock));
        elemento.classList.toggle(claseAgotado, !juego.stock);
    };

    actualizarStock(document.getElementById("stock"));

    // Compatibilidad con la sección de stock si existe en el HTML.
    const estado = document.getElementById("estadoStock");

    if (estado) {
        estado.innerHTML = juego.stock
            ? '<div class="stock disponible">✅ Disponible</div>'
            : '<div class="stock agotado">❌ Sin Stock</div>';
    }

    document.getElementById("descripcion").textContent = juego.descripcion;
    document.getElementById("objetivo").textContent = juego.objetivo;

    // Habilidades
    const listaHabilidades = document.getElementById("habilidades");
    listaHabilidades.innerHTML = "";

    (juego.habilidades || []).forEach(habilidad => {
        listaHabilidades.innerHTML += `<li>✅ ${habilidad}</li>`;
    });

    // Beneficios
    const listaBeneficios = document.getElementById("beneficios");

    if (listaBeneficios) {
        listaBeneficios.innerHTML = "";

        (juego.beneficios || []).forEach(beneficio => {
            listaBeneficios.innerHTML += `<li>🌱 ${beneficio}</li>`;
        });
    }

    // Contenido
    const listaContenido = document.getElementById("contenido");
    listaContenido.innerHTML = "";

    (juego.contenido || []).forEach(item => {
        listaContenido.innerHTML += `<li>📦 ${item}</li>`;
    });

    // Video de YouTube (opcional)
    const obtenerIdYoutube = (url) => {
        if (!url) return null;

        try {
            const enlace = new URL(url);
            let videoId = null;

            if (
                enlace.hostname === "youtu.be" ||
                enlace.hostname === "www.youtu.be"
            ) {
                videoId = enlace.pathname.split("/").filter(Boolean)[0];
            } else if (
                ["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(enlace.hostname)
            ) {
                videoId =
                    enlace.searchParams.get("v") ||
                    enlace.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
            }

            return videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)
                ? videoId
                : null;
        } catch {
            return null;
        }
    };

    // Evitar duplicar la sección del video
    document.getElementById("seccion-video")?.remove();

    const videoId = obtenerIdYoutube(juego.videoYoutube);

    if (videoId) {
        const seccionVideo = document.createElement("section");
        seccionVideo.id = "seccion-video";
        seccionVideo.className = "seccion-video";

        const tituloVideo = document.createElement("h2");
        tituloVideo.textContent = "🎬 Aprende a jugar";

        const contenedorVideo = document.createElement("div");
        contenedorVideo.className = "contenedor-video";

        const reproductor = document.createElement("iframe");
        reproductor.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
        reproductor.title = `Cómo jugar a ${juego.nombre}`;
        reproductor.loading = "lazy";
        reproductor.referrerPolicy = "strict-origin-when-cross-origin";
        reproductor.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        reproductor.allowFullscreen = true;

        contenedorVideo.appendChild(reproductor);
        seccionVideo.append(tituloVideo, contenedorVideo);


const descripcion = document.getElementById("descripcion");
const bloqueDescripcion = descripcion?.closest(".bloque");

if (bloqueDescripcion) {
    bloqueDescripcion.insertAdjacentElement("beforebegin", seccionVideo);
}

    }


}