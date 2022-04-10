import {BasicData} from '../../Interfaces/BasicData';
import {Album} from '../Album/Album';
import {Artist} from '../Artist/Artist';
import {Group} from '../Group/Group';
import {Song} from '../Song/Song';


export class Genre implements BasicData {
  constructor(private name: string, private musicians: (Group|Artist)[],
      private albums: Album[], private songs: Song[]) {
  }

  // GETTERS
  public getName(): string {
    return this.name;
  }
  public getMusicians(): (Group|Artist)[] {
    return this.musicians;
  }
  public getAlbums(): Album[] {
    return this.albums;
  }
  public getSongs(): Song[] {
    return this.songs;
  }
  public getMusiciansNames(): string[] {
    let musiciansNames: string[] = [];
    this.musicians.forEach((musician) => {
      musiciansNames.push(musician.getName());
    });
    return musiciansNames;
  }
  public getAlbumsNames(): string[] {
    let albumsNames: string[] = [];
    this.albums.forEach((album) => {
      albumsNames.push(album.getName());
    });
    return albumsNames;
  }
  public getSongsNames(): string[] {
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }
  // SETTERS
  public setName(newName: string): void {
    this.name = newName;
  }
  public setMusicians(musicians: (Group|Artist)[]): void {
    this.musicians = musicians;
  }
  public setAlbums(albums: Album[]): void {
    this.albums = albums;
  }
  public setSongs(songs: Song[]): void {
    this.songs = songs;
  }

  // ADDS
  public addMusician(newMusician: Group|Artist): void {
    if (this.musicians.find((m) => m === newMusician) === undefined) {
      this.musicians.push(newMusician);
    }
  }
  public addAlbum(newAlbum: Album): void {
    if (this.albums.find((m) => m === newAlbum) === undefined) {
      this.albums.push(newAlbum);
    }
  }
  public addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }

  // REMOVE
  public deleteMusician(musician: Group|Artist): void {
    const index = this.musicians.indexOf(musician);
    this.musicians.splice(index, 1);
  }
  public deleteAlbum(album: Album): void {
    const index = this.albums.indexOf(album);
    this.albums.splice(index, 1);
  }
  public deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
  }
}