import {Album} from './Album';
import {Artist} from './Artist';
import {genrer} from './MusicGenre';

export class Group {
  constructor(private name: string, private artists: string[],
      readonly yearCreation: number, private genres: genrer[],
      private albums: string[]) {
        // let artistType: Artist;
        // let albumType: Album;
        // artists.forEach((itemArtist) => {
        //   try {
        //     itemArtist != artistType.getName();
        //   } catch (error) {
        //     alert('incorrect name of artist');
        //   }
        // });
        // albums.forEach((itemAlbum) => {
        //   try {
        //     itemAlbum != albumType.getName();
        //   } catch (error) {
        //     alert('incorrect name of artist');
        //   }
        // });
  }

  public getName(): string {
    return this.name;
  }
  public getArtists(): string[] {
    return this.artists;
  }
  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist.getName());
  }
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete.getName());
  }

  public getGenres(): genrer[] {
    return this.genres;
  }
  public addGenre(newGenre: genrer): void {
    this.genres.push(newGenre);
  }
  public removeGenre(genreDelete: genrer): void {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }

  public getAlbums(): string[] {
    return this.albums;
  }
  public addAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum.getName());
  }
  public removeAlbum(albumDelete: Album): void {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete.getName());
  }
  // suma de oyentes de las canciones de sus albunes
  public getNumberListenersMonthly(): number {
    let listeners:number = 0;
    let typeAlbum: Album;
    this.getAlbums().forEach((album) => {
      if (album === typeAlbum.getName()) {
        typeAlbum.getSongs().forEach((song) => {
          listeners += song.monthlyReproductions();
        });
      }
    });
    return listeners;
  }
}
