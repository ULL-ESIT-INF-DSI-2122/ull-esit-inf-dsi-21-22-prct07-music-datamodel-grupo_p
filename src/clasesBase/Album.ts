import {Song} from './Song';
import {Genre} from './Genre';
import {Group} from './Group';
import {Artist} from './Artist';

export class Album {
  constructor(private name: string, private whoPublishes: (Group|Artist),
    private publicationYear: number, private genres: Genre[],
    private songs: Song[]) {
  }
  public print(): string {
    return (`ALBUM ${this.name}
    Artista o grupo que lo publico: ${this.whoPublishes}
    Año de publicacion: ${this.publicationYear}
    Generos que contiene este album: ${this.genres}
    Canciones de este genero: ${this.songs}`);
  }
}
