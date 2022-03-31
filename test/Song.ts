import {Genre} from './Genre';
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos: nombre, autor,
 * duracion, genero/s, numero de reproducciones y si es un single
 */
export class Song {
  constructor(readonly name: string, readonly author: string,
      readonly duration: number, readonly genres: Genre[],
      readonly isSingle: boolean, private reproductions: number) {
  }

  public getReproduction(): number {
    return this.reproductions;
  }
  public setReproductions(num: number): void {
    this.reproductions = num;
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
