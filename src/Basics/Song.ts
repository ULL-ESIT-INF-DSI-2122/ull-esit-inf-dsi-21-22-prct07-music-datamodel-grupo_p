import {BasicData} from '../Interfaces/BasicData';
import {Genre} from './Genre';
import {Reproduccion} from './Reproduccion';

/**
 * Duration de la canción como tipo,
 * representando los minnutos y segundos.
 */
export type Duration = [number, number];
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos: nombre, autor,
 * duracion, genero/s, numero de reproducciones y si es un single
 */
export class Song implements BasicData {
  constructor(private name: string, private author: string,
      private duration: Duration, private genres: Genre[],
      private datePublication: Date, private isSingle: boolean,
      private reproductions: Reproduccion[]) {
  }
  /**
   * Devuelve el nombre de la cancion.
   * @returns nombre como  string.
   */
  public getName(): string {
    return this.name;
  }
  /**
   * Método setter para nombre de la canción.
   * @param newName será el nuevo nombre.
   */
  public setName(newName: string): void {
    this.name = newName;
  }

  /**
   * Devuelve el nombre del autor de la canción
   * @returns author como string
   */
  public getNameAuthor(): string {
    return this.author;
  }
  /**
   * Método setter para el author
   * @param newName de autor de tipo string
   */
  public setNameAuthor(newName: string): void {
    this.author = newName;
  }
  /**
   * Método getter de la duración de la canción
   * @returns tipo Duration
   */
  public getDuration(): Duration {
    return this.duration;
  }
  /**
   * Método setter para la nueva duración de la canción.
   * @param newDuraction de tipo Duration
   */
  public setDuration(newDuraction: Duration): void {
    this.duration = newDuraction;
  }
  /**
   * Método getter de los generos a los que pertence la canción.
   * @returns genres como tipo Genre
   */
  public getGenres(): Genre[] {
    return this.genres;
  }
  /**
   * Método setter para los nuevos generos
   * que pertenece la canción.
   * @param newGenres de tipo Genre
   */
  public setGenres(newGenres: Genre[]): void {
    this.genres = newGenres;
  }
  public getDatePublication(): Date {
    return this.datePublication;
  }
  public setDatePublication(duration: Date): void {
    this.datePublication = duration;
  }
  /**
   * Devuelve true si es sigle.
   * @returns un valor boleano
   */
     public getIsSigle(): boolean {
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
   * Devuelve el número de reproducciones que tiene la canción
   * @returns la longitud del array reproductions
   */
  public getReproduction(): number {
    return this.reproductions.length;
  }/**
   * Método setter
   * @param reproduction de tipo Reproduccion
   */
  public setReproductions(reproduction: Reproduccion[]): void {
    this.reproductions = reproduction;
  }

  public playSong(): void {
    this.reproductions.push(new Reproduccion(new Date(Date.now())));
  }

  /**
   * Devuelve media de las reproduccines
   * @returns un número de resproducciones
   */
  public monthlyReproductions(): number {
    const actualDate: Date = new Date(Date.now());
    const difference: number = actualDate.getTime() -
      this.datePublication.getTime();
    // pasa de milisegundos a meses
    const monthDifference: number = difference / (1000 * 3600 * 24 * 30);
    // media de reproducciones por mes
    return this.getReproduction() / monthDifference;
  }
  /**
   * Devuelve los datos de la canción
   * @returns datos de la canción como string
   */
  public print(): string {
    return (`CANCION ${this.getName()}
    Autor: ${this.author}
    Duracion: ${this.duration}
    Genero/s: ${this.genres}
    Single: ${(this.isSingle ? 'Si' : 'No')}
    Numero de reproducciones: ${this.reproductions}`);
  }
}
