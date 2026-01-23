/* ===== ANIMACIONES SECCIONES ===== */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(80px)";
    section.style.transition = "1.2s ease";
    observer.observe(section);
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 80);
});

/* ===== MENÚ INFINITO ESTABLE ===== */
const track = document.getElementById("menuTrack");

// esperar a que el layout exista
window.addEventListener("load", () => {

    const cards = Array.from(track.children);

    // clonar set completo
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let position = 0;
    const speed = 0.35;

    // ancho REAL del set original
    const totalWidth = cards.reduce((acc, card) => {
        return acc + card.offsetWidth + 40;
    }, 0);

    function animate() {
        position -= speed;

        if (Math.abs(position) >= totalWidth) {
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    animate();
});
