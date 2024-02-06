import { Personaje } from "./personajes-listado.model";
import { obtenerPersonajes } from "./personajes-listado-api";

const crearElementoImagen = (
    imagen: string, 
    nombre:string
    ): HTMLImageElement => {
        const urlCompleta = `http://localhost:3000/${imagen}`;

        
        const imagenUrl = document.createElement("img");
        imagenUrl.src = urlCompleta;
        imagenUrl.alt = nombre;
        return imagenUrl;
}

const crearElementoParrafo = (texto: string) : HTMLParagraphElement => {
    const parrafo = document.createElement("p");
    parrafo.textContent = texto;
    return parrafo;
}

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
    const elementoPersonaje = document.createElement ("div");
    elementoPersonaje.classList.add("personaje-contenedor");

    const imagen = crearElementoImagen(personaje.imagen , personaje.nombre);
    elementoPersonaje.appendChild(imagen);

    const nombre = crearElementoParrafo("Nombre: " + personaje.nombre);
    elementoPersonaje.appendChild(nombre);

    const apodo = crearElementoParrafo("Apodo: " + personaje.apodo);
    elementoPersonaje.appendChild(apodo);

    const especialidades = crearElementoParrafo("Especialidad: " + personaje.especialidad);
    elementoPersonaje.appendChild(especialidades);

    const habilidades = crearElementoParrafo("Habilidades: " + personaje.habilidades);
    elementoPersonaje.appendChild(habilidades);

    const amigo = crearElementoParrafo("Amigo: " + personaje.amigo);
    elementoPersonaje.appendChild(amigo);

    return elementoPersonaje;
};

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
        const filteredCharacters = personajes.filter(personaje =>
            personaje.nombre.toLowerCase().includes(name.toLowerCase())
        );
        pintarPersonajesFiltrados(filteredCharacters);
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
    input.addEventListener('input', () => {
        const buscarPersonaje = input.value.trim();
        filtrarPersonajes(buscarPersonaje);
    });
} else {
    console.error('No se encontraron los elementos input o button.');
}

document.addEventListener("DOMContentLoaded", pintarPersonajes);
