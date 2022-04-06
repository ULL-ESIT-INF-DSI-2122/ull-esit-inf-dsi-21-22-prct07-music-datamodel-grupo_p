import {Group} from './Group';
import {Album} from './Album';
import {Song} from './Song';
import {genrer} from './MusicGenre';

export class Artist {
  constructor(readonly name: string, private groups: Group[],
      private genres: genrer[], private albums: Album[], private songs: Song[]) {
  }

  public getName(): string {
    return this.name;
  }
  public getGroups(): Group[] {
    return this.groups;
  }
  public addGroup(newGroup: Group) {
    this.groups.push(newGroup);
  }
  public removeGroup(groupDelete: Group) {
    this.groups = this.groups.filter((elemento) => elemento !== groupDelete);
  }

  public getGenres(): genrer[] {
    return this.genres;
  }
  public addGenre(newGenre: genrer) {
    this.genres.push(newGenre);
  }
  public removeGenre(genreDelete: genrer) {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
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
}
