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

  public getGenres():string[] {
    return this.genres;
  }
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
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
  public showInfo(): string {
    const info: string = `${this.getName()}
    Autor: ${this.author}
    Duracion: ${this.duration}
    Genero/s: ${this.genres}
    Single: ${(this.isSingle ? 'Si' : 'No')}
    Numero de reproducciones: ${this.reproductions}`;
    console.log(info);
    return info;
  }
}
