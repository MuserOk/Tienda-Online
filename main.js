import { CREDENCIALES } from './config.js';
document.getElementById('formLogin').addEventListener('submit', async(e) => {
    e.preventDefault();

    const usuario = document.getElementById('inputUsuario').value;
    const contraseña = document.getElementById('inputPassword').value; // Corregí el nombre de la variable (tenías un typo)

    if (!usuario || !contraseña) {
        alert('Por favor, complete todos los campos para iniciar sesión');
        return;
    }

    try {
        // 1. Buscar Token
        const respuesta = await fetch('https://funval-backend.onrender.com/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre_usuario: usuario,
                contraseña: contraseña
            })
        });

        // 2. Manejar respuesta
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        const token = data.access_token;
        console.log("Token recibido:", token);

        // 3. Guardar Token en cookies (24 horas)
        const fechaExpiracion = new Date();
        fechaExpiracion.setTime(fechaExpiracion.getTime() + (24 * 60 * 60 * 1000)); // Corregí el cálculo (faltaba un 0)
        document.cookie = `token=${token}; expires=${fechaExpiracion.toUTCString()}; path=/; Secure; SameSite=Strict`;

        const esAdmin = usuario === CREDENCIALES.USUARIO;

        actualizarInterfaz(usuario, esAdmin);

        document.getElementById('modalLogin').classList.add('hidden');
        // 4. Feedback al usuario
        alert('¡Bienvenido administrador Administrador!');
        document.getElementById('modalLogin').classList.add('hidden'); // Cerrar modal


        // 5. Redirigir o actualizar interfaz
        // window.location.href = '/admin'; // Opcional: redirección

    } catch (error) {
        console.error("Error en la petición:", error);
        alert(error.message || 'Error al conectar con el servidor');
    }
});

const menu = document.getElementById('mobileMenu');
const btnMenu = document.getElementById('btnMenu');
const botonesLogin = document.querySelectorAll('.abrirModalLogin');
const modalLogin = document.getElementById('modalLogin');
const btnCerrarModal = document.getElementById('cerrarModal');

// Toggle para abrir/cerrar desde el botón
btnMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');

});

// Cierra el menú al hacer clic en cualquier enlace dentro de él
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');

    });
});

// Cierra el menú si se hace clic fuera de él
document.addEventListener('click', (e) => {
    const isClickInside = menu.contains(e.target) || btnMenu.contains(e.target);
    if (!isClickInside) {
        menu.classList.add('hidden');
    }
});

botonesLogin.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        modalLogin.classList.remove('hidden');
    });
});

if (btnCerrarModal && modalLogin) {
    btnCerrarModal.addEventListener('click', () => {
        modalLogin.classList.add('hidden');

        // Opcional: Limpiar formulario al cerrar
        const formulario = document.getElementById('formLogin');
        if (formulario) formulario.reset();
    });
} else {
    console.warn('Botón cerrar modal no encontrado');
}

function actualizarInterfaz(usuario, esAdmin) {
    // Mostrar nombre de usuario
    const h5Usuario = document.getElementById('nombreUsuario');
    if (h5Usuario) {
        h5Usuario.textContent = usuario;
        h5Usuario.classList.remove('hidden');
    }

    // Mostrar opción de admin si corresponde
    document.querySelectorAll('.menuAdmAgregarProd').forEach(elemento => {
        if (esAdmin) {
            elemento.classList.remove('hidden');
        } else {
            elemento.classList.add('hidden');
        }
    });
}