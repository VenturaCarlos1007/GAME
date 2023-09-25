let temporizador;

// Arreglo de imágenes de las banderas. Este será el orden en que se mostrarán.
let places = [
    "eiffel.png", 
    "colosseum.jpg", 
    "statue-of-liberty.jpg", 
    "great-wall.jpg", 
    "sydney-opera-house.jpg",
    "taj-mahal.jpg","christ-the-redeemer.jpg", 
    "acropolis.jpg", 
    "pyramids-of-giza.jpg", 
    "machu-picchu.jpg"
];

let correcta = [1, 2, 3, 3, 3, 2, 3, 3, 0, 1];

// Arreglo que guardará los países o lugares a mostrar en cada jugada.
let opciones = [];
// Cargar en el arreglo opciones las opciones a mostrar en cada jugada.
opciones.push(["Rome, Italy", "Paris, France", "London, UK", "New York, USA"]);
opciones.push(["Athens, Greece", "Paris, France", "Rome, Italy", "London, UK"]);
opciones.push(["Paris, France", "London, UK", "Rome, Italy", "New York, USA"]);
opciones.push(["Bangkok, Thailand", "Seoul, South Korea", "Tokyo, Japan", "Beijing, China"]);
opciones.push(["Melbourne, Australia", "Auckland, New Zealand", "Wellington, New Zealand", "Sydney, Australia"]);
opciones.push(["Kolkata, India", "Mumbai, India", "Agra, India", "Delhi, India"]);
opciones.push(["Lima, Peru", "Buenos Aires, Argentina", "Sao Paulo, Brazil", "Rio de Janeiro, Brazil"]);
opciones.push(["Cairo, Egypt", "Rome, Italy", "Barcelona, Spain", "Athens, Greece"]);
opciones.push(["Cairo, Egypt", "Rome, Italy", "Barcelona, Spain", "Athens, Greece"]);
opciones.push(["Lima, Peru", "Cusco, Peru", "Bogotá, Colombia", "Quito, Ecuador"]);

// Arreglo de enunciados para las preguntas.
let enunciados = [
    "Where is the Eiffel Tower located?",
    "Where is the Colosseum located?",
    "Where is the Statue of Liberty located?",
    "Where is the Great Wall of China located?",
    "Where is the Sydney Opera House located?",
    "Where is the Taj Mahal located?",
    "Where is the Christ the Redeemer statue located?",
    "Where is the Acropolis located?",
    "Where is the Pyramids of Giza located?",
    "Where is the Machu Picchu located?"
];

// Variable que guarda la posición actual.
let posActual = 0;
// Variable que guarda la cantidad de respuestas correctas hasta el momento.
let cantidadAcertadas = 0;

function comenzarJuego() {
    // Reseteamos las variables.
    posActual = 0;
    cantidadAcertadas = 0;
    // Activamos las pantallas necesarias.
    document.getElementById("initial-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    cargarPlace();
}

// Función que carga la siguiente bandera y sus opciones.
function cargarPlace() {
    // Controlamos si se acabaron las banderas.
    if (places.length <= posActual) {
        terminarJuego();
    } else {
        // Limpiamos las clases que se asignaron.
        limpiarOpciones();

        // Actualizamos la imagen de la bandera.
        document.getElementById("imgPlaces").src = "img/" + places[posActual];

        // Actualizamos el enunciado de la pregunta.
        document.getElementById("pregunta").innerHTML = enunciados[posActual];

        // Actualizamos las opciones de respuesta.
        document.getElementById("n0").innerHTML = opciones[posActual][0];
        document.getElementById("n1").innerHTML = opciones[posActual][1];
        document.getElementById("n2").innerHTML = opciones[posActual][2];
        document.getElementById("n3").innerHTML = opciones[posActual][3];

        // Iniciamos el temporizador de 10 segundos.
        iniciarTemporizador();
    }
}
function iniciarTemporizador() {
    let tiempoRestante = 15; // 10 segundos inicialmente
    const temporizadorElement = document.getElementById("temporizador");

    temporizadorElement.textContent = tiempoRestante;

    temporizador = setInterval(function() {
        tiempoRestante--;
        if (tiempoRestante >= 0) {
            temporizadorElement.textContent = tiempoRestante;
        } else {
            clearInterval(temporizador);
            // Cuando se agote el tiempo, pasa automáticamente a la siguiente pregunta.
            posActual++;
            cargarPlace();
        }
    }, 1000); // Actualiza cada 1 segundo
}


function limpiarOpciones() {
    document.getElementById("n0").className = "nombre";
    document.getElementById("n1").className = "nombre";
    document.getElementById("n2").className = "nombre";
    document.getElementById("n3").className = "nombre";

    document.getElementById("l0").className = "letra";
    document.getElementById("l1").className = "letra";
    document.getElementById("l2").className = "letra";
    document.getElementById("l3").className = "letra";
}

function comprobarRespuesta(opElegida) {
    // Limpia el temporizador actual
    clearTimeout(temporizador);

    if (opElegida == correcta[posActual]) { // Acertó
        // Agregamos las clases para colocar el color verde a la opción elegida
        document.getElementById("n" + opElegida).className = "nombre nombreAcertada";
        document.getElementById("l" + opElegida).className = "letra letraAcertada";
        cantidadAcertadas++;
    } else { // No acertó
        // Agregamos las clases para colocar en rojo la opción elegida
        document.getElementById("n" + opElegida).className = "nombre nombreNoAcertada";
        document.getElementById("l" + opElegida).className = "letra letraNoAcertada";

        // Opción que era correcta
        document.getElementById("n" + correcta[posActual]).className = "nombre nombreAcertada";
        document.getElementById("l" + correcta[posActual]).className = "letra letraAcertada";
    }
    posActual++;
    // Esperamos 1 segundo y pasamos a mostrar la siguiente bandera y sus opciones.
    setTimeout(cargarPlace, 1000);
}


function terminarJuego() {
    // Ocultamos las pantallas y mostramos la pantalla final.
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("final-screen").style.display = "block";
    // Agregamos los resultados.
    document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
    document.getElementById("numIncorrectas").innerHTML = places.length - cantidadAcertadas;
}

function volverAlInicio() {
    // Ocultamos las pantallas y activamos la inicial.
    document.getElementById("final-screen").style.display = "none";
    document.getElementById("initial-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
}

// Llamamos a comenzarJuego al cargar la página (opcional).
