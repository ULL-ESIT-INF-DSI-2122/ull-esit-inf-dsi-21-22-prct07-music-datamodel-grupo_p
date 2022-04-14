import { Album } from './Album';
import { Song } from './Song';
import { BasicData } from './BasicData';
import { ArtistInterface } from '../Interfaces/ArtistInterface';
import { Genre } from './Genre';
/**
 * Clase que representa a un artista
 * @param name nombre del artista
 * @param groups grupos a los que pertenece el artista
 * @param genres generos que tiene el artista
 * @param albums albumes que tiene el artista
 * @param songs canciones que tiene el artista
 */
export declare class Artist extends BasicData {
    private groups;
    private genres;
    private albums;
    private songs;
    constructor(name: string, groups: string[], genres: string[], albums: Album[], songs: Song[]);
    /**
     * Método que deserealiza un objeto.
     * @param artist objeto de tipo 'ArtistInterface'
     * @returns Devuelve un nuevo Artista
     */
    static deserialize(artist: ArtistInterface): Artist;
    /**
     * getter de grupos
     * @returns un string de grupos
     */
    getGroups(): string[];
    /**
     * getter de genres
     * @returns devuelve los generos que tiene el artista
     */
    getGenres(): string[];
    /**
     * getter de albums
     * @returns los albumes que tiene el artista
     */
    getAlbums(): Album[];
    /**
     * getter de songs
     * @returns las canciones que tiene el artista
     */
    getSongs(): Song[];
    /**
     * setter para nombre
     * @param newName nuevo nombre para el artista
     */
    setName(newName: string): void;
    /**
     * Setter para 'groups'
     * @param newGroups nuevos grupos
     */
    setGroups(newGroups: string[]): void;
    /**
     * Setter para genrres
     * @param newGenres nuevos géneros
     */
    setGenres(newGenres: string[]): void;
    /**
     * Setter para álbum
     * @param newAlbums nuevos álbumes
     */
    setAlbums(newAlbums: Album[]): void;
    /**
    *Setter para songs
    * @param newSongs nuevas canciones
    */
    setSongs(newSongs: Song[]): void;
    /**
     * Agrega un grupo al artista
     * @param newGroup nuevo grupo
     */
    addGroup(newGroup: string): void;
    /**
     * Agrega un género al artista
     * @param genre nuevo género
     */
    addGenre(genre: Genre): void;
    /**
     * Agrega un canción al artista
     * @param newSong nueva canción
     */
    addSong(newSong: Song): void;
    /**
     * Agrega un álbum al artista
     * @param newAlbum nuevo álbum
     */
    addAlbum(newAlbum: Album): void;
    /**
     * Elimina el grupo del artista
     * @param groupDelete grupo a eliminar
     */
    removeGroup(groupDelete: string): void;
    /**
     * Elimina el género que tiene el artista
     * @param genre género a eliminar
     */
    removeGenre(genre: Genre): void;
    /**
     * Elimina el álbum que tiene el artista
     * @param albumDelete album que será eliminado
     */
    removeAlbum(albumDelete: Album): void;
    /**
     * Elimina la canción del artista
     * @param songDelete canción que será eliminada
     */
    removeSong(songDelete: Song): void;
    /**
     * Muestra la info del artista
     */
    showInfo(): void;
    /**
     * Ordena las canciones
     * @param ascending true para ordenar de forma ascendente
     */
    showSongsOrder(ascending?: boolean): void;
    /**
     * Ordena los albumes
     * @param ascending true si es de forma ascendente
     */
    showAlbumOrder(ascending?: boolean): void;
    /**
     * Ordena los albumes por año
     * @param ascending true si es de forma ascedente
     */
    showAlbumYearOrder(ascending?: boolean): void;
    /**
     * Muestra la canciones que fueron lanzadas como single
     */
    showSingles(): void;
    /**
     * Ordena por número de reproducciones
     * @param ascending true si es de forma ascendente
     */
    showByReproductions(ascending?: boolean): void;
    /**
     * Muestra las playlist asociadas al artista.
     */
    showPlayListAsociate(): void;
}
