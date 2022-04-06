import {Album} from './Album';
import {Artist} from './Artist';
import {Genre} from './Genre';

export class Group {
  constructor(readonly name: string, private artists: Artist[],
      readonly yearCreation: number, private genres: Genre[],
      private albums: Album[]) {
  }

  public getName(): string {
    return this.name;
  }
  public getArtists(): Artist[] {
    return this.artists;
  }
  public getGenres(): Genre[] {
    return this.genres;
  }
  public getAlbums(): Album[] {
    return this.albums;
  }
  public getYear(): number {
    return this.yearCreation;
  }

  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }

  public addGenre(newGenre: Genre): void {
    this.genres.push(newGenre);
  }
  public removeGenre(genreDelete: Genre): void {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }

  public addAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }
  public removeAlbum(albumDelete: Album): void {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  // suma de oyentes de las canciones de sus albunes
  public getNumberListenersMonthly(): number {
    let listeners:number = 0;
    this.getAlbums().forEach((album) => {
      album.songs.forEach((song) => {
        listeners += song.monthlyReproductions();
      });
    });
    return listeners;
  }
}
