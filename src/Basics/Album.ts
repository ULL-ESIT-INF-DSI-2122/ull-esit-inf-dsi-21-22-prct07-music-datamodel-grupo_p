import {Song} from './Song';
import {Genre} from './Genre';
import {Group} from './Group';
import {Artist} from './Artist';

export class Album {
  constructor(readonly name: string, readonly whoPublishes: (Group|Artist),
    readonly publicationYear: number, readonly genres: Genre[],
    readonly songs: Song[]) {
  }
  public print(): string {
    return (`ALBUM ${this.name}
    Artista o grupo que lo publico: ${this.whoPublishes}
    Año de publicacion: ${this.publicationYear}
    Generos que contiene este album: ${this.genres}
    Canciones de este genero: ${this.songs}`);
  }
}
