document.addEventListener('DOMContentLoaded', () => {
  // 👉 Aplica animación de entrada al contenedor
  document.querySelector('.container').classList.add('fade-in-up');

  // 👉 Obtener elementos del formulario
  const form = document.querySelector('form');
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateEmail(email)) {
      showAlert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (password === '') {
      showAlert('Por favor, introduce tu contraseña.');
      return;
    }

    // 👉 Aquí iría tu llamada real al backend o API
    try {
      await fakeLoginRequest(email, password);
      showAlert('Inicio de sesión exitoso', true);

      // 🔁 Redirigir o hacer otra acción aquí después del login
      // window.location.href = '/dashboard.html';
    } catch (err) {
      showAlert('Usuario o contraseña incorrectos.');
    }
  });

  function validateEmail(email) {
    const regex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
    return regex.test(email);
  }

  function showAlert(message, success = false) {
    let existing = document.querySelector('.alert-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = `alert-message ${success ? 'success' : 'error'}`;
    msg.textContent = message;
    document.querySelector('.container').appendChild(msg);

    setTimeout(() => msg.remove(), 5000);
  }

  async function fakeLoginRequest(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Iniciando sesión con: ${email}`);
        // Simular éxito si email y password son no vacíos (solo ejemplo)
        if (email && password) {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  }
});
