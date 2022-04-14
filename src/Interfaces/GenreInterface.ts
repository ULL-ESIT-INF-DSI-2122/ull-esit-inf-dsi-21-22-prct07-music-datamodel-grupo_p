import {AlbumInterface} from './AlbumInterface';
import {ArtistInterface} from './ArtistInterface';
import {GroupInterface} from './GroupInterface';
import {SongInterface} from './SongInterface';

/**
 * Interface para los objetos de la clase Genre.
 */
export interface GenreInterface {
    /**
     * Nombre
     */
    name: string,
    /**
     * Grupos/Artistas del género.
     */
    musicians: (GroupInterface|ArtistInterface)[],
    /**
     * Álbumes del género.
     */
    albums: AlbumInterface[],
    /**
     * Canciones del género.
     */
    songs: SongInterface[]
}