import {BasicData} from '../Interfaces/BasicData';
import {PlaylistInterface} from '../Interfaces/PlaylistInterface';
import {GenreManager} from '../Managers/GenreManager';
import {SongManager} from '../Managers/SongManager';
import {Genre} from './Genre';
import {Song} from './Song';

/**
 * Type for the duration.
 */
export type Duration = [number, number];
/**
 * Type for the order selection.
 */
export type Order = 0|1|2|3|4|5|6|7|8|9|10|11;
/**
 * Class to represent a playlist.
 */
export class Playlist implements BasicData {
  /**
   * Genres array.
   */
  private genres: Genre[];
  /**
   * Playlist duration.
   */
  private duration: Duration;
  /**
   * Constructor for the class `Playlist`.
   * @param name Name.
   * @param songs Songs.
   * @param systemPlaylist True if is a playlist created by the system.
   */
  constructor(private name: string, private songs: Song[],
              private systemPlaylist: boolean = false) {
    this.genres = [];
    this.duration = [0, 0];
    this.recalculateDuration();
    this.updateGenres();
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
    this.recalculateDuration();
    this.updateGenres();
  }
  /**
   * Adds a song to the genre.
   * @param newSong Song to add.
   */
  addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
    this.recalculateDuration();
    this.updateGenres();
  }
  /**
   * Deletes a song from the genre.
   * @param song Song to delete.
   */
  deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
    this.recalculateDuration();
    this.updateGenres();
  }
  /**
   * Getter for the property `dutation`.
   * @returns Returns the value of `dutation`.
   */
  getDuration(): Duration {
    return this.duration;
  }
  /**
   * Getter for the property `genres`.
   * @returns Returns the value of `genres`.
   */
  getGenres(): Genre[] {
    return this.genres;
  }
  /**
   * Getter for the property `systemPlaylist`.
   * @returns Returns the value of `systemPlaylist`.
   */
  getSystemPlaylist(): boolean {
    return this.systemPlaylist;
  }
  /**
   * Setter for the property `systemPlaylist`.
   * @param flag New value of `systemPlaylist`.
   */
  setSystemPlaylist(flag: boolean): void {
    this.systemPlaylist = flag;
  }
  /**
   * Recalculates the total playlist duration.
   */
  private recalculateDuration(): void {
    let minuts: number = 0;
    let seconds: number = 0;
    this.songs.forEach((song) => {
      minuts += song.getDuration()[0];
      seconds += song.getDuration()[1];
    });
    this.duration = [Math.trunc(minuts/60), minuts%60 + Math.trunc(seconds/60)];
  }

  /**
   * Updates playlist genres based on the songs.
   */
  updateGenres() {
    this.genres = [];
    this.songs.forEach((s) => {
      s.getGenres().forEach((g) => {
        if ((this.genres.find((x: Genre) => x.getName() === g)) === undefined) {
          this.genres.push(GenreManager.getGenreManager().getGenreByName(g) as Genre);
        }
      });
    });
  }

  /**
   * Returns songs names in order.
   * @param order Flag to indicate th order.
   * @returns Returns an array of songs names in an specific order.
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
   * Shows the playlist's information.
   * @returns Returns a string with the playlist's information.
   */
  showInfo(order: Order = 0): string {
    const info: string = `${this.name}\n  -Géneros: ${this.getGenresNames()}\n  -Playlist original: ${(this.systemPlaylist ? 'Sí' : 'No')}\n`+
       `  -Duración: ${this.duration[0]}h ${this.duration[1]}min\n  -Canciones:\n    ${this.getSongsNames(order).join('\n    ')}\n`;
    console.log(info);
    return info;
  }

  /**
   * Returns the `genres` names.
   * @returns Returns an array with the `genres` names.
   */
  private getGenresNames(): string[] {
    let genresNames: string[] = [];
    this.genres.map((genre) => {
      genresNames.push(genre.getName());
    });
    return genresNames;
  }
  /**
   * Deserializes a `PlaylistInterface` object.
   * @param playlist `PlaylistInterface` object
   * @returns Returns a new `Playlist` object .
   */
  public static deserialize(playlist: PlaylistInterface): Playlist {
    let songs: Song[] = [];
    playlist.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().getSongByName(s.name) as Song),
    );
    return new Playlist(playlist.name, songs, playlist.systemPlaylist);
  }
}

