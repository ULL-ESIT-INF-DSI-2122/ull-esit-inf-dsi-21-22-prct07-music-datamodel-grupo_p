import {SongInterface} from './SongInterface';

/**
 * Interface para los objetos de la clase Playlist.
 */
export interface PlaylistInterface {
    /**
     * Nombre
     */
    name: string,
    /**
     * Canciones de la playlist.
     */
    songs: SongInterface[],
    /**
     * Booleano que indica si una playlist ha sido creada por el sistema.
     */
    systemPlaylist: boolean
}