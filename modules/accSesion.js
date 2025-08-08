export function logearse(actualizarInterfaz) {

    const formLogin = document.getElementById('formLogin');
    if (!formLogin) {
        console.error("Elemento 'formLogin' no encontrado.");
        return;
    }

    formLogin.addEventListener('submit', async(e) => {
        e.preventDefault();

        const usuario = document.getElementById('inputUsuario').value;
        const contraseña = document.getElementById('inputPassword').value;

        if (!usuario || !contraseña) {
            alert('Por favor, complete todos los campos para iniciar sesión');
            return;
        }

        try {

            const respuesta = await fetch('https://funval-backend.onrender.com/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre_usuario: usuario,
                    contraseña: contraseña
                })
            });

            if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}, error de acceso a la base de datos.`);

            const data = await respuesta.json();
            const token = data.access_token;
            console.log("Token recibido:", token);

            const fechaExpiracion = new Date();
            fechaExpiracion.setTime(fechaExpiracion.getTime() + (24 * 60 * 60 * 1000));
            document.cookie = `token=${token}; expires=${fechaExpiracion.toUTCString()}; path=/; Secure; SameSite=Strict`;

            const esAdmin = data.rol === 'admin'; //ver en la api

            actualizarInterfaz(usuario, esAdmin);

            alert(esAdmin ? '¡Bienvenido administrador!' : `¡Bienvenido ${usuario}!`);

            document.getElementById('modalLogin').classList.add('hidden');
            formLogin.reset();

        } catch (error) {
            console.error("Error en la petición:", error);
            alert(error.message || 'Error al conectar con el servidor');
        }
    });
}