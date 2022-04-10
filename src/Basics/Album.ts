import {Song} from './Song';
import {Group} from './Group';
import {Artist} from './Artist';
import {Genre} from './Genre';
import {BasicData} from '../Interfaces/BasicData';
import {Playlist} from './Playlist';

/**
 * Clase que representa un Albúm
 * Implementa la interfaz de datos basicos de get y set nombre.
 * Las casracterísticas principales que tiene el album son:
 * nombre, quien lo publica(Artista o Grupo), año que se publica,
 * generos a los que pertenece, y canciones que contiene.
 */
export class Album implements BasicData {
  constructor(private name: string, private whoPublishes: (Group|Artist),
    private publicationYear: number, private genres: Genre[],
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
   * Devuelve el tipo de objeto, Artist o Grupo
   * @returns objecto de tipo Group o Artist
   */
  public getWhoPublishes(): (Group|Artist) {
    return this.whoPublishes;
  }
  public setWhoPublishes(newWhoPublishes: (Group|Artist)): void {
    this.whoPublishes = newWhoPublishes;
  }
  /**
   * Devuelve el nombre de quien publica el album
   * @returns string
   */
  // public getWhoPublishesName(): string {
  //   return this.whoPublishes.getName();
  //   // if (this.whoPublishes instanceof Artist) {
  //   //   return this.whoPublishes.getName();
  //   // } else if (this.whoPublishes instanceof Group) {
  //   //   return this.whoPublishes.getName();
  //   // } else {
  //   //   return undefined;
  //   // }
  // }
  /**
   *
   * @returns
   */
  public getPublicationYear(): number {
    return this.publicationYear;
  }
  /**
   *
   * @param duration
   */
  public setPublicationYear(duration: number): void {
    this.publicationYear = duration;
  }
  /**
   * Devuelve las canciones que tiene ese album
   * @returns array de tipo song
   */
  public getSongs(): Song[] {
    return this.songs;
  }
  public setSongs(newSongs: Song[]) : void {
    this.songs = newSongs;
  }
  /**
   * Devuelve los generos que tiene asociado el album
   * @returns array del tipo generer
   */
  public getGenre(): Genre[] {
    return this.genres;
  }
  /**
   *
   * @param newGenres
   */
  public setGenre(newGenres: Genre[]): void {
    this.genres = newGenres;
  }
  /**
   * Devuelve un array del nombre de las canciones
   * que tiene ese album
   * @returns array de string de Song
   */
  // public getNameSongs(): string[] {
  //   let out = this.songs.map(function(song) {
  //     return ` ${song.getName()}`;
  //   });
  //   return out;
  // }
  /**
   * Devuelve lo datos del album
   * @returns datos del album como string
   */
  public print(): string {
  //   return (`ALBUM ${this.name}
  //   Año de publicacion: ${this.publicationYear}
  //   Generos que contiene este album: ${this.genres}
  //  `);
   let play: Playlist;
   const info: string = `${this.name}\n  -Grupos/Artistas: ${this.whoPublishes}\n`+
    `  -Año de publicacion: ${this.publicationYear}\n  -Genero: ${this.genres}\n  -Canciones: ${this.songs}\n `;
    console.log(info);
    return info;
  }
}
// Artista o grupo que lo publico: ${this.getWhoPublishesName()},  Canciones de este genero: ${this.getNameSongs()}
