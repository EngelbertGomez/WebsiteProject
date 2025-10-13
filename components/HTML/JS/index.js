document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const buttons = document.querySelectorAll(".btn");
  const links = document.querySelectorAll(".additional-links a");

  // Añadir clase para animar la entrada del contenedor (fade-in + subir)
  container.classList.add("fade-in-up");

  // Animar botones al hover (opcional: escalado con JS para más control)
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.transition = "transform 0.3s ease";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });

  // Animar links al hover (cambio de color con JS)
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.color = "#ff6f00";
      link.style.transition = "color 0.3s ease";
    });
    link.addEventListener("mouseleave", () => {
      link.style.color = "#9b00ff";
    });
  });
});
