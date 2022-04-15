import {SongInterface} from './SongInterface';
/**
 * Interfaz para almacenar objetos de la clase `Playlist` mediante Lowdb.
 */
export interface PlaylistInterface {
    /**
     * Nombre
     */
    name: string,
    /**
     * Canciones
     */
    songs: SongInterface[],
    /**
     * Flag que indica si es una playlist creada por el sistema.
     */
    systemPlaylist: boolean
}