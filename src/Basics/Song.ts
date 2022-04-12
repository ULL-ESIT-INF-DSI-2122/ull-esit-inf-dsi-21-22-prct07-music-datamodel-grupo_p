
import {ArtistManager} from '../Managers/ArtistManager';
import {Artist} from './Artist';
import {Genre} from './Genre';
import {BasicData} from './BasicData';


export type Duration = [number, number];
export class Song extends BasicData {
  constructor(name: string, private author: string,
      private duration: Duration, private genres: string[],
      private publicationDate: Date, private single: boolean,
      private reproductions: number) {
    super(name);
  }

  // GETTER
  public getAuthor(): string {
    return this.author;
  }
  public getDuration(): Duration {
    return this.duration;
  }
  public getGenres():string[] {
    return this.genres;
  }
  public getPublicationDate(): Date {
    return this.publicationDate;
  }
  public getIsSingle(): boolean {
    return this.single;
  }
  public getReproductions(): number {
    return this.reproductions;
  }
  public getArtists(): string[] {
    const artists: string[] = ArtistManager.getArtistManager().getList();
    const objArtist: Artist[] = artists.map((name) => ArtistManager.getArtistManager().searchByName(name));
    let artistAsociate: Artist[] = objArtist.filter((artist) => artist.getSongs().includes(this));
    return artistAsociate.map((artistObj) => artistObj.getName());
  }
  // SETTERS
  public setAuthor(newAuthor: string): void {
    this.author = newAuthor;
  }
  public setDuration(newDuration: Duration): void {
    this.duration = newDuration;
  }
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  public setPublicationDate(newDate: Date): void {
    this.publicationDate = newDate;
  }
  public setIsSingle(single: boolean): void {
    this.single = single;
  }
  public setReproductions(repro: number): void {
    this.reproductions = repro;
  }
  // ADDS

  // REMOVES
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
  // MOSTRAR
  public showInfo(): string {
    const info: string = `CANCIÓN ${this.getName()}
    -Autor: ${this.author}
    -Duración: ${this.duration[0]}min ${this.duration[1]}s
    -Género/s: ${this.genres}
    -Single: ${(this.single ? 'Si' : 'No')}
    -Numero de reproducciones: ${this.reproductions}`;
    console.log(info);
    return info;
  }
}