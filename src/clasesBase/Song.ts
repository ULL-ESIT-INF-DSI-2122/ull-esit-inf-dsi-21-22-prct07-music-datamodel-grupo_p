import {Genre} from './Genre';
import {Duracion} from './Duracion';
import {Reproduccion} from './Reproduccion';
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos: nombre, autor,
 * duracion, genero/s, numero de reproducciones y si es un single
 */

export class Song {
  constructor(private name: string, private author: string,
      private duration: Duracion, private genres: Genre[],
      private datePublication: Date, private isSingle: boolean,
      private reproductions: Reproduccion[]) {
  }

  public getReproduction(): number {
    return this.reproductions.length;
  }
  public playSong(): void {
    this.reproductions.push(new Reproduccion(new Date(Date.now())));
  }
  public monthlyReproductions(): number {
    const actualDate: Date = new Date(Date.now());
    const difference: number = actualDate.getTime() -
      this.datePublication.getTime();
    // pasa de milisegundos a meses
    const monthDifference: number = difference / (1000 * 3600 * 24 * 30);
    // media de reproducciones por mes
    return this.getReproduction() / monthDifference;
  }
  public print(): string {
    return (`CANCION ${this.name}
    Autor: ${this.author}
    Duracion: ${this.duration}
    Genero/s: ${this.genres}
    Single: ${(this.isSingle ? 'Si' : 'No')}
    Numero de reproducciones: ${this.reproductions}`);
  }
}
