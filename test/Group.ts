import {Album} from './Album';
import {Artist} from './Artist';
import {Genre} from './Genre';

export class Group {
  constructor(readonly name: string, private artists: Artist[],
      readonly yearCreation: number, private genres: Genre[],
      private albums: Album[], private numberListeners: number) {
    this.artists = [];
    this.genres = [];
    this.albums = [];
    this.numberListeners = 0;
  }

  public getArtists(): Artist[] {
    return this.artists;
  }
  public setArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  public getGenres(): Genre[] {
    return this.genres;
  }
  public setGenres(newGenre: Genre): void {
    this.genres.push(newGenre);
  }
  public getAlbums(): Album[] {
    return this.albums;
  }
  public setAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }
  public getNumberListeners(): number {
    return this.numberListeners;
  }
  public setNumberListeners(newNumber: number): void {
    this.numberListeners = newNumber;
  }
}
