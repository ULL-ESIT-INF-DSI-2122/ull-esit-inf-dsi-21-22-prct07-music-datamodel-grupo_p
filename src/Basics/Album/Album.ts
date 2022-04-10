import {Song} from '../Song/Song';
import {BasicData} from '../../Interfaces/BasicData';

export class Album implements BasicData {
  constructor(private name: string, private publisher: string,
    private publicationYear: number, private genres: string[],
    private songs: Song[]) {
  }

  // GETTERS
  public getName(): string {
    return this.name;
  }
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
  public setName(newName: string): void {
    this.name = newName;
  }
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
  public addGenre(newGenre: string) {
    this.genres.push(newGenre);
  }
  public addSong(newSong: Song) {
    this.songs.push(newSong);
  }
  // REMOVES
  public removeGenre(genreDelete: string) {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }
}
