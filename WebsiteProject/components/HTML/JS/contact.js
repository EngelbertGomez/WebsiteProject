document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const mensajeEnviado = document.getElementById("mensajeEnviado");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Simula un envío real
      setTimeout(() => {
        mensajeEnviado.style.display = "block";
        form.reset();
      }, 500);
    });
  });
  