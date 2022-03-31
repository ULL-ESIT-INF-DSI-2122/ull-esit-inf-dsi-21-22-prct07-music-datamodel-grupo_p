import {Artist} from './Artist';
import {Group} from './Group';
import {Album} from './Album';
import {Song} from './Song';

export class Genre {
  constructor(readonly name: string, private who: (Artist|Group)[],
  private albums: Album[], private songs: Song[]) {
    this.who = [];
    this.albums = [];
    this.songs = [];
  }

  public getWho(): (Artist|Group)[] {
    return this.who;
  }
  public setWho(newMember: (Artist|Group)[]): void {
    this.who = this.who.concat(newMember);
  }
  public getAlbums(): (Artist|Group)[] {
    return this.albums;
  }
  public setAlbums(newAlbum: Album[]): void {
    this.who = this.who.concat(newAlbum);
  }
  public getSongs(): (Artist|Group)[] {
    return this.who;
  }
  public setSongs(newSong: Song[]): void {
    this.who = this.who.concat(newSong);
  }
  public print(): string {
    return (`GENERO ${this.name}
    Artistas o grupos que pertenecen al genero: ${this.getWho}
    Albunes que pertenecen al genero: ${this.albums}
    Canciones de este genero: ${this.songs}`);
  }
}
