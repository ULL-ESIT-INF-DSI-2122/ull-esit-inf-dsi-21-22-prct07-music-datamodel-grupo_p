import {Song} from './Song';
import {BasicData} from './BasicData';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {SongManager} from '../Managers/SongManager';
import {Genre} from './Genre';


export class Album extends BasicData {
  constructor(name: string, private publisher: string,
    private publicationYear: number, private genres: string[],
    private songs: Song[]) {
    super(name);
  }

  // GETTERS
  public getPublisher(): string {
    return this.publisher;
  }
  public getYear(): number {
    return this.publicationYear;
  }
  public getGenres(): string[] {
    return this.genres;
  }
  public getSongs(): Song[] {
    return this.songs;
  }
  // SETTERS
  public setPublisher(newPublisher: string): void {
    this.publisher = newPublisher;
  }
  public setYear(year: number): void {
    this.publicationYear = year;
  }
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  // ADDS
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  public addSong(newSong: Song) {
    this.songs.push(newSong);
  }
  // REMOVES
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }
  public static deserialize(album: AlbumInterface): Album {
    let songs: Song[] = [];
    album.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().searchByName(s.name) as Song),
    );
    return new Album(album.name, album.whoPublishes, album.publicationYear, album.genres, songs);
  }

  public print(): string {
    //   return (`ALBUM ${this.name}
    //   Año de publicacion: ${this.publicationYear}
    //   Generos que contiene este album: ${this.genres}
    //  `);
    const info: string = `${this.name}\n  -Grupos/Artistas: ${this.publisher}\n`+
      `  -Año de publicacion: ${this.publicationYear}\n  -Genero: ${this.genres}\n  -Canciones: ${this.songs}\n `;
    console.log(info);
    return info;
  }
}
