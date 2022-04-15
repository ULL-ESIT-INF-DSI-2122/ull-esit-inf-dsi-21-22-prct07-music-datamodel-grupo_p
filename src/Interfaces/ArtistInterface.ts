import {AlbumInterface} from './AlbumInterface';
import {SongInterface} from './SongInterface';
/**
 * Interfaz para almacenar objetos de la clase `Artist` mediante Lowdb.
 */
export interface ArtistInterface {
  /**
   * Nombre
   */
  name: string,
  /**
   * Grupos
   */
  groups: string[],
  /**
   * Géneros
   */
  genres: string[],
  /**
   * Álbumes
   */
  albums: AlbumInterface[],
  /**
   * Canciones
   */
  songs: SongInterface[]
}