import {Song} from './Song';
import {Genre} from './Genre';
import {Group} from './Group';
import {Artist} from './Artist';
import {BasicData} from '../Interfaces/BasicData';

export class Album implements BasicData {
  constructor(private name: string, readonly whoPublishes: (Group|Artist),
    readonly publicationYear: number, readonly genres: Genre[],
    readonly songs: Song[]) {
  }

  getName(): string {
    return this.name;
  }

  setName(newName: string): void {
    this.name = newName;
  }

  public print(): string {
    return (`ALBUM ${this.name}
    Artista o grupo que lo publico: ${this.whoPublishes}
    Año de publicacion: ${this.publicationYear}
    Generos que contiene este album: ${this.genres}
    Canciones de este genero: ${this.songs}`);
  }
}
