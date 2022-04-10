import {BasicData} from '../../Interfaces/BasicData';
import {ArtistManager} from '../../Managers/ArtistManager';
import {Artist} from '../Artist/Artist';


export type Duration = [number, number];

export class Song implements BasicData {
  constructor(private name: string, private author: string,
      private duration: Duration, private genres: string[],
      private datePublication: Date, private single: boolean,
      private reproductions: number) {
  }

  // GETTERS
  public getName(): string {
    return this.name;
  }
  public getAuthor(): string {
    return this.author;
  }
  public getDuration(): Duration {
    return this.duration;
  }
  public getGenres():string[] {
    return this.genres;
  }
  public getDatePublication(): Date {
    return this.datePublication;
  }
  public isSingle(): boolean {
    return this.single;
  }
  public getReproductions(): number {
    return this.reproductions;
  }
  public getArtists(): string[] {
    const artists: string[] = ArtistManager.getArtistsManager().getList();
    const objArtist: Artist[] = artists.map((name) => ArtistManager.getArtistsManager().searchByName(name));
    let artistAsociate: Artist[] = objArtist.filter((artist) => artist.getSongs().includes(this));
    return artistAsociate.map((artistObj) => artistObj.getName());
  }
  // ADD elements in ATRIBUTES
  public addGenre(nameGenre: string): void {
    this.genres.push(nameGenre);
  }
  // REMOVES
  public delete(nameGenre: string): void {
    this.genres = this.genres.filter((elemento) => elemento !== nameGenre);
  }
}