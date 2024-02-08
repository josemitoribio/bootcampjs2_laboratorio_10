import { Personaje } from "./personajes-listado.model";
import { obtenerPersonajes, filtrarPersonajes } from "./personajes-listado-api";
import { crearContenedorPersonaje } from "./personajes-listado.helper";

const pintarPersonajes = async (): Promise<void> => {
    try {
        const personajes = await obtenerPersonajes();
        const listado = document.querySelector("#listado-personajes");
        if (listado) {
            listado.innerHTML = ""; // Limpiamos el contenedor antes de pintar los personajes
            personajes.forEach((personaje) => {
                const contenedorPersonaje = crearContenedorPersonaje(personaje);
                listado.appendChild(contenedorPersonaje);
            });
        } else {
            throw new Error("No se ha encontrado el contenedor del listado");
        }
    } catch (error) {
        console.error("Error al obtener y pintar los personajes:", error);
    }
};

document.addEventListener("DOMContentLoaded", pintarPersonajes);

export const pintarPersonajesFiltrados = (personajes: Personaje[]): void => {
    const listado = document.querySelector("#listado-personajes");
    if (listado) {
        listado.innerHTML = "";
        personajes.forEach(personaje => {
            const contenedorPersonaje = crearContenedorPersonaje(personaje);
            listado.appendChild(contenedorPersonaje);
        });
    } else {
        throw new Error("No se ha encontrado el contenedor del listado");
    }
};

const inputElement = document.querySelector("#introducir-nombre");
const buttonElement = document.querySelector("#boton-filtrar");

if (inputElement !== null && inputElement !== undefined && buttonElement !== null && buttonElement !== undefined) {
    buttonElement.addEventListener('click', async () => {
        if (inputElement instanceof HTMLInputElement) {
            const buscarPersonaje = inputElement.value.trim();
            try {
                const personajesFiltrados = await filtrarPersonajes(buscarPersonaje);
                pintarPersonajesFiltrados(personajesFiltrados); 
            } catch (error) {
                console.error("Error al filtrar los personajes:", error);
            }
        } else {
            console.error("El elemento input no es un HTMLInputElement.");
        }
    });
} else {
    console.error("No se encontró el elemento input o el elemento button.");
}
