import {BasicData} from './BasicData';
import {Genre} from './Genre';
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos: nombre, autor,
 * duracion, genero/s, numero de reproducciones y si es un single
 */

export type Duration = [number, number];
export class Song extends BasicData {
  constructor(name: string, private author: string,
      private duration: Duration, private genres: string[],
      private publicationDate: Date, private isSingle: boolean,
      private reproductions: number) {
    super(name);
  }


  public getDuration(): Duration {
    return this.duration;
  }

  public getPublicationDate() {
    return this.publicationDate;
  }
  public getIsSingle() {
    return this.isSingle;
  }
  /**
   * Método setter de si es single o no la canción.
   * @param newValor tipo boleano.
   */
  public setIsSingle(newValor: boolean): void {
    this.isSingle = newValor;
  }
  /**
   * Método setter para la nueva duración de la canción.
   * @param newDuraction de tipo Duration
   */
  public setDuration(newDuraction: Duration): void {
    this.duration = newDuraction;
  }
  /**
   * Devuelve el nombre del autor de la canción
   * @returns author como string
   */
  public getAuthorName(): string {
    return this.author;
  }
  public setAuthorName(newAuthor: string): void {
    this.author = newAuthor;
  }
  /**
   * Devuelve el número de reproducciones que tiene la canción
   * @returns la longitud del array reproductions
   */
  public getReproductions(): number {
    return this.reproductions;
  }
  /**
   * Método setter
   * @param reproduction de tipo Reproduccion
   */
  public setReproductions(reproduction: number): void {
    this.reproductions = reproduction;
  }

  public getGenres():string[] {
    return this.genres;
  }
  /**
   * Método setter para los nuevos generos
   * que pertenece la canción.
   * @param newGenres de tipo Genre
   */
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }

  public setDatePublication(duration: Date): void {
    this.publicationDate = duration;
  }

  public removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }

  /**
   * Devuelve los datos de la canción
   * @returns datos de la canción como string
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
