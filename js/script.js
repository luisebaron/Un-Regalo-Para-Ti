// ===============================
// BOTÓN
// ===============================

const boton = document.getElementById("abrirRegalo");

// Frases aleatorias para el botón (varía cada vez que se abre la página)
const textosBoton = [
    "🌻 Abrir mi regalo",
    "🌻 Descúbrelo",
    "🌻 Ver mi sorpresa",
    "🌻 Toca aquí",
    "🌻 Ábrelo con cuidado"
];

boton.textContent = textosBoton[Math.floor(Math.random() * textosBoton.length)];

// ===============================
// LUNA INTERACTIVA
// ===============================

const luna = document.getElementById("moon");
const resplandor = document.getElementById("ambientGlow");
const cielo = document.getElementById("sky-gradient");

// Alterna la fase/brillo de la luna: al apagarse, todo el cielo se oscurece
// por completo (queda todo negro) y solo se ven las estrellas brillando.
function alternarLuna(forzarApagada) {

    if (!luna) return;

    const apagada = typeof forzarApagada === "boolean"
        ? forzarApagada
        : !luna.classList.contains("apagada");

    luna.classList.toggle("apagada", apagada);

    if (resplandor) {
        resplandor.classList.toggle("apagado", apagada);
    }

    if (cielo) {
        cielo.classList.toggle("apagado", apagada);
    }
}

if (luna) {
    luna.addEventListener("click", () => {
        alternarLuna();
    });
}

// ===============================
// ESTRELLAS
// ===============================

const stars = document.getElementById("stars");

for (let i = 0; i < 200; i++) {

    const star = document.createElement("span");

    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 5 + "s";
    star.style.animationDuration = (2 + Math.random() * 4) + "s";

    stars.appendChild(star);
}

// ===============================
// PARTÍCULAS
// ===============================

const particles = document.getElementById("particles");

for (let i = 0; i < 70; i++) {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = (5 + Math.random() * 8) + "s";

    particles.appendChild(particle);
}

// ===============================
// ESTRELLAS FUGACES
// ===============================

const shooting = document.getElementById("shooting-stars");

setInterval(() => {

    const star = document.createElement("div");

    star.className = "shooting";

    star.style.left = Math.random() * 70 + "%";
    star.style.top = Math.random() * 35 + "%";

    shooting.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2000);

}, 3000);

// ===============================
// HISTORIA (TEXTO)
// ===============================

const mensajes = [
    "Hola...",
    "Hoy quería regalarte algo diferente...",
    "No son flores reales...",
    "Pero fueron hechas especialmente para ti."
];

const typewriter = document.getElementById("typewriter");
let mensajeActual = 0;

// escribir texto
function escribirTexto(texto, callback) {

    typewriter.textContent = "";

    let indice = 0;

    const intervalo = setInterval(() => {

        typewriter.textContent += texto.charAt(indice);

        indice++;

        if (indice >= texto.length) {

            clearInterval(intervalo);

            setTimeout(() => {
                if (callback) callback();
            }, 1200);
        }

    }, 70);
}

// borrar texto
function borrarTexto(callback) {

    let texto = typewriter.textContent;

    const intervalo = setInterval(() => {

        texto = texto.slice(0, -1);

        typewriter.textContent = texto;

        if (texto.length === 0) {

            clearInterval(intervalo);

            if (callback) callback();
        }

    }, 40);
}

// siguiente mensaje
function escribirSiguienteMensaje() {

    escribirTexto(mensajes[mensajeActual], () => {

        setTimeout(() => {

            borrarTexto(() => {

                mensajeActual++;

                if (mensajeActual < mensajes.length) {

                    escribirSiguienteMensaje();

                } else {

                    // ===============================
                    // FINAL DE HISTORIA
                    // ===============================

                    boton.classList.remove("oculto");
                    boton.classList.add("mostrar");

                    typewriter.classList.add("finalizado");
                }

            });

        }, 1500);

    });

}

// iniciar historia
escribirSiguienteMensaje();

// ===============================
// BOTÓN CLICK
// ===============================

let regaloAbierto = false;

boton.addEventListener("click", () => {

    // Evita que un doble toque (muy común en celulares) dispare
    // todo el proceso más de una vez y deje la animación trabada
    if (regaloAbierto) return;
    regaloAbierto = true;

    boton.style.pointerEvents = "none";

    const intro = document.getElementById("intro");
    const garden = document.getElementById("garden");
    const cortina = document.getElementById("cortina");

    intro.style.opacity = "0";
    cortina.classList.add("mostrar");

    reproducirMusica();

    setTimeout(() => {

        intro.style.display = "none";

        garden.classList.remove("hidden");
        garden.classList.add("visible");

        // 🌑 en el jardín ya no aparece la luna, y arranca todo completamente
        // oscuro (ni siquiera se ven las estrellas todavía): solo la semilla
        // brotará en la penumbra, y su luz será la que revele el resto.
        if (luna) luna.classList.add("oculta");

        const ambientGlow = document.getElementById("ambientGlow");
        if (ambientGlow) ambientGlow.classList.add("apagado");

        const cieloNocturno = document.getElementById("cieloNocturno");
        if (cieloNocturno) cieloNocturno.classList.add("oculto");

        crearJardin();

        // se retira la cortina un instante después, revelando la escena ya en calma
        setTimeout(() => {
            cortina.classList.remove("mostrar");
        }, 400);

    }, 900);
});

//=========================================
// MÚSICA DE FONDO
//=========================================

const musica = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("botonMusica");

function reproducirMusica() {
    if (!musica) return;

    musica.volume = 0;

    musica.play().then(() => {

        // mostrar el botón de música una vez que ya está sonando
        botonMusica.classList.remove("oculto");
        botonMusica.classList.add("mostrar");

        // fade-in suave del volumen
        const fadeIn = setInterval(() => {
            if (musica.volume < 0.6) {
                musica.volume = Math.min(0.6, musica.volume + 0.05);
            } else {
                clearInterval(fadeIn);
            }
        }, 150);

    }).catch(() => {
        // Si el navegador bloquea el autoplay (raro tras un clic),
        // igual mostramos el botón para que el usuario la active manualmente.
        botonMusica.classList.remove("oculto");
        botonMusica.classList.add("mostrar");
    });
}

botonMusica.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        botonMusica.textContent = "🔊";
    } else {
        musica.pause();
        botonMusica.textContent = "🔇";
    }
});

//=========================================
// LUCIÉRNAGAS QUE SIGUEN EL MOUSE / TOQUE
//=========================================

const esTactil = window.matchMedia("(pointer: coarse)").matches;

let ultimoSpawnCursor = 0;
const intervaloSpawnCursor = 40; // ms entre luciérnagas, evita saturar

function crearFireflyCursor(x, y) {
    const f = document.createElement("div");
    f.className = "cursor-firefly";

    // pequeña variación aleatoria para que no salgan siempre iguales
    f.style.left = (x - 3 + (Math.random() * 6 - 3)) + "px";
    f.style.top = (y - 3 + (Math.random() * 6 - 3)) + "px";

    document.body.appendChild(f);

    setTimeout(() => f.remove(), 900);
}

if (!esTactil) {

    // ===== PC: luciérnagas al arrastrar el mouse =====
    document.addEventListener("mousemove", (e) => {

        const ahora = Date.now();

        if (ahora - ultimoSpawnCursor > intervaloSpawnCursor) {
            crearFireflyCursor(e.clientX, e.clientY);
            ultimoSpawnCursor = ahora;
        }

    });

} else {

    // ===== Móvil: luciérnagas al tocar la pantalla =====
    document.addEventListener("touchstart", (e) => {

        const touch = e.touches[0];
        if (touch) crearFireflyCursor(touch.clientX, touch.clientY);

    }, { passive: true });

    document.addEventListener("touchmove", (e) => {

        const ahora = Date.now();
        const touch = e.touches[0];

        if (touch && ahora - ultimoSpawnCursor > intervaloSpawnCursor) {
            crearFireflyCursor(touch.clientX, touch.clientY);
            ultimoSpawnCursor = ahora;
        }

    }, { passive: true });

}

//=========================================
// CREAR MÚLTIPLES GIRASOLES (RAMO)
//=========================================

function crearFlorHTML() {
    return `
        <div class="flower">
            <div class="center"></div>
            <div class="petal p1"></div>
            <div class="petal p2"></div>
            <div class="petal p3"></div>
            <div class="petal p4"></div>
            <div class="petal p5"></div>
            <div class="petal p6"></div>
            <div class="petal p7"></div>
            <div class="petal p8"></div>
            <div class="petal p9"></div>
            <div class="petal p10"></div>
            <div class="petal p11"></div>
            <div class="petal p12"></div>
        </div>
        <div class="stem"></div>
        <div class="leaf left"></div>
        <div class="leaf right"></div>
    `;
}

function crearJardin() {

    const contenedor = document.getElementById("flowers");
    contenedor.innerHTML = "";

    const semillaGlow = document.getElementById("semillaGlow");
    const cieloNocturno = document.getElementById("cieloNocturno");

    const totalFlores = 15;
    const disposicion = [];

    // Generamos un abanico: todas las flores nacen del mismo punto
    // en la base, pero se abren en distintos ángulos, como un ramo.
    for (let i = 0; i < totalFlores; i++) {

        const t = i / (totalFlores - 1);          // 0 → 1
        const angulo = -55 + t * 110;              // -55° a 55°
        const jitterAngulo = (Math.random() * 10 - 5);
        const anguloFinal = angulo + jitterAngulo;

        // Las flores cercanas al centro (ángulo ~0) son más grandes,
        // las de los extremos más pequeñas, como en un ramo real.
        const cercaniaCentro = 1 - Math.abs(angulo) / 55;
        const escala = 0.55 + cercaniaCentro * 0.75 + (Math.random() * 0.1 - 0.05);

        // Brotan del centro hacia afuera
        const delay = Math.abs(i - (totalFlores - 1) / 2) * 0.08;

        // pequeña variación en la altura del punto de nacimiento
        const jitterY = Math.random() * 14 - 7;

        disposicion.push({
            rot: anguloFinal,
            s: escala,
            delay: delay,
            jitterY: jitterY
        });
    }

    // breve instante en oscuridad total antes de que asome la primera semilla
    const retrasoAmbiente = 500;

    // cuánto tiempo se queda visible la semilla antes de empezar a crecer
    const duracionSemilla = 3000;

    // 🌱→🌌 Justo cuando empieza a asomar la primera semilla, su luz "revela"
    // el resto de la escena: se enciende el resplandor, aparece el cielo
    // con las estrellas, y salen las luciérnagas.
    setTimeout(() => {

        if (semillaGlow) semillaGlow.classList.add("activo");
        if (cieloNocturno) cieloNocturno.classList.remove("oculto");

        crearLuciernagas();

    }, retrasoAmbiente);

    let maxTiempoFinal = 0;

    disposicion.forEach((flor) => {

        // Variables de posición compartidas por la semilla y la planta
        const rot = flor.rot + "deg";
        const baseBottom = `calc(10% + ${flor.jitterY}px)`;
        const zBase = Math.round(flor.s * 10);

        // 🌱 Contenedor de la semilla (hermano de .plant, comparte su posición
        // y rotación, pero no hereda el scaleY(0) inicial de la planta)
        const semillaWrap = document.createElement("div");
        semillaWrap.classList.add("semilla-wrap");
        semillaWrap.style.setProperty("--rot", rot);
        semillaWrap.style.setProperty("--s", flor.s);
        semillaWrap.style.setProperty("--z", zBase);
        semillaWrap.style.setProperty("--baseBottom", baseBottom);
        semillaWrap.innerHTML = `<div class="semilla"></div>`;

        // 🌻 La planta completa (tallo, hojas y flor)
        const plant = document.createElement("div");
        plant.classList.add("plant");
        plant.style.setProperty("--rot", rot);
        plant.style.setProperty("--s", flor.s);
        plant.style.setProperty("--z", zBase);
        plant.style.setProperty("--delay", flor.delay + "s");
        plant.style.setProperty("--baseBottom", baseBottom);
        plant.style.setProperty("--vientoDur", (3.4 + Math.random() * 1.6) + "s");
        plant.style.setProperty("--vientoDelay", (2.8 + Math.random() * 0.6) + "s");
        plant.innerHTML = crearFlorHTML();

        contenedor.appendChild(semillaWrap);
        contenedor.appendChild(plant);

        const tiempoSemilla = retrasoAmbiente + flor.delay * 1000;
        const tiempoCrecer = tiempoSemilla + duracionSemilla;

        // 🌱 primero asoma la semilla
        setTimeout(() => {
            semillaWrap.classList.add("semilla-visible");
        }, tiempoSemilla);

        // 🌻 y de ahí se retira la semilla y brota la flor completa
        setTimeout(() => {
            semillaWrap.classList.remove("semilla-visible");
            plant.classList.add("grow");
        }, tiempoCrecer);

        // ~3.4s es lo que tarda esa flor en terminar de abrir sus pétalos
        // (transición del tallo + transición de los pétalos con su propio delay)
        const tiempoFinDeEstaFlor = tiempoCrecer + 2200 + 1200;
        if (tiempoFinDeEstaFlor > maxTiempoFinal) {
            maxTiempoFinal = tiempoFinDeEstaFlor;
        }

    });

    // Cuando ya terminó de florecer todo el ramo, aparece el mensaje final
    // y la iluminación de la semilla se apaga lentamente, dejando solo
    // el cielo estrellado.
    setTimeout(() => {
        mostrarMensajeFinal();

        if (semillaGlow) {
            semillaGlow.classList.remove("activo");
        }
    }, maxTiempoFinal + 500);

}

//=========================================
// CREAR LUCIÉRNAGAS
//=========================================

function crearLuciernagas() {
    const contenedor = document.getElementById("fireflies");
    if (!contenedor || contenedor.childElementCount > 0) return;

    for (let i = 0; i < 18; i++) {
        const luciernaga = document.createElement("span");
        luciernaga.classList.add("firefly");

        luciernaga.style.left = Math.random() * 100 + "%";
        luciernaga.style.top = (30 + Math.random() * 55) + "%";

        luciernaga.style.setProperty("--dx", (Math.random() * 60 - 30) + "px");
        luciernaga.style.setProperty("--dy", (Math.random() * 60 - 30) + "px");
        luciernaga.style.setProperty("--dur", (4 + Math.random() * 5) + "s");

        luciernaga.style.animationDelay = (Math.random() * 6) + "s";

        contenedor.appendChild(luciernaga);
    }
}

//=========================================
// MOSTRAR MENSAJE FINAL
//=========================================

function mostrarMensajeFinal() {
    const mensaje = document.getElementById("mensajeFinal");
    if (!mensaje) return;

    mensaje.classList.remove("oculto");
    mensaje.classList.add("mostrar");
}