// Tarjetas de productos

const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuButton.classList.toggle('open');
});

const cards = document.querySelectorAll(".product-card");

// Función para interpolar entre dos colores (hex → rgb)
function interpolateColor(color1, color2, factor) {
  const c1 = [
    parseInt(color1.substr(1, 2), 16),
    parseInt(color1.substr(3, 2), 16),
    parseInt(color1.substr(5, 2), 16)
  ];
  const c2 = [
    parseInt(color2.substr(1, 2), 16),
    parseInt(color2.substr(3, 2), 16),
    parseInt(color2.substr(5, 2), 16)
  ];

  const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

// Scroll event listener
window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();

    // Ratio entre 0 (arriba de la pantalla) y 1 (abajo de la pantalla)
    let ratio = rect.top / window.innerHeight;
    ratio = Math.max(0, Math.min(1, ratio));

    // Calculamos el color interpolado
    const color = interpolateColor("#ff6f00", "#1f004d", ratio);

    // Asignacion a variable CSS
    card.style.setProperty("--hover-color", color);
  });
});


