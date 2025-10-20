document.addEventListener("DOMContentLoaded", () => {
  console.log("register.js cargado correctamente");

  const form = document.getElementById("registerForm");
  // ¡ATENCIÓN! Cambié el endpoint de 'clients' a 'clientes' 
  // para que coincida con la convención de nombres en español (si tu ClientController usa '/api/clientes').
  // Verifica el path en tu ClientController de Spring Boot.
  const URL_BACKEND_REGISTRO = "http://localhost:8080/api/clientes/register"; 

  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const accountType = form.accountType.value;
      const cedula = form.cedula.value.trim();
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const celular = form.celular.value.trim();
      const password = form.password.value; // Ya disponible en el HTML actualizado
      const confirmPassword = form.confirmPassword.value;
      
      // Campos condicionales
      const rnc = form.rnc ? form.rnc.value.trim() : null;
      const numEmpleado = form.numEmpleado ? form.numEmpleado.value.trim() : null;

      if (password !== confirmPassword) {
          // Usamos una notificación en lugar de alert()
          console.error("Las contraseñas no coinciden.");
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
          password: password, // <-- ¡AÑADIDO! Esto es fundamental para la seguridad y el registro
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

          // Aseguramos que la respuesta tenga JSON, incluso si es un error HTTP
          let result = {};
          try {
            result = await response.json();
          } catch (e) {
            // Si no es JSON (ej: un error 500 HTML), usamos un mensaje genérico
            console.error('Respuesta no es JSON:', response);
            result.message = "Respuesta no JSON del servidor. Revisa el backend.";
          }

          if (response.ok) {
              // Registro exitoso
              alert(`¡Bienvenido, ${nombre}! Tu cuenta fue registrada con éxito. Redirigiendo...`);
              // Redirigir al login
              window.location.href = "login-form.html"; 
          } else {
              // Error del servidor o validación
              alert(`Error en el registro: ${result.message || response.statusText}`);
          }
      } catch (error) {
          console.error('Error de conexión con el servidor:', error);
          alert("Error de conexión con el servidor. Intenta de nuevo más tarde.");
      }

      form.reset();
  });
});