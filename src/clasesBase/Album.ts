import {Song} from './Song';
import {Group} from './Group';
import {Artist} from './Artist';
import {genrer} from './MusicGenre';
import {BasicData} from '../interfaces/basicData';

/**
 * Clase que representa un Albúm
 * Implementa la interfaz de datos basicos de get y set nombre.
 * Las casracterísticas principales que tiene el album son:
 * nombre, quien lo publica(Artista o Grupo), año que se publica,
 * generos a los que pertenece, y canciones que contiene.
 */
export class Album implements BasicData {
  constructor(private name: string, private whoPublishes: (Group|Artist),
    private publicationYear: number, private genres: genrer[],
    private songs: Song[]) {
  }
  /**
   * Devuelve el nombre del album
   * @returns string
   */
  public getName(): string {
    return this.name;
  }
  /**
   * Método setter de name
   * @param newName será el nuevo nombre
   */
  public setName(newName: string): void {
    this.name = newName;
  }
  /**
   * Devuelve el tipo de objeto, de tipo Artist o Grupo
   * @returns objecto de tipo Group o Artist
   */
  public getWhoPublishes(): (Group|Artist) {
    return this.whoPublishes;
  }
  /**
   * Devuelve el nombre de quien publica el album
   * @returns string
   */
  public getWhoPublishesName(): string {
    return this.whoPublishes.getName();
  }
  /**
   * Devuelve las canciones que tiene ese album
   * @returns array de tipo song
   */
  public getSongs(): Song[] {
    return this.songs;
  }
  /**
   * Devuelve los generos que tiene asociado el album
   * @returns array del tipo generer
   */
  public getGenrer(): genrer[] {
    return this.genres;
  }

  /**
   * Devuelve un array del nombre de las canciones
   * que tiene ese album
   * @returns array de string de Song
   */
  public getNameSongs(): string[] {
    let out = this.songs.map(function(song) {
      return ` ${song.getName()}`;
    });
    return out;
  }
  /**
   * Devuelve lo datos del album
   * @returns datos del album como string
   */
  public print(): string {
    return (`ALBUM ${this.name}
    Artista o grupo que lo publico: ${this.getWhoPublishesName()}
    Año de publicacion: ${this.publicationYear}
    Generos que contiene este album: ${this.genres}
    Canciones de este genero: ${this.getNameSongs()}`);
  }
}