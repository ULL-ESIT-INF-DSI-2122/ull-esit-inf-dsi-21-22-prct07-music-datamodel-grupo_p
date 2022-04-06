import {Song} from './Song';
import {MusicGenre} from './MusicGenre';
import {Group} from './Group';
import {Artist} from './Artist';

export class Album {
  constructor(private name: string, private whoPublishes: (Group|Artist),
    private publicationYear: number, private genres: MusicGenre[],
    private songs: Song[]) {
  }

  public getName(): string {
    return this.name;
  }
  public setName(newName: string): void {
    this.name = newName;
  }
  public getYear(): number {
    return this.publicationYear;
  }
  public setYear(year: number): void {
    this.publicationYear = year;
  }

  public getGenres(): MusicGenre[] {
    return this.genres;
  }
  public setGenres(newGenres:MusicGenre[]): void {
    this.genres = newGenres;
  }
  public addGenre(newGenre: MusicGenre) {
    this.genres.push(newGenre);
  }
  public removeGenre(genreDelete: MusicGenre) {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }

  public getSongs(): Song[] {
    return this.songs;
  }
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  public addSong(newSong: Song) {
    this.songs.push(newSong);
  }
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }


  public print(): string {
    return (`ALBUM ${this.name}
    Artista o grupo que lo publico: ${this.whoPublishes}
    Año de publicacion: ${this.publicationYear}
    Generos que contiene este album: ${this.genres}
    Canciones de este genero: ${this.songs}`);
  }
}
