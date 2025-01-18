const thumbnails = document.querySelectorAll(".thumbnail");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeModalBtn = document.getElementById("close-btn");
const centralImage = document.getElementById("central-image");
const finalMessage = document.getElementById("final-message");
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
      setTimeout(() => {
        centralImage.style.opacity = 0;
        finalMessage.style.display = "block";
      }, 10000); // Espera 10 segundo antes de mostrar el mensaje
    }
  });
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