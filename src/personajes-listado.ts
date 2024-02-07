import { Personaje } from "./personajes-listado.model";
import { obtenerPersonajes } from "./personajes-listado-api";
import {crearContenedorPersonaje} from "./personajes-listado.helper";

const pintarPersonajes = async (): Promise<void> => {
    const personajes = await obtenerPersonajes();
    const listado = document.querySelector("#listado-personajes");
    if (listado && listado instanceof HTMLDivElement) {
        personajes.forEach((personaje) =>{
            const contenedorPersonaje = crearContenedorPersonaje(personaje);
            listado.appendChild(contenedorPersonaje);
        });
    } else {
        throw new Error ("No se ha encontrado el contenedor del listado");
    }
};

const input = document.querySelector("#introducir-nombre") as HTMLInputElement;
const button = document.querySelector("#boton-filtrar");

const filtrarPersonajes = async (name: string): Promise<void> => {
    try {
        const personajes = await obtenerPersonajes();
        const filtarNombres = personajes.filter(personaje =>
            personaje.nombre.toLowerCase().includes(name.toLowerCase())
        );
        pintarPersonajesFiltrados(filtarNombres);
    } catch (error) {
        console.error("Error al filtrar los personajes:", error);
    }
};

const pintarPersonajesFiltrados = (personajes: Personaje[]): void => {
    const listado = document.querySelector("#listado-personajes");
    if (listado && listado instanceof HTMLDivElement) {
        listado.innerHTML = "";
        personajes.forEach(personaje => {
            const contenedorPersonaje = crearContenedorPersonaje(personaje);
            listado.appendChild(contenedorPersonaje);
        });
    } else {
        throw new Error("No se ha encontrado el contenedor del listado");
    }
};

if (input && button) {
    button.addEventListener('click', () => {
        const buscarPersonaje = input.value.trim();
        filtrarPersonajes(buscarPersonaje);
    });
} else {
    console.error('No se encontraron los elementos input o button.');
}

document.addEventListener("DOMContentLoaded", pintarPersonajes);
