import { BasicData } from './BasicData';
import { PlaylistInterface } from '../Interfaces/PlaylistInterface';
import { Genre } from './Genre';
import { Song } from './Song';
/**
 * Tipo para la duración.
 */
export declare type Duration = [number, number];
/**
 * Tipo para la selección del orden.
 */
export declare type Order = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
/**
 * Clase para representar una playlist.
 */
export declare class Playlist extends BasicData {
    private songs;
    private systemPlaylist;
    /**
     * Array de géneros.
     */
    private genres;
    /**
     * Duración de la playlist.
     */
    private duration;
    /**
     * Constructor de la clase `Playlist`.
     * @param name Nombre.
     * @param songs Canciones.
     * @param systemPlaylist True si es una playlist creada por el sistema.
     */
    constructor(name: string, songs: Song[], systemPlaylist?: boolean);
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
     * Agrega una canción a la playlist.
     * @param newSong Canción a agregar.
     */
    addSong(newSong: Song): void;
    /**
     * Elimina una canción de la playlist.
     * @param song Canción a eliminar.
     */
    deleteSong(song: Song): void;
    /**
     * Getter para la propiedad `duration`.
     * @returns Devuelve el valor de`duration`.
     */
    getDuration(): Duration;
    /**
     * Getter para la propiedad `genres`.
     * @returns Devuelve el valor de`genres`.
     */
    getGenres(): Genre[];
    /**
     * Getter para la propiedad `systemPlaylist`.
     * @returns Devuelve el valor de`systemPlaylist`.
     */
    getSystemPlaylist(): boolean;
    /**
     * Setter para la propiedad `systemPlaylist`.
     * @param flag Nuevo valor de `systemPlaylist`.
     */
    setSystemPlaylist(flag: boolean): void;
    /**
     * Recalcula la duración total de la playlist.
     */
    recalculateDuration(): void;
    /**
     * Actualiza los géneros de la playlist a partir de sus canciones.
     */
    updateGenres(): void;
    /**
     * Devuelve los nombres de las canciones en orden.
     * @param order Variable para indicar el orden.
     * @returns Devuelve un array con los nombres de las canciones en el orden indicado.
     */
    getSongsNames(order?: Order): string[];
    /**
     * Muestra la información de la playlist.
     * @returns Devuelve una cadena con la información de la playlist.
     */
    showInfo(order?: Order): string;
    getMusicians(): string[];
    /**
     * Devuelve los nombres de los géneros de la playlist.
     * @returns Devuelve un array con los nombres de los géneros de la playlist.
     */
    private getGenresNames;
    /**
     * Deserializa un objeto `PlaylistInterface`.
     * @param playlist Objeto `PlaylistInterface`.
     * @returns Devuelve un nuevo objeto `Playlist`.
     */
    static deserialize(playlist: PlaylistInterface): Playlist;
}
