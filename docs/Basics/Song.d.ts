import { BasicData } from './BasicData;;
import { Genre } from './Genre';
/**
 * Duración de la canción como type.
 */
export declare type Duration = [number, number];
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos:
 * @param name nombre
 * @param author author
 * @param duration tiempo que dura la canción
 * @param genres géneros a los que pertenece la canción
 * @param publicationDate fecha de lanzamiento
 * @param isSingle flag para ver si fué lanzado como single
 * @param reproductions reproducciones de la canción
 */
export declare class Song extends BasicData {
    private author;
    private duration;
    private genres;
    private publicationDate;
    private isSingle;
    private reproductions;
    constructor(name: string, author: string, duration: Duration, genres: string[], publicationDate: Date, isSingle: boolean, reproductions: number);
    /**
     * Método getter para 'duration'
     * @returns valor de tipo Duration
     */
    getDuration(): Duration;
    /**
     * Método getter para 'publicationDate'
     * @returns año de publicación de la canción
     */
    getPublicationDate(): Date;
    /**
     * Método getter para 'single'
     * @returns valor boleano, true si fué lanzada como single.
     */
    getIsSingle(): boolean;
    /**
     * Método setter de si es single o no la canción.
     * @param newValor tipo boleano.
     */
    setIsSingle(newValor: boolean): void;
    /**
     * Método setter para la nueva duración de la canción.
     * @param newDuraction de tipo Duration
     */
    setDuration(newDuraction: Duration): void;
    /**
     * Devuelve el nombre del autor de la canción
     * @returns author como string
     */
    getAuthorName(): string;
    /**
     * Método setter para author
     * @param newAuthor es el nuevo nombre de author
     */
    setAuthorName(newAuthor: string): void;
    /**
     * Método getter para 'reproductions'
     * @returns Devuelve el número de reproducciones de la canción
     */
    getReproductions(): number;
    /**
     * Método setter para reproductions
     * @param reproduction es la nueva reproducción de la canción.
     */
    setReproductions(reproduction: number): void;
    /**
     * Método getter para 'genres'
     * @returns un array de los géneros a los que pertenece la canicón
     */
    getGenres(): string[];
    /**
     * Método setter para los nuevos generos
     * que pertenece la canción.
     * @param newGenres de tipo Genre
     */
    setGenres(newGenres: string[]): void;
    /**
     * Método Setter para 'publicationDate'
     * @param duration de tipo Date. Nueva fecha de lanzamiento
     */
    setDatePublication(duration: Date): void;
    /**
     * Elimina el género de la canción.
     * @param genre que será eliminado
     */
    removeGenre(genre: Genre): void;
    /**
     * Agrega el género a la canción.
     * @param genre que será añadido.
     */
    addGenre(genre: Genre): void;
    /**
     * Devuelve los datos de la canción
     * @returns datos de la canción como string
     */
    showInfo(): string;
}
