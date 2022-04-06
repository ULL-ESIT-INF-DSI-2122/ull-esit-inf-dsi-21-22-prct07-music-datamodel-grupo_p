import {Album} from './Album';
import {Artist} from './Artist';
import {MusicGenre} from './MusicGenre';
import {basicData} from '../interfaces/interfaces';

export class Group implements basicData {
  constructor(private name: string, private artists: Artist[],
      private yearCreation: number, private genres: MusicGenre[],
      private albums: Album[]) {
  }

  public getName(): string {
    return this.name;
  }
  public setName(newName: string): void {
    this.name = newName;
  }
  public getArtists(): Artist[] {
    return this.artists;
  }
  public setArtists(newArtists: Artist[]): void {
    this.artists = newArtists;
  }
  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }
  public getYearCreation(): number {
    return this.yearCreation;
  }
  public setYearCreation(newYear: number): void {
    this.yearCreation = newYear;
  }
  public getGenres(): MusicGenre[] {
    return this.genres;
  }
  public addGenre(newGenre: MusicGenre): void {
    this.genres.push(newGenre);
  }
  public removeGenre(genreDelete: MusicGenre): void {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }
  public setGenres(newGenres:MusicGenre[]): void {
    this.genres = newGenres;
  }

  public getAlbums(): Album[] {
    return this.albums;
  }
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
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
      album.getSongs().forEach((song) => {
        listeners += song.monthlyReproductions();
      });
    });
    return listeners;
  }
  public showInfo(): void {
    let info: string = `GRUPO ${this.name}
    Nombre: ${this.getName()}
    Artistas: ${this.getArtists().forEach((artist) => {
    return artist.getName();
  })}
    Genero/s: ${this.getGenres().forEach((genero) => {
    return genero.getName();
  })}
    Albums: ${(this.getAlbums().forEach((album) => {
    return album.getName();
  }))}
    Año creacion: ${this.getYearCreation()})}`;
    console.log(info);
  }
}
