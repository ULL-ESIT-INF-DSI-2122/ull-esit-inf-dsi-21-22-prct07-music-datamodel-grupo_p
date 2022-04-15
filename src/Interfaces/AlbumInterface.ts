import {SongInterface} from './SongInterface';
/**
 * Interfaz para almacenar objetos de la clase `Album` mediante Lowdb.
 */
export interface AlbumInterface {
    /**
     * Nombre
     */
    name: string,
    /**
     * Autor
     */
    whoPublishes: string,
    /**
     * Ano de publicación
     */
    publicationYear: number,
    /**
     * Géneros
     */
    genres: string[],
    /**
     * Canciones
     */
    songs: SongInterface[]
}