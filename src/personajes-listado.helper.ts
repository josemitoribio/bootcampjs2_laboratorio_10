import { Personaje } from "./personajes-listado.model";

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

const crearElementoSpan = (texto: string) : HTMLSpanElement => {
    const elementoSpan = document.createElement("span");
    elementoSpan.textContent = texto;
    elementoSpan.classList.add("titulo");
    return elementoSpan;
}

const crearParejaNombre = (personaje: Personaje, ): HTMLDivElement => {
    const parejaNombre = document.createElement ("div");
    const nombreNegrita = crearElementoSpan("Nombre: ");
    parejaNombre.appendChild(nombreNegrita);
    const nombre = crearElementoParrafo(personaje.nombre);
    parejaNombre.appendChild(nombre);

    return parejaNombre;
}

const crearParejaApodo = (personaje: Personaje, ): HTMLDivElement => {
    const parejaApodo = document.createElement ("div");
    const apodoNegrita = crearElementoSpan("Apodo:  ");
    parejaApodo.appendChild(apodoNegrita);
    const apodo = crearElementoParrafo(personaje.apodo);
    parejaApodo.appendChild(apodo);

    return parejaApodo;
}

const crearParejaEspecialidad = (personaje: Personaje, ): HTMLDivElement => {
    const parejaEspecialidad = document.createElement ("div");
    const especialidadNegrita = crearElementoSpan("Especialidad: ");
    parejaEspecialidad.appendChild(especialidadNegrita);
    const especialidad = crearElementoParrafo(personaje.especialidad);
    parejaEspecialidad.appendChild(especialidad);

    return parejaEspecialidad;
}

const crearParejaHabilidad = (personaje: Personaje, ): HTMLDivElement => {
    const parejaHabilidad = document.createElement ("div");
    const habilidadesNegrita = crearElementoSpan("Habilidades: ");
    parejaHabilidad.appendChild(habilidadesNegrita);
    const habilidades = crearElementoParrafo(personaje.habilidades.join(", "));
    parejaHabilidad.appendChild(habilidades);

    return parejaHabilidad;
}

const crearParejaAmigo = (personaje: Personaje, ): HTMLDivElement => {
    const parejaAmigo = document.createElement ("div");
    const amigoNegrita = crearElementoSpan("Amigo:  ");
    parejaAmigo.appendChild(amigoNegrita);
    const amigo = crearElementoParrafo(personaje.amigo);
    parejaAmigo.appendChild(amigo);

    return parejaAmigo;
}

export const crearContenedorPersonaje = (personaje: Personaje, ): HTMLDivElement => {
    const elementoPersonaje = document.createElement ("div");
    elementoPersonaje.classList.add("personaje-contenedor");

    const imagen = crearElementoImagen(personaje.imagen , personaje.nombre);
    elementoPersonaje.appendChild(imagen);

    const parejaNombre = crearParejaNombre(personaje);
    elementoPersonaje.appendChild(parejaNombre);

    const parejaApodo = crearParejaApodo(personaje);
    elementoPersonaje.appendChild(parejaApodo);

    const parejaEspecialidad = crearParejaEspecialidad(personaje);
    elementoPersonaje.appendChild(parejaEspecialidad);

    const parejaHabilidad = crearParejaHabilidad(personaje);
    elementoPersonaje.appendChild(parejaHabilidad);
   
    const parejaAmigo = crearParejaAmigo(personaje);
    elementoPersonaje.appendChild(parejaAmigo);

    return elementoPersonaje;
};