<script>
// --- Script carrito ---
function actualizarTotal() {
  let total = 0;
  document.querySelectorAll(".cart-item").forEach(item => {
    const price = parseFloat(item.querySelector(".price").textContent.replace("$", ""));
    const qty = parseInt(item.querySelector(".quantity").textContent);
    total += price * qty;
  });
  document.getElementById("total").textContent = "$" + total.toFixed(2);
}

document.querySelectorAll(".increase").forEach(btn => {
  btn.addEventListener("click", () => {
    const qtyElem = btn.parentElement.querySelector(".quantity");
    qtyElem.textContent = parseInt(qtyElem.textContent) + 1;
    actualizarTotal();
  });
});

document.querySelectorAll(".decrease").forEach(btn => {
  btn.addEventListener("click", () => {
    const qtyElem = btn.parentElement.querySelector(".quantity");
    let qty = parseInt(qtyElem.textContent);
    if (qty > 1) {
      qtyElem.textContent = qty - 1;
      actualizarTotal();
    }
  });
});

document.querySelectorAll(".remove-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.remove();
    actualizarTotal();
  });
});

document.querySelector(".checkout-btn")


.addEventListener("click", () => {
  alert("¡Gracias por tu compra! 🛒");
});
</script>