export function obtenerToken() {
    const nombreCookie = "token=";
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        // Eliminar espacios en blanco al inicio
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        // Si se encuentra la cookie "token", devolver su valor
        if (cookie.indexOf(nombreCookie) === 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }
    // Si no se encuentra la cookie, devolver una cadena vacía o null
    return "";
}