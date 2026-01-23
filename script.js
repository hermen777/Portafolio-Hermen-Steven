/* ================= REVEAL & DIM ================= */
const sections = document.querySelectorAll("section");

function handleScrollEffects() {
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (section.classList.contains("reveal")) {
            if (rect.top < windowHeight - 150 && rect.bottom > 150) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        }

        if (rect.bottom < windowHeight * 0.35) {
            section.classList.add("dim");
        } else {
            section.classList.remove("dim");
        }
    });
}

window.addEventListener("scroll", handleScrollEffects);
handleScrollEffects();

/* ================= CARRUSEL INFINITO ================= */
const track = document.querySelector(".carousel-track");
let items = Array.from(track.children);
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 1;
let moving = false;

/* Clones */
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

items = Array.from(track.children);
track.style.transform = "translateX(-100%)";

function moveCarousel() {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
    if (moving) return;
    moving = true;
    index++;
    moveCarousel();
});

prevBtn.addEventListener("click", () => {
    if (moving) return;
    moving = true;
    index--;
    moveCarousel();
});

track.addEventListener("transitionend", () => {
    if (items[index] === firstClone) {
        track.style.transition = "none";
        index = 1;
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (items[index] === lastClone) {
        track.style.transition = "none";
        index = items.length - 2;
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    moving = false;
});




/* ================= FORM CONTACTO → GOOGLE SHEETS ================= */

/* ================= FORM CONTACTO ================= */

const form = document.querySelector(".contact form");
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzGQBuNMstl0k1izjAI0eIfETjrPmYaItFEluUk7eGLAI80l8Jm_5tJDWGvYKAujdw/exec";

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.querySelector('input[type="text"]').value;
    const correo = form.querySelector('input[type="email"]').value;
    const mensaje = form.querySelector("textarea").value;

    const data = new FormData();
    data.append("nombre", nombre);
    data.append("correo", correo);
    data.append("mensaje", mensaje);

    fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: data
    })
    .then(res => res.text())
    .then(text => {
        if (text === "ok") {
            alert("Mensaje enviado correctamente ✔️");
            form.reset();
        } else {
            alert("Error al enviar el mensaje");
        }
    })
    .catch(err => {
        alert("No se pudo enviar el mensaje");
        console.error(err);
    });
});
