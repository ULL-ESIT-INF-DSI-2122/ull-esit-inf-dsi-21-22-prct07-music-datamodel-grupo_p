import { BasicData } from './BasicData';
import { GenreInterface } from '../Interfaces/GenreInterface';
import { Album } from './Album';
import { Artist } from './Artist';
import { Group } from './Group';
import { Song } from './Song';
/**
 * Clase para representar un género musical.
 */
export declare class Genre extends BasicData {
    private musicians;
    private albums;
    private songs;
    /**
     * Constructor de la clase `Genre`.
     * @param name Nombre.
     * @param musicians Gropos/Artistas.
     * @param albums Álbumes.
     * @param songs Canciones.
     */
    constructor(name: string, musicians: (Group | Artist)[], albums: Album[], songs: Song[]);
    /**
     * Getter para la propiedad `musicians`.
     * @returns Devuelve el valor de`musicians`.
     */
    getMusicians(): (Group | Artist)[];
    /**
     * Setter para la propiedad `musicians`.
     * @param musicians Nuevo valor de `musicians`.
     */
    setMusicians(musicians: (Group | Artist)[]): void;
    /**
     * Agrega un grupo/artista al género.
     * @param newMusician Grupo/artista a agregar.
     */
    addMusician(newMusician: Group | Artist): void;
    /**
     * Elimina un grupo/artista del género.
     * @param musician Grupo/artista a eliminar.
     */
    deleteMusician(musician: Group | Artist): void;
    /**
     * Getter para la propiedad `albums`.
     * @returns Devuelve el valor de`albums`.
     */
    getAlbums(): Album[];
    /**
     * Setter para la propiedad `albums`.
     * @param albums Nuevo valor de `albums`.
     */
    setAlbums(albums: Album[]): void;
    /**
     * Agrega un álbum al género.
     * @param newAlbum Álbum a agregar.
     */
    addAlbum(newAlbum: Album): void;
    /**
     * Elimina un álbum del género.
     * @param album Álbum a eliminar.
     */
    deleteAlbum(album: Album): void;
    /**
     * Getter para la propiedad `songs`.
     * @returns Devuelve el valor de`songs`.
     */
    getSongs(): Song[];
    /**
     * Setter para la propiedad `songs`.
     * @param songs Nuevo valor de `songs`.
     */
    setSongs(songs: Song[]): void;
    /**
     * Agrega una canción a al género.
     * @param newSong Canción a agregar.
     */
    addSong(newSong: Song): void;
    /**
     * Elimina una canción del género.
     * @param song Canción a eliminar.
     */
    deleteSong(song: Song): void;
    /**
     * Muestra la información de la playlist.
     * @returns Devuelve una cadena con la información de la playlist.
     */
    showInfo(): string;
    /**
     * Devuelve los nombres de los grupos/artistas del género.
     * @returns Devuelve un array con los nombres de los grupos/artistas del género.
     */
    getMusiciansNames(): string[];
    /**
     * Devuelve los nombres de los álbumes del género.
     * @returns Devuelve un array con los nombres de los álbumes del género.
     */
    getAlbumsNames(): string[];
    /**
     * Devuelve los nombres de las canciones del género.
     * @returns Devuelve un array con los nombres de las canciones del género.
     */
    getSongsNames(): string[];
    /**
     * Deserializa un objeto `GenreInterface`.
     * @param genre Objeto `GenreInterface`.
     * @returns Devuelve un nuevo objeto `Genre`.
     */
    static deserialize(genre: GenreInterface): Genre;
}
