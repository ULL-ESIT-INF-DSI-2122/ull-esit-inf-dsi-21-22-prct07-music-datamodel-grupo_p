import {Artist} from './Artist';
import {Group} from './Group';
import {Album} from './Album';
import {Song} from './Song';

export class Genre {
  constructor(readonly name: string, private members: (Artist|Group)[] = [],
  private albums: Album[] = [], private songs: Song[] = []) {
  }

  public getMembers(): (Artist|Group)[] {
    return this.members;
  }
  public addMember(newMember: Artist|Group) {
    this.members.push(newMember);
  }
  public removeMember(memberDelete: Artist|Group) {
    this.members = this.members.filter((elemento) => elemento !== memberDelete);
  }

  public getAlbums(): Album[] {
    return this.albums;
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
  public addSong(newSong: Song) {
    this.songs.push(newSong);
  }
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }
  public print(): string {
    return (`GENERO ${this.name}
    Artistas o grupos que pertenecen al genero: ${this.getMembers()}
    Albunes que pertenecen al genero: ${this.getAlbums()}
    Canciones de este genero: ${this.getSongs()}`);
  }
}
