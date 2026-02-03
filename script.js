/* ================= CARD REVEAL (SECUENCIAL) ================= */

const delayedCards = document.querySelectorAll(".reveal-delay");

const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, index * 2200);
                cardObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.4 }
);

delayedCards.forEach(card => cardObserver.observe(card));


/* ================= FORM CONTACTO → GOOGLE SHEETS ================= */

const form = document.querySelector(".contact-premium form");

if (form) {
    const GOOGLE_SHEET_URL =
        "https://script.google.com/macros/s/AKfycbzGQBuNMstl0k1izjAI0eIfETjrPmYaItFEluUk7eGLAI80l8Jm_5tJDWGvYKAujdw/exec";

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const data = new FormData(form);
        
        fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            body: data,
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
}


/* ================= MAGNETIC BUTTON EFFECT ================= */

const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach(btn => {
    const strength = 0.35; // fuerza magnética (ajustable)

    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
    });
});
