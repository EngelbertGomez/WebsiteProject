document.addEventListener("DOMContentLoaded", () => {
  console.log("register.js cargado correctamente");

  const form = document.getElementById("registerForm");
  const URL_BACKEND_REGISTRO = "http://localhost:8080/api/clients/register"; // <-- 💡 DEFINIR URL DEL BACKEND

  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const accountType = form.accountType.value;
      const cedula = form.cedula.value.trim();
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const celular = form.celular.value.trim();
      const password = form.password.value;
      const confirmPassword = form.confirmPassword.value;
      
      // Campos condicionales
      const rnc = form.rnc ? form.rnc.value.trim() : null;
      const numEmpleado = form.numEmpleado ? form.numEmpleado.value.trim() : null;

      if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden. Por favor, revísalas.");
          return;
      }

      // 1. Construir el objeto de datos
      const userData = {
          accountType: accountType,
          cedula: cedula,
          nombre: nombre,
          email: email,
          celular: celular,
          password: password,
          // Incluir solo los campos relevantes según el tipo de cuenta
          ...(accountType === 'negocios' && { rnc: rnc }),
          ...(accountType === 'admin' && { numEmpleado: numEmpleado })
      };

      // 2. Enviar los datos al backend (Spring Boot)
      try {
          const response = await fetch(URL_BACKEND_REGISTRO, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
          });

          const result = await response.json();

          if (response.ok) {
              // Registro exitoso
              alert(`¡Bienvenido, ${nombre}! Tu cuenta fue registrada con éxito. Redirigiendo al inicio de sesión...`);
              // Redirigir al login
              window.location.href = "login-form.html"; 
          } else {
              // Error del servidor o validación (ej: email duplicado)
              // El backend debería devolver un mensaje de error útil
              alert(`Error en el registro: ${result.message || 'Ocurrió un error desconocido.'}`);
          }
      } catch (error) {
          console.error('Error al enviar el formulario:', error);
          alert("Error de conexión con el servidor. Intenta de nuevo más tarde.");
      }

      form.reset();
  });
});