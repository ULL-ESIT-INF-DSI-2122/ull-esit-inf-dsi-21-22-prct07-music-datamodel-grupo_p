import {AlbumInterface} from './AlbumInterface';
import {ArtistInterface} from './ArtistInterface';
import {GroupInterface} from './GroupInterface';
import {SongInterface} from './SongInterface';

/**
 * Interfaz para almacenar objetos de la clase `Genre` mediante Lowdb.
 */
export interface GenreInterface {
    /**
     * Nombre
     */
    name: string,
    /**
     * Grupos/Artistas
     */
    musicians: (GroupInterface|ArtistInterface)[],
    /**
     * Álbumes
     */
    albums: AlbumInterface[],
    /**
     * Canciones
     */
    songs: SongInterface[]
}