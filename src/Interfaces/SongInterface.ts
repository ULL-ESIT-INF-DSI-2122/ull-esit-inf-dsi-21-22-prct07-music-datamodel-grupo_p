import {Duration} from '../Basics/Playlist';
/**
 * Interfaz para almacenar objetos de la clase `Song` mediante Lowdb.
 */
export interface SongInterface {
    /**
    * Nombre
    */
    name: string,
    /**
     * Autor
     */
    author: string,
    /**
     * Duración
     */
    duration: Duration,
    /**
     * Géneros
     */
    genres: string[],
    /**
     * Fecha de publicación
     */
    publicationDate: Date,
    /**
     * Flag que indica si la canción es un single.
     */
    isSingle: boolean,
    /**
     * Número de reproducciones
     */
    reproductions: number
}