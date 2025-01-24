const thumbnails = document.querySelectorAll(".thumbnail");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeModalBtn = document.getElementById("close-btn");
const centralImage = document.getElementById("central-image");
const centralCover = document.getElementById("central-cover");
const finalImage = document.getElementById("final-image");
const centralText = document.getElementById("central-text");
const finalText = document.getElementById("final-text");
const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");

let seenImages = new Set();

// Evento: Abrir modal al tocar una miniatura
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    const [hiddenImg, visibleImg] = thumbnail.querySelectorAll("img");
    // Cambia las clases para mostrar la imagen oculta
    hiddenImg.classList.add("open");
    visibleImg.classList.remove("open");

    const imgSrc = thumbnail.querySelector("img").src;
    modalImage.src = imgSrc;
    modal.style.display = "flex";
    // Marca la imagen como vista
    thumbnail.classList.add("seen");
    seenImages.add(index);

    // Verifica si todas las imágenes han sido vistas
    if (seenImages.size === thumbnails.length) {
      let opacity = 1; // Inicializamos la opacidad en 1 (completamente visible)

      const fadeOut = setInterval(() => {
        opacity -= 0.005; // Reducimos la opacidad en pequeños pasos (ajusta este valor según la velocidad deseada)
        const inverseOpacity = 1 - opacity; // Incrementar la opacidad del segundo elemento
        if (opacity <= 0) {
          opacity = 0; // Asegúrate de que no sea menor a 0
          centralImage.remove();
          centralCover.remove();
          centralText.remove();
          finalText.style.position = "relative";
          clearInterval(fadeOut); // Detenemos el intervalo cuando la opacidad llegue a 0

          // Opcional: Ocultamos el elemento completamente
        }
        centralImage.style.opacity = opacity; // Actualizamos la opacidad
        finalImage.style.opacity = inverseOpacity;
        centralText.style.opacity = opacity;
        finalText.style.opacity = inverseOpacity;
      }, 25); // Intervalo de tiempo entre cada paso (ajusta según sea necesario)
    }
  });
});

// Evento: Abrir modal con final-image
finalImage.addEventListener("click", () => {
  modalImage.src = finalImage.src;
  modal.style.display = "flex";
});

// Evento: Cerrar modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Función para reproducir audio
function playAudio() {
  audio1.play();
  // Evento: Cuando termina el primer audio, inicia el segundo
  audio1.addEventListener("ended", () => {
    audio2.play();
  });
  // Evento: Cuando termina el segundo audio, vuelve al primero (bucle)
  audio2.addEventListener("ended", () => {
    audio1.play();
  });
}

// Inicia la reproducción de audio tras la interacción en cualquier parte
document.body.addEventListener("click", function startMusic() {
  playAudio();
  // Elimina este listener después de la primera interacción
  document.body.removeEventListener("click", startMusic);
});
