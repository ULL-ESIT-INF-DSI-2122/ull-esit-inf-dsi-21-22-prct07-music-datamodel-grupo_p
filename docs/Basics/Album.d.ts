import { Song } from './Song';
import { BasicData } from './BasicData';
import { AlbumInterface } from '../Interfaces/AlbumInterface';
import { Genre } from './Genre';
/**
 * Clase que representa un Albúm
 * Extiende de la interfaz de datos basicos(get y set de nombre).
 * Las caracteristicas principales que tiene el album son:
 * @param name del abum
 * @param publisher quien publica el album
 * @param publicationYear año de publicación
 * @param genres géneros a los que pertenece
 * @param songs canciones que contiene
 */
export declare class Album extends BasicData {
    private publisher;
    private publicationYear;
    private genres;
    private songs;
    constructor(name: string, publisher: string, publicationYear: number, genres: string[], songs: Song[]);
    /**
     * Método getter para 'publisher'
     * @returns un string de quien publica el álbum
     */
    getPublisher(): string;
    /**
     * Método getter para 'year'
     * @returns el año que fué publicado
     */
    getYear(): number;
    /**
     * Método getter para 'genres'
     * @returns un array con los géneros a lo que pertenece
     */
    getGenres(): string[];
    /**
     * Método getter para 'songs'
     * @returns las canciones que tiene el álbum
     */
    getSongs(): Song[];
    /**
     * Método setter para 'publisher'
     * @param newPublisher nuevo artista o grupo que publica el álbum
     */
    setPublisher(newPublisher: string): void;
    /**
     * Método setter para 'year'
     * @param year año que fué publicado
     */
    setYear(year: number): void;
    /**
     * Método setter para 'genres'
     * @param newGenres para los nuevos géneros a los que pertenece el álbum
     */
    setGenres(newGenres: string[]): void;
    /**
    * Método setter para 'songs'
    * @param newSongs de tipo Song
    */
    setSongs(newSongs: Song[]): void;
    /**
     * Método que agrega un nuevo género al álbum
     * @param genre de tipo Genre
     */
    addGenre(genre: Genre): void;
    /**
     * Agrega una nueva canción
     * @param newSong canción que será agregada al álbum
     */
    addSong(newSong: Song): void;
    /**
     * Elimina un género del ábum
     * @param genre de tipo Genre
     */
    removeGenre(genre: Genre): void;
    /**
     * Elimina la canción del álbum
     * @param songDelete canción que será eliminada del álbum
     */
    removeSong(songDelete: Song): void;
    /**
     * Método que deserealiza un objeto, en este caso es song.
     * @param album objeto de tipo 'AlbumInterface'
     * @returns Devuelve un nuevo álbum
     */
    static deserialize(album: AlbumInterface): Album;
    /**
     * Devuelve la información del álbum
     * @returns un string con la información del álbum
     */
    showInfo(): string;
}
