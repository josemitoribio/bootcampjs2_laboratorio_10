import axios from "axios";
import { Personaje } from "./personajes-listado.model";
import { pintarPersonajesFiltrados } from "./personajes-listado";

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
    try {
        const { data } = await axios.get("http://localhost:3000/personajes");
        return data;
    } catch (error) {
        throw new Error("Error al obtener los personajes");
    }
};

export const filtrarPersonajes = async (name: string): Promise<Personaje[]> => {
    try {
        const { data } = await axios.get(`http://localhost:3000/personajes?nombre_like=${name}`);
        const personajes: Personaje[] = data;
        pintarPersonajesFiltrados(personajes);
        return personajes;
    } catch (error) {
        throw new Error("Error al filtrar los personajes");
    }
};
