
import {Duration} from './Playlist';
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos: nombre, autor,
 * duracion, genero/s, numero de reproducciones y si es un single
 */

export class Song {
  constructor(readonly name: string, readonly author: string,
      readonly duration: Duration, readonly genres: string[],
      readonly datePublication: Date, readonly isSingle: boolean,
      private reproductions: number) {
  }

  getName(): string {
    return this.name;
  }
  getDuration(): Duration {
    return this.duration;
  }
  getReproduction(): number {
    return this.reproductions;
  }
  getGenres():string[] {
    return this.genres;
  }
  monthlyReproductions(): number {
    const actualDate: Date = new Date(Date.now());
    const difference: number = actualDate.getTime() -
      this.datePublication.getTime();
    // pasa de milisegundos a meses
    const monthDifference: number = difference / (1000 * 3600 * 24 * 30);
    // media de reproducciones por mes
    return this.getReproduction() / monthDifference;
  }
  print(): string {
    return (`CANCION ${this.name}
    Autor: ${this.author}
    Duracion: ${this.duration}
    Genero/s: ${this.genres}
    Single: ${(this.isSingle ? 'Si' : 'No')}
    Numero de reproducciones: ${this.reproductions}`);
  }
}
