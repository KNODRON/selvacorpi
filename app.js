const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");
const botonCopiar = document.getElementById("copiar");
const botonLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");


const mapa = {

  // Minúsculas

  "s": "c",
  "c": "s",

  "e": "o",
  "o": "e",

  "l": "r",
  "r": "l",

  "v": "p",
  "p": "v",

  "a": "i",
  "i": "a",


  // Mayúsculas

  "S": "C",
  "C": "S",

  "E": "O",
  "O": "E",

  "L": "R",
  "R": "L",

  "V": "P",
  "P": "V",

  "A": "I",
  "I": "A",


  // Vocales con tilde

  "á": "í",
  "í": "á",

  "é": "ó",
  "ó": "é",

  "Á": "Í",
  "Í": "Á",

  "É": "Ó",
  "Ó": "É"
};


function traducir(texto) {

  return [...texto]
    .map(letra => mapa[letra] ?? letra)
    .join("");

}


function mostrarMensaje(texto) {

  mensaje.textContent = texto;
  mensaje.classList.add("visible");

  setTimeout(() => {
    mensaje.classList.remove("visible");
  }, 1800);

}


// Español → SELVA CORPI

entrada.addEventListener("input", () => {

  salida.value = traducir(entrada.value);

});


// SELVA CORPI → Español

salida.addEventListener("input", () => {

  entrada.value = traducir(salida.value);

});


botonCopiar.addEventListener("click", async () => {

  if (!salida.value.trim()) {

    mostrarMensaje("No hay texto para copiar");

    return;

  }

  try {

    await navigator.clipboard.writeText(salida.value);

    mostrarMensaje("Texto copiado");

  } catch {

    salida.select();
    document.execCommand("copy");

    mostrarMensaje("Texto copiado");

  }

});


botonLimpiar.addEventListener("click", () => {

  entrada.value = "";
  salida.value = "";

  entrada.focus();

});


if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker.register("service-worker.js");

  });

}
