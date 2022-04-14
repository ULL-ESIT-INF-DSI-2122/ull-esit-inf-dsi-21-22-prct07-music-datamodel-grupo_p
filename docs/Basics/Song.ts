import {BasicData} from './BasicData;
import {Genre} from './Genre';

/**
 * Duración de la canción como type.
 */
export type Duration = [number, number];
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos:
 * @param name nombre
 * @param author author
 * @param duration tiempo que dura la canción
 * @param genres géneros a los que pertenece la canción
 * @param publicationDate fecha de lanzamiento
 * @param isSingle flag para ver si fué lanzado como single
 * @param reproductions reproducciones de la canción
 */
export class Song extends BasicData {
  constructor(name: string, private author: string,
      private duration: Duration, private genres: string[],
      private publicationDate: Date, private isSingle: boolean,
      private reproductions: number) {
    super(name);
  }

  /**
   * Método getter para 'duration'
   * @returns valor de tipo Duration
   */
  public getDuration(): Duration {
    return this.duration;
  }
  /**
   * Método getter para 'publicationDate'
   * @returns año de publicación de la canción
   */
  public getPublicationDate() {
    return this.publicationDate;
  }
  /**
   * Método getter para 'single'
   * @returns valor boleano, true si fué lanzada como single.
   */
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
  /**
   * Método setter para author
   * @param newAuthor es el nuevo nombre de author
   */
  public setAuthorName(newAuthor: string): void {
    this.author = newAuthor;
  }
  /**
   * Método getter para 'reproductions'
   * @returns Devuelve el número de reproducciones de la canción
   */
  public getReproductions(): number {
    return this.reproductions;
  }
  /**
   * Método setter para reproductions
   * @param reproduction es la nueva reproducción de la canción.
   */
  public setReproductions(reproduction: number): void {
    this.reproductions = reproduction;
  }
  /**
   * Método getter para 'genres'
   * @returns un array de los géneros a los que pertenece la canicón
   */
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
  /**
   * Método Setter para 'publicationDate'
   * @param duration de tipo Date. Nueva fecha de lanzamiento
   */
  public setDatePublication(duration: Date): void {
    this.publicationDate = duration;
  }
  /**
   * Elimina el género de la canción.
   * @param genre que será eliminado
   */
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  /**
   * Agrega el género a la canción.
   * @param genre que será añadido.
   */
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