import { BasicData } from './BasicData';
import { GroupInterface } from '../Interfaces/GroupInterface';
import { Album } from './Album';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Song } from './Song';
/**
 * Clase que representa a un grupo
 * @param name nombre del grupo
 * @param artist artistas que coanforman el grupo
 * @param fundationYear año de incio dle grupo
 * @param genres géneros a los que pertenece el grupo
 * @param albums álbumes que tiene el grupo
 */
export declare class Group extends BasicData {
    private artists;
    private fundationYear;
    private genres;
    private albums;
    constructor(name: string, artists: Artist[], fundationYear: number, genres: string[], albums: Album[]);
    /**
     * Getter para 'fundationYear'
     * @returns año de creación del grupo
     */
    getFundationYear(): number;
    /**
     * Getter para 'artists'
     * @returns los artitas del grupo
     */
    getArtists(): Artist[];
    /**
     * Agrega un artista al grupo
     * @param newArtist nuevo artista que será añadido al grupo
     */
    addArtist(newArtist: Artist): void;
    /**
     * Elimina a un artista del grupo
     * @param artistDelete artista a eliminar
     */
    removeArtist(artistDelete: Artist): void;
    /**
     * Getter para 'songs'
     * @returns las canciones que tiene el grupo
     */
    getSongs(): Song[];
    /**
     * Getter para 'genres'
     * @returns los géneros del grupo
     */
    getGenres(): string[];
    /**
     * Elimina un género del grupo
     * @param genre género a eliminar del grupo
     */
    removeGenre(genre: Genre): void;
    /**
     * Agrega un género al grupo
     * @param genre género a agregar
     */
    addGenre(genre: Genre): void;
    /**
     * Getter para 'albums'
     * @returns devuelve los álbumes
     */
    getAlbums(): Album[];
    /**
     * Agrega un álbum al grupo
     * @param newAlbum nuevo álbum
     */
    addAlbums(newAlbum: Album): void;
    /**
     * Elimina un álbum del grupo
     * @param albumDelete álbum a eliminar
     */
    removeAlbum(albumDelete: Album): void;
    /**
     * Setter para 'name'
     * @param newName nuevo nombre
     */
    setName(newName: string): void;
    /**
     * Setter para 'yearCreation'
     * @param newYear nuevo año
     */
    setYearCreation(newYear: number): void;
    /**
     * Setter para 'artists'
     * @param newArtists nuevos asrtistas
     */
    setArtists(newArtists: Artist[]): void;
    /**
     * Setter para 'genres'
     * @param newGenres nuevos géneros
     */
    setGenres(newGenres: string[]): void;
    /**
     * Setter para 'albums'
     * @param newAlbums nuevos álbumes
     */
    setAlbums(newAlbums: Album[]): void;
    /**
     * Método que deserealiza un objeto
     * @param group objeto de tipo 'GroupInterface'
     * @returns Devuelve un nuevo Group
     */
    static deserialize(group: GroupInterface): Group;
    /**
     * Muestra la canciones que fueron lanzadas como single
     */
    showSingles(): void;
    /**
     * Ordena por número de reproducciones
     * @param ascending orden ascendiente si es true
     */
    showByReproductions(ascending?: boolean): void;
    /**
     * Muestra las playlist asociadas al grupo.
     */
    showPlayListAsociate(): void;
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
     * Ordena los álbumes por año
     * @param ascending true si es de forma ascedente
     */
    showAlbumYearOrder(ascending?: boolean): void;
    /**
     * Muestra la información del grupo
     */
    showInfo(): void;
}
