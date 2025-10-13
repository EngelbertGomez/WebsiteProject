document.addEventListener("DOMContentLoaded", () => {
  console.log("register.js cargado correctamente");

  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos al backend o localStorage
    alert(`Bienvenido, ${name}! Tu cuenta fue registrada correctamente.`);

    form.reset();
  });
});
