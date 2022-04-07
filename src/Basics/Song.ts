import {BasicData} from '../Interfaces/BasicData';
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos: nombre, autor,
 * duracion, genero/s, numero de reproducciones y si es un single
 */

export type Duration = [number, number];


export class Song implements BasicData {
  constructor(private name: string, private author: string,
      private duration: Duration, private genres: string[],
      private datePublication: Date, private isSingle: boolean,
      private reproductions: number) {
  }

  public getDuration(): Duration {
    return this.duration;
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
   * Devuelve el número de reproducciones que tiene la canción
   * @returns la longitud del array reproductions
   */
  public getReproduction(): number {
    return this.reproductions;
  }

  public getGenres():string[] {
    return this.genres;
  }

  /*
  public playSong(): void {
    this.reproductions.push(new Reproduccion(new Date(Date.now())));
  }*/

  /**
   * Devuelve media de las reproduccines
   * @returns un número de resproducciones
   */
  /*
  public monthlyReproductions(): number {
    const actualDate: Date = new Date(Date.now());
    const difference: number = actualDate.getTime() -
      this.datePublication.getTime();
    // pasa de milisegundos a meses
    const monthDifference: number = difference / (1000 * 3600 * 24 * 30);
    // media de reproducciones por mes
    return this.getReproduction() / monthDifference;
  }*/
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