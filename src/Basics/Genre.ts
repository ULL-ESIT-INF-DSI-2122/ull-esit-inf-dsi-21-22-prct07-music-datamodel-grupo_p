import {BasicData} from './BasicData';
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
 * Clase para representar un género musical.
 */
export class Genre extends BasicData {
  /**
   * Constructor de la clase `Genre`.
   * @param name Nombre.
   * @param musicians Gropos/Artistas.
   * @param albums Álbumes.
   * @param songs Canciones.
   */
  constructor(name: string, private musicians: (Group|Artist)[],
      private albums: Album[], private songs: Song[]) {
    super(name);
  }
  /**
   * Getter para la propiedad `musicians`.
   * @returns Devuelve el valor de`musicians`.
   */
  getMusicians(): (Group|Artist)[] {
    return this.musicians;
  }
  /**
   * Setter para la propiedad `musicians`.
   * @param musicians Nuevo valor de `musicians`.
   */
  setMusicians(musicians: (Group|Artist)[]): void {
    this.musicians = musicians;
  }
  /**
   * Agrega un grupo/artista al género.
   * @param newMusician Grupo/artista a agregar.
   */
  addMusician(newMusician: Group|Artist): void {
    if (this.musicians.find((m) => m === newMusician) === undefined) {
      this.musicians.push(newMusician);
    }
  }
  /**
   * Elimina un grupo/artista del género.
   * @param musician Grupo/artista a eliminar.
   */
  deleteMusician(musician: Group|Artist): void {
    const index = this.musicians.indexOf(musician);
    this.musicians.splice(index, 1);
  }
  /**
   * Getter para la propiedad `albums`.
   * @returns Devuelve el valor de`albums`.
   */
  getAlbums(): Album[] {
    return this.albums;
  }
  /**
   * Setter para la propiedad `albums`.
   * @param albums Nuevo valor de `albums`.
   */
  setAlbums(albums: Album[]): void {
    this.albums = albums;
  }
  /**
   * Agrega un álbum al género.
   * @param newAlbum Álbum a agregar.
   */
  addAlbum(newAlbum: Album): void {
    if (this.albums.find((m) => m === newAlbum) === undefined) {
      this.albums.push(newAlbum);
    }
  }
  /**
   * Elimina un álbum del género.
   * @param album Álbum a eliminar.
   */
  deleteAlbum(album: Album): void {
    const index = this.albums.indexOf(album);
    this.albums.splice(index, 1);
  }
  /**
   * Getter para la propiedad `songs`.
   * @returns Devuelve el valor de`songs`.
   */
  getSongs(): Song[] {
    return this.songs;
  }
  /**
   * Setter para la propiedad `songs`.
   * @param songs Nuevo valor de `songs`.
   */
  setSongs(songs: Song[]): void {
    this.songs = songs;
  }
  /**
   * Agrega una canción a al género.
   * @param newSong Canción a agregar.
   */
  addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }
  /**
   * Elimina una canción del género.
   * @param song Canción a eliminar.
   */
  deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
  }
  /**
   * Muestra la información de la playlist.
   * @returns Devuelve una cadena con la información de la playlist.
   */
  showInfo(): string {
    const info: string = `${this.name}\n  -Grupos/Artistas:\n    ${this.getMusiciansNames().join('\n    ')}\n`+
    `  -Álbums:\n    ${this.getAlbumsNames().join('\n    ')}\n  -Canciones:\n    ${this.getSongsNames().join('\n    ')}\n`;
    console.log(info);
    return info;
  }
  /**
   * Devuelve los nombres de los grupos/artistas del género.
   * @returns Devuelve un array con los nombres de los grupos/artistas del género.
   */
  getMusiciansNames(): string[] {
    let musiciansNames: string[] = [];
    this.musicians.forEach((musician) => {
      musiciansNames.push(musician.getName());
    });
    return musiciansNames;
  }
  /**
   * Devuelve los nombres de los álbumes del género.
   * @returns Devuelve un array con los nombres de los álbumes del género.
   */
  getAlbumsNames(): string[] {
    let albumsNames: string[] = [];
    this.albums.forEach((album) => {
      albumsNames.push(album.getName());
    });
    return albumsNames;
  }
  /**
   * Devuelve los nombres de las canciones del género.
   * @returns Devuelve un array con los nombres de las canciones del género.
   */
  getSongsNames(): string[] {
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }

  /**
   * Deserializa un objeto `GenreInterface`.
   * @param genre Objeto `GenreInterface`.
   * @returns Devuelve un nuevo objeto `Genre`.
   */
  public static deserialize(genre: GenreInterface): Genre {
    let musicians: (Group|Artist)[] = [];
    let albums: Album[] = [];
    let songs: Song[] = [];
    genre.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().searchByName(s.name)),
    );
    genre.albums.forEach((a) =>
      albums.push(AlbumManager.getAlbumManager().searchByName(a.name)),
    );
    genre.musicians.forEach((m) => {
      if ('groups' in m) {
        musicians.push(ArtistManager.getArtistManager().searchByName(m.name));
      } else {
        musicians.push(GroupManager.getGroupManager().searchByName(m.name));
      }
    });
    return new Genre(genre.name, musicians, albums, songs);
  }
}