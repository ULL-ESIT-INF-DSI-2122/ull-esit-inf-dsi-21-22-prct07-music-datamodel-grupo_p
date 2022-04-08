import {Song} from './Song';
import {BasicData} from '../Interfaces/BasicData';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {SongManager} from '../Managers/SongManager';
import {Genre} from './Genre';

export class Album implements BasicData {
  constructor(private name: string, readonly whoPublishes: string,
    readonly publicationYear: number, readonly genres: string[],
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

  public static deserialize(album: AlbumInterface): Album {
    let songs: Song[] = [];
    album.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().getSongByName(s.name) as Song),
    );
    return new Album(album.name, album.whoPublishes, album.publicationYear, album.genres, songs);
  }
}
