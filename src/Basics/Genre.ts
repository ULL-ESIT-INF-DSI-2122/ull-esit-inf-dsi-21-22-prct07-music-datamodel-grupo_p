import {BasicData} from '../Interfaces/BasicData';
import {GenreInterface} from '../Interfaces/GenreInterface';
import {SongManager} from '../Managers/SongManager';
import {Album} from './Album';
import {Artist} from './Artist';
import {Group} from './Group';
import {Song} from './Song';
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
    const info: string = `${this.name}\n  -Grupos/Artistas:\n    ${this.getMusiciansNames().join('\n    ')}\n`+
    `  -Álbums:\n    ${this.getAlbumsNames().join('\n    ')}\n  -Canciones:\n    ${this.getSongsNames().join('\n    ')}\n`;
    console.log(info);
    return info;
  }

  private getMusiciansNames(): string[] {
    let musiciansNames: string[] = [];
    this.musicians.forEach((musician) => {
      musiciansNames.push(musician.getName());
    });
    return musiciansNames;
  }

  private getAlbumsNames(): string[] {
    let albumsNames: string[] = [];
    this.albums.forEach((album) => {
      albumsNames.push(album.getName());
    });
    return albumsNames;
  }
  private getSongsNames(): string[] {
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
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
      if ('groups' in m) {
        musicians.push(ArtistManager.getArtistManager().getArtistByName(m.name) as Artist);
      } else {
        musicians.push(GroupManager.getGroupManager().getGroupByName(m.name) as Group);
      }
    });
    return new Genre(genre.name, musicians, albums, songs);
  }
}