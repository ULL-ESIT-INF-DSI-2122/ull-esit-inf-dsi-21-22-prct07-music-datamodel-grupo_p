import {Group} from './Group';
import {MusicGenre} from './MusicGenre';
import {Album} from './Album';
import {Song} from './Song';
import {basicData} from '../interfaces/interfaces';


export class Artist implements basicData {
  constructor(private name: string, private groups: Group[],
      private genres: MusicGenre[], private albums: Album[], private songs: Song[]) {
  }

  public getName(): string {
    return this.name;
  }
  public setName(newName: string): void {
    this.name = newName;
  }
  public getGroups(): Group[] {
    return this.groups;
  }
  public setGroups(newGroups: Group[]): void {
    this.groups = newGroups;
  }
  public addGroup(newGroup: Group) {
    this.groups.push(newGroup);
  }
  public removeGroup(groupDelete: Group) {
    this.groups = this.groups.filter((elemento) => elemento !== groupDelete);
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

  public getAlbums(): Album[] {
    return this.albums;
  }
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
  }
  public addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }
  public removeAlbum(albumDelete: Album) {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
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
  // ---------- //
  public getNumberListenersMonthly(): number {
    let listenersGroups: number = 0;
    let listenerSongs: number = 0;
    this.getGroups().forEach((group) => {
      listenersGroups += group.getNumberListenersMonthly();
    });
    this.getSongs().forEach((song) => {
      listenerSongs += song.monthlyReproductions();
    });
    return listenerSongs + listenersGroups;
  }
  public showInfo(): void {
    let info: string = `ARTISTA ${this.name}
    Nombre: ${this.getName()}
    Grupos: ${this.getGroups().forEach((grupo) => {
    return grupo.getName();
  })}
    Genero/s: ${this.getGenres().forEach((genero) => {
    return genero.getName();
  })}
    Albums: ${(this.getAlbums().forEach((album) => {
    return album.getName();
  }))}
    Canciones: ${this.getSongs().forEach((song) => {
    return song.getName();
  })}`;
    console.log(info);
  }
}
