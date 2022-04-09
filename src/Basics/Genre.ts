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

/**
 * Class to represent a music genre.
 */
export class Genre implements BasicData {
  /**
   * Constructor for the `Genre` class.
   * @param name Name.
   * @param musicians Groups/Artists.
   * @param albums Albums.
   * @param songs Songs.
   */
  constructor(private name: string, private musicians: (Group|Artist)[],
      private albums: Album[], private songs: Song[]) {
  }
  /**
   * Getter for the property `name`.
   * @returns Returns the value of `name`.
   */
  getName(): string {
    return this.name;
  }
  /**
   * Setter for the property `name`.
   * @param newName New value of `name`.
   */
  setName(newName: string): void {
    this.name = newName;
  }
  /**
   * Getter for the property `musicians`.
   * @returns Returns the value of `musicians`.
   */
  getMusicians(): (Group|Artist)[] {
    return this.musicians;
  }
  /**
   * Setter for the property `musicians`.
   * @param musicians New value of `musicians`.
   */
  setMusicians(musicians: (Group|Artist)[]): void {
    this.musicians = musicians;
  }
  /**
   * Adds a musician to the genre.
   * @param newMusician Musician to add.
   */
  addMusician(newMusician: Group|Artist): void {
    if (this.musicians.find((m) => m === newMusician) === undefined) {
      this.musicians.push(newMusician);
    }
  }
  /**
   * Deletes a group/artist from the genre.
   * @param musician Group/artist to delete.
   */
  deleteMusician(musician: Group|Artist): void {
    const index = this.musicians.indexOf(musician);
    this.musicians.splice(index, 1);
  }
  /**
   * Getter for the property `albums`.
   * @returns Returns the value of `albums`.
   */
  getAlbums(): Album[] {
    return this.albums;
  }
  /**
   * Setter for the property `albums`.
   * @param albums New value of `albums`.
   */
  setAlbums(albums: Album[]): void {
    this.albums = albums;
  }
  /**
   * Adds an album to the genre.
   * @param newAlbum Album to add.
   */
  addAlbum(newAlbum: Album): void {
    if (this.albums.find((m) => m === newAlbum) === undefined) {
      this.albums.push(newAlbum);
    }
  }
  /**
   * Deletes an album from the genre.
   * @param album Album to delete.
   */
  deleteAlbum(album: Album): void {
    const index = this.albums.indexOf(album);
    this.albums.splice(index, 1);
  }
  /**
   * Getter for the property `songs`.
   * @returns Returns the value of `songs`.
   */
  getSongs(): Song[] {
    return this.songs;
  }
  /**
   * Setter for the property `songs`.
   * @param songs New value of `songs`.
   */
  setSongs(songs: Song[]): void {
    this.songs = songs;
  }
  /**
   * Adds a song to the genre.
   * @param newSong Song to add.
   */
  addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }
  /**
   * Deletes a song from the genre.
   * @param song Song to delete.
   */
  deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
  }
  /**
   * Shows the genre's information.
   * @returns Returns a string with the genre's information.
   */
  showInfo(): string {
    const info: string = `${this.name}\n  -Grupos/Artistas:\n    ${this.getMusiciansNames().join('\n    ')}\n`+
    `  -Álbums:\n    ${this.getAlbumsNames().join('\n    ')}\n  -Canciones:\n    ${this.getSongsNames().join('\n    ')}\n`;
    console.log(info);
    return info;
  }
  /**
   * Returns the `musicians` names.
   * @returns Returns an array with the `musicians` names.
   */
  getMusiciansNames(): string[] {
    let musiciansNames: string[] = [];
    this.musicians.forEach((musician) => {
      musiciansNames.push(musician.getName());
    });
    return musiciansNames;
  }
  /**
   * Returns the `albums` names.
   * @returns Returns an array with the `albums` names.
   */
  getAlbumsNames(): string[] {
    let albumsNames: string[] = [];
    this.albums.forEach((album) => {
      albumsNames.push(album.getName());
    });
    return albumsNames;
  }
  /**
   * Returns the `songs` names.
   * @returns Returns an array with the `songs` names.
   */
  getSongsNames(): string[] {
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }

  /**
   * Deserializes a `GenreInterface` object.
   * @param genre `GenreInterface` object
   * @returns Returns a new `Genre` object .
   */
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