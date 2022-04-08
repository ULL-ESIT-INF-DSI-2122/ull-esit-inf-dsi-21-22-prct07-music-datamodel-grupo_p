import {BasicData} from '../Interfaces/BasicData';
import {GenreInterface} from '../Interfaces/GenreInterface';
import {ArtistInterface} from '../Interfaces/ArtistInterface';
import {SongManager} from '../Managers/SongManager';
import {Album} from './Album';
import {Artist} from './Artist';
import {Group} from './Group';
import {Song} from './Song';
import {GroupInterface} from '../Interfaces/GroupInterface';
import {AlbumManager} from '../Managers/AlbumManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {GroupManager} from '../Managers/GroupManager';

export class Genre implements BasicData {
  constructor(private name: string, private musicians: (Group|Artist)[],
      private albums: Album[], private songs: Song[]) {
  }
  getName(): string {
    return this.name;
  }
  setName(newName: string): void {
    this.name = newName;
  }
  getMusicians(): (Group|Artist)[] {
    return this.musicians;
  }
  setMusicians(musicians: (Group|Artist)[]): void {
    this.musicians = musicians;
  }
  addMusician(newMusician: Group|Artist): void {
    if (this.musicians.find((m) => m === newMusician) === undefined) {
      this.musicians.push(newMusician);
    }
  }
  deleteMusician(musician: Group|Artist): void {
    const index = this.musicians.indexOf(musician);
    this.musicians.splice(index, 1);
  }
  getAlbums(): Album[] {
    return this.albums;
  }
  setAlbums(albums: Album[]): void {
    this.albums = albums;
  }
  addAlbum(newAlbum: Album): void {
    if (this.albums.find((m) => m === newAlbum) === undefined) {
      this.albums.push(newAlbum);
    }
  }
  deleteAlbum(album: Album): void {
    const index = this.albums.indexOf(album);
    this.albums.splice(index, 1);
  }
  getSongs(): Song[] {
    return this.songs;
  }
  setSongs(songs: Song[]): void {
    this.songs = songs;
  }
  addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }
  deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
  }
  showInfo(): string {
    const info: string = `${this.name}\n  -Grupos/Artistas: ${this.musicians}\n`+
    `  -Álbums: ${this.albums}\n  -Canciones: ${this.songs}`;
    console.log(info);
    return info;
  }

  public static deserialize(genre: GenreInterface): Genre {
    let musicians: (Group|Artist)[] = [];
    let albums: Album[] = [];
    let songs: Song[] = [];
    genre.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().getSongByName(s.name) as Song),
    );
    genre.albums.forEach((a) =>
      albums.push(AlbumManager.getAlbumManager().getAlbumByName(a.name) as Album),
    );
    genre.musicians.forEach((m) => {
      if (m instanceof ArtistInterface) {
        musicians.push(ArtistManager.getArtistManager().getArtistByName(m.name) as Artist);
      } else if (m instanceof GroupInterface) {
        musicians.push(GroupManager.getGroupManager().getGroupByName(m.name) as Group);
      }
    });
    return new Genre(genre.name, musicians, albums, songs);
  }
}