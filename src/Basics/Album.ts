import {Song} from './Song';
import {Genre} from './Genre';
import {Group} from './Group';
import {Artist} from './Artist';
import {BasicData} from '../Interfaces/BasicData';

export class Album implements BasicData {
  constructor(private name: string, private whoPublishes: string,
    private publicationYear: number, private genres: string[],
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

  public getGenres(): string[] {
    return this.genres;
  }
  public setGenres(newGenres:string[]): void {
    this.genres = newGenres;
  }
  public addGenre(newGenre: string) {
    this.genres.push(newGenre);
  }
  public removeGenre(genreDelete: string) {
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

  public getWho(): string {
    return this.whoPublishes;
  }
  public setWho(whoPublishes: string): void {
    this.whoPublishes = whoPublishes;
  }

  public showInfo(): string {
    return (`ALBUM ${this.name}
    Artista o grupo que lo publico: ${this.whoPublishes}
    Año de publicacion: ${this.publicationYear}
    Generos que contiene este album: ${this.genres}
    Canciones de este genero: ${this.songs}`);
  }
}
