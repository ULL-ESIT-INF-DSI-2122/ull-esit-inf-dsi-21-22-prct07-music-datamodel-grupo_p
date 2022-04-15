import {BasicData} from './BasicData';
import {Genre} from './Genre';
import {Duration} from './Playlist';


/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos: nombre, autor,
 * duracion, genero/s, numero de reproducciones y si es un single
 */
export class Song extends BasicData {
  /**
   * Constructor de la clase `Song`.
   * @param name Nombre
   * @param author Autor
   * @param duration Duración
   * @param genres Géneros
   * @param publicationDate Fecha de publicación.
   * @param isSingle Flag que indica si una canción es un single.
   * @param reproductions Número de reproducciones.
   */
  constructor(name: string, private author: string,
      private duration: Duration, private genres: string[],
      private publicationDate: Date, private isSingle: boolean,
      private reproductions: number) {
    super(name);
  }

  /**
   * Getter para la propiedad `duration`.
   * @returns Devuelve el valor de `duration`.
   */
  public getDuration(): Duration {
    return this.duration;
  }
  /**
   * Getter para la propiedad `publicationDate`.
   * @returns Devuelve el valor de `publicationDate`.
   */
  public getPublicationDate() {
    return this.publicationDate;
  }
  /**
   * Getter para la propiedad `isSingle`.
   * @returns Devuelve el valor de `isSingle`.
   */
  public getIsSingle() {
    return this.isSingle;
  }
  /**
   * Setter para la propiedad `isSingle`.
   * @param newValor Nuevo valor de `isSingle`.
   */
  public setIsSingle(newValor: boolean): void {
    this.isSingle = newValor;
  }
  /**
   * Setter para la propiedad `duration`.
   * @param newDuraction Nuevo valor de `duration`.
   */
  public setDuration(newDuraction: Duration): void {
    this.duration = newDuraction;
  }
  /**
   * Getter para la propiedad `author`.
   * @returns Devuelve el valor de `author`.
   */
  public getAuthorName(): string {
    return this.author;
  }
  /**
   * Setter para la propiedad `author`.
   * @param newAuthor Nuevo valor de `author`.
   */
  public setAuthorName(newAuthor: string): void {
    this.author = newAuthor;
  }
  /**
   * Getter para la propiedad `reproductions`.
   * @returns Devuelve el valor de `reproductions`.
   */
  public getReproductions(): number {
    return this.reproductions;
  }
  /**
   * Setter para la propiedad `reproductions`.
   * @param reproduction Nuevo valor de `reproductions`.
   */
  public setReproductions(reproduction: number): void {
    this.reproductions = reproduction;
  }
  /**
   * Getter para la propiedad `genres`.
   * @returns Devuelve el valor de `genres`.
   */
  public getGenres():string[] {
    return this.genres;
  }
  /**
   * Setter para la propiedad `genres`.
   * @param newGenres Nuevo valor de `genres`.
   */
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  /**
   * Setter para la propiedad `publicationDate`.
   * @param duration Nuevo valor de `publicationDate`.
   */
  public setDatePublication(duration: Date): void {
    this.publicationDate = duration;
  }

  /**
   * Elimina un género de la canción.
   * @param genre Género a eliminar.
   */
  public removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  /**
   * Agrega un género a la canción.
   * @param genre Género a agregar.
   */
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }

  /**
   * Muestra la información del artista.
   * @returns Devuelve una cadena con la información del artista.
   */
  public showInfo(): string {
    const info: string = `CANCIÓN ${this.getName()}
    -Autor: ${this.author}
    -Duración: ${this.duration[0]}min ${this.duration[1]}s
    -Género/s: ${this.genres}
    -Single: ${(this.isSingle ? 'Si' : 'No')}
    -Numero de reproducciones: ${this.reproductions}`;
    console.log(info);
    return info;
  }
}
