import { obtenerToken } from "./accCookies";

//para acceder a los datos del cliente en la api :)
//verificar si logré obtenerlo de la cookies
const miToken = obtenerToken();

if (miToken) {
    console.log("Token recuperado de cookies ");

} else {
    console.log("No se encontró el token en las cookies.");
}