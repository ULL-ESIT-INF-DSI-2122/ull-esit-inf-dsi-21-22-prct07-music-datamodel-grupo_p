import {AlbumInterface} from './AlbumInterface';
import {ArtistInterface} from './ArtistInterface';
/**
 * Interfaz para almacenar objetos de la clase `Group` mediante Lowdb.
 */
export interface GroupInterface {
  /**
   * Nombre
   */
  name: string;
  /**
   * Artistas
   */
  artists: ArtistInterface[],
  /**
   * Ano de fundación
   */
  fundationYear: number,
  /**
   * Géneros
   */
  genres: string[],
  /**
   * Álbumes
   */
  albums: AlbumInterface[]
}