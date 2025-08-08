import { obtenerProductos } from './modules/productos.js';
import { logearse } from './modules/accSesion.js';
import { setupMenu } from './modules/menu.js';

export { actualizarInterfaz };


function cerrarSesion() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    location.reload();

    /*
    const botonesLogout = document.querySelectorAll('.cerrarSesion');
    botonesLogout.forEach(boton => {
        boton.textContent = 'Iniciar Sesión';
        boton.classList.replace('cerrarSesion', 'abrirModalLogin');
    });

    document.getElementById('nombreUsuario').classList.add('hidden');
    document.getElementById('interfazInicial').classList.remove('hidden');
    document.getElementById('interfazAdministrador').classList.add('hidden');

    alert('Sesión cerrada correctamente');
    */
}


function actualizarInterfaz(usuario, esAdmin) {

    const etiquetaUsuario = document.getElementById('nombreUsuario');
    if (etiquetaUsuario) {
        etiquetaUsuario.textContent = usuario;
        etiquetaUsuario.classList.remove('hidden');
    }

    document.querySelectorAll('.abrirModalLogin').forEach(boton => {
        boton.textContent = 'Cerrar Sesión';
        boton.classList.replace('abrirModalLogin', 'cerrarSesion');
    });

    document.getElementById('interfazAdministrador').classList.toggle('hidden', !esAdmin);
    document.getElementById('interfazInicial').classList.toggle('hidden', esAdmin);
}

// EVENTOS 
obtenerProductos();
logearse(actualizarInterfaz);
setupMenu();

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cerrarSesion')) {
        e.preventDefault();
        cerrarSesion();
    }
    if (e.target.classList.contains('abrirModalLogin')) {
        e.preventDefault();
        document.getElementById('modalLogin').classList.remove('hidden');
    }
});

const btnCerrarModal = document.getElementById('cerrarModal');
if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', () => {
        document.getElementById('modalLogin').classList.add('hidden');
        document.getElementById('formLogin').reset();
    });
}