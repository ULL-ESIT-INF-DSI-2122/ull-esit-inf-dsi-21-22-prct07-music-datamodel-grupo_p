import {BasicData} from './BasicData';
import {PlaylistInterface} from '../Interfaces/PlaylistInterface';
import {GenreManager} from '../Managers/GenreManager';
import {SongManager} from '../Managers/SongManager';
import {Genre} from './Genre';
import {Song} from './Song';

/**
 * Tipo para la duración.
 */
export type Duration = [number, number];
/**
 * Tipo para la selección del orden.
 */
export type Order = 0|1|2|3|4|5|6|7|8|9|10|11;
/**
 * Clase para representar una playlist.
 */
export class Playlist extends BasicData {
  /**
   * Array de géneros.
   */
  private genres: Genre[];
  /**
   * Duración de la playlist.
   */
  private duration: Duration;
  /**
   * Constructor de la clase `Playlist`.
   * @param name Nombre.
   * @param songs Canciones.
   * @param systemPlaylist True si es una playlist creada por el sistema.
   */
  constructor(name: string, private songs: Song[],
              private systemPlaylist: boolean = false) {
    super(name);
    this.genres = [];
    this.duration = [0, 0];
    this.recalculateDuration();
    this.updateGenres();
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
    this.recalculateDuration();
    this.updateGenres();
  }
  /**
   * Agrega una canción a la playlist.
   * @param newSong Canción a agregar.
   */
  addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
    this.recalculateDuration();
    this.updateGenres();
  }
  /**
   * Elimina una canción de la playlist.
   * @param song Canción a eliminar.
   */
  deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
    this.recalculateDuration();
    this.updateGenres();
  }
  /**
   * Getter para la propiedad `duration`.
   * @returns Devuelve el valor de`duration`.
   */
  getDuration(): Duration {
    return this.duration;
  }
  /**
   * Getter para la propiedad `genres`.
   * @returns Devuelve el valor de`genres`.
   */
  getGenres(): Genre[] {
    return this.genres;
  }
  /**
   * Getter para la propiedad `systemPlaylist`.
   * @returns Devuelve el valor de`systemPlaylist`.
   */
  getSystemPlaylist(): boolean {
    return this.systemPlaylist;
  }
  /**
   * Setter para la propiedad `systemPlaylist`.
   * @param flag Nuevo valor de `systemPlaylist`.
   */
  setSystemPlaylist(flag: boolean): void {
    this.systemPlaylist = flag;
  }
  /**
   * Recalcula la duración total de la playlist.
   */
  recalculateDuration(): void {
    let minuts: number = 0;
    let seconds: number = 0;
    this.songs.forEach((song) => {
      minuts += song.getDuration()[0];
      seconds += song.getDuration()[1];
    });
    this.duration = [Math.trunc(minuts/60), minuts%60 + Math.trunc(seconds/60)];
  }

  /**
   * Actualiza los géneros de la playlist a partir de sus canciones.
   */
  updateGenres() {
    this.genres = [];
    this.songs.forEach((s) => {
      s.getGenres().forEach((g) => {
        if (this.genres.length === 0 || ((this.genres.find((x: Genre) => x.getName() === g)) === undefined)) {
          this.genres.push(GenreManager.getGenreManager().searchByName(g));
        }
      });
    });
  }

  /**
   * Devuelve los nombres de las canciones en orden.
   * @param order Variable para indicar el orden.
   * @returns Devuelve un array con los nombres de las canciones en el orden indicado.
   */
  getSongsNames(order: Order = 0): string[] {
    switch (order) {
      case 0:
        this.songs.sort(function(a, b) {
          if (a.getName() < b.getName()) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 1:
        this.songs.sort(function(a, b) {
          if (a.getName() > b.getName()) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 2:
        this.songs.sort(function(a, b) {
          if (a.getAuthorName() < b.getAuthorName()) {
            return -1;
          }
          if (a.getAuthorName() > b.getAuthorName()) {
            return 1;
          }
          return 0;
        });
        break;
      case 3:
        this.songs.sort(function(a, b) {
          if (a.getAuthorName() > b.getAuthorName()) {
            return -1;
          }
          if (a.getAuthorName() < b.getAuthorName()) {
            return 1;
          }
          return 0;
        });
        break;
      case 4:
        this.songs.sort(function(a, b) {
          if (a.getPublicationDate() < b.getPublicationDate()) {
            return -1;
          }
          if (a.getPublicationDate() > b.getPublicationDate()) {
            return 1;
          }
          return 0;
        });
        break;
      case 5:
        this.songs.sort(function(a, b) {
          if (a.getPublicationDate() > b.getPublicationDate()) {
            return -1;
          }
          if (a.getPublicationDate() < b.getPublicationDate()) {
            return 1;
          }
          return 0;
        });
        break;
      case 6:
        this.songs.sort(function(a, b) {
          if ((a.getDuration()[0]*60 + a.getDuration()[1]) < (b.getDuration()[0]*60 + b.getDuration()[1])) {
            return -1;
          }
          if ((a.getDuration()[0]*60 + a.getDuration()[1]) > (b.getDuration()[0]*60 + b.getDuration()[1])) {
            return 1;
          }
          return 0;
        });
        break;
      case 7:
        this.songs.sort(function(a, b) {
          if ((a.getDuration()[0]*60 + a.getDuration()[1]) > (b.getDuration()[0]*60 + b.getDuration()[1])) {
            return -1;
          }
          if ((a.getDuration()[0]*60 + a.getDuration()[1]) < (b.getDuration()[0]*60 + b.getDuration()[1])) {
            return 1;
          }
          return 0;
        });
        break;
      case 8:
        this.songs.sort(function(a, b) {
          if (a.getGenres()[0] < b.getGenres()[0]) {
            return -1;
          }
          if (a.getGenres()[0] > b.getGenres()[0]) {
            return 1;
          }
          return 0;
        });
        break;
      case 9:
        this.songs.sort(function(a, b) {
          if (a.getGenres()[0] > b.getGenres()[0]) {
            return -1;
          }
          if (a.getGenres()[0] < b.getGenres()[0]) {
            return 1;
          }
          return 0;
        });
        break;
      case 10:
        this.songs.sort(function(a, b) {
          if (a.getReproductions() < b.getReproductions()) {
            return -1;
          }
          if (a.getReproductions() > b.getReproductions()) {
            return 1;
          }
          return 0;
        });
        break;
      case 11:
        this.songs.sort(function(a, b) {
          if (a.getReproductions() > b.getReproductions()) {
            return -1;
          }
          if (a.getReproductions() < b.getReproductions()) {
            return 1;
          }
          return 0;
        });
        break;
    }
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }
  /**
   * Muestra la información de la playlist.
   * @returns Devuelve una cadena con la información de la playlist.
   */
  showInfo(order: Order = 0): string {
    const info: string = `PLAYLIST ${this.name}
    -Géneros: ${this.getGenresNames()}
    -Playlist original: ${(this.systemPlaylist ? 'Sí' : 'No')}
    -Duración: ${this.duration[0]}h ${this.duration[1]}min
    -Canciones:
      ${this.getSongsNames(order).join('\n      ')}`;
    console.log(info);
    return info;
  }


  public getMusicians(): string[] {
    const artistList: string[] = this.getSongs().map((song) => song.getAuthorName());
    // const artistList = artistLists.reduce((acumulated, newList) => acumulated.concat(newList));
    return artistList;
  }


  /**
   * Devuelve los nombres de los géneros de la playlist.
   * @returns Devuelve un array con los nombres de los géneros de la playlist.
   */
  private getGenresNames(): string[] {
    let genresNames: string[] = [];
    this.genres.map((genre) => {
      genresNames.push(genre.getName());
    });
    return genresNames;
  }
  /**
   * Deserializa un objeto `PlaylistInterface`.
   * @param playlist Objeto `PlaylistInterface`.
   * @returns Devuelve un nuevo objeto `Playlist`.
   */
  public static deserialize(playlist: PlaylistInterface): Playlist {
    let songs: Song[] = [];
    playlist.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().searchByName(s.name)),
    );
    return new Playlist(playlist.name, songs, playlist.systemPlaylist);
  }
}

