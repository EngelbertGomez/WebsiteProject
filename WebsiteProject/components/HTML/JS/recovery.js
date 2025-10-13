document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').classList.add('fade-in-up');
    const form = document.getElementById('recoveryForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = document.getElementById('email').value.trim();
  
      if (!validateEmail(email)) {
        showAlert('Por favor, introduce un correo válido.');
        return;
      }
  
      // Aquí puedes conectar con tu API o backend
      try {
        // Simulación de solicitud de recuperación
        await fakeRecoveryRequest(email);
  
        showAlert('Se ha enviado un enlace de recuperación a tu correo.', true);
        form.reset();
      } catch (error) {
        showAlert('Hubo un problema al enviar el enlace. Intenta de nuevo.');
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
  
    async function fakeRecoveryRequest(email) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Enviando correo de recuperación a: ${email}`);
          resolve();
        }, 1000); // Simula red
      });
    }
  });
  