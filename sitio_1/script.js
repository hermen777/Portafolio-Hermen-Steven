// Navbar + efecto profesional de opacidad del video
window.addEventListener('scroll', () => {

  const scrollY = window.scrollY;
  const nav = document.getElementById('navbar');
  const overlay = document.getElementById('heroOverlay');

  // Navbar
  nav.classList.toggle('scrolled', scrollY > 80);

  // Oscurecer video progresivamente
  const maxScroll = 500;
  const opacity = Math.min(scrollY / maxScroll, 0.6);
  overlay.style.background = `rgba(0,0,0,${0.35 + opacity})`;

});

// Formulario
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Gracias por escribirnos. Te responderemos pronto.');
  e.target.reset();
});


const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGQBuNMstl0k1izjAI0eIfETjrPmYaItFEluUk7eGLAI80l8Jm_5tJDWGvYKAujdw/exec";

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch(SCRIPT_URL, {
    method: "POST",
    body: formData
  })
  .then(() => {
    alert("Gracias por escribirnos. Te responderemos pronto.");
    form.reset();
  })
  .catch(() => {
    alert("Error al enviar el mensaje.");
  });
});
