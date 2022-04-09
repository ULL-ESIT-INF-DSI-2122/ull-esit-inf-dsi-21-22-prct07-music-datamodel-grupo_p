import {Order} from '../Inquirer/PlaylistsMenu';
import {BasicData} from '../Interfaces/BasicData';
import {PlaylistInterface} from '../Interfaces/PlaylistInterface';
import {GenreManager} from '../Managers/GenreManager';
import {SongManager} from '../Managers/SongManager';
import {Genre} from './Genre';
import {Song} from './Song';

export type Duration = [number, number];


export class Playlist implements BasicData {
  private genres: Genre[];
  private duration: Duration;
  constructor(private name: string, private songs: Song[],
              private systemPlaylist: boolean = false) {
    this.genres = [];
    this.duration = [0, 0];
    this.recalculateDuration();
    this.updateGenres();
  }
  getName(): string {
    return this.name;
  }
  setName(newName: string): void {
    this.name = newName;
  }
  getSongs(): Song[] {
    return this.songs;
  }
  setSongs(songs: Song[]): void {
    this.songs = songs;
    this.recalculateDuration();
    this.updateGenres();
  }
  addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
    this.recalculateDuration();
    this.updateGenres();
  }
  deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
    this.recalculateDuration();
    this.updateGenres();
  }
  getDuration(): Duration {
    return this.duration;
  }
  getGenres(): Genre[] {
    return this.genres;
  }
  getSystemPlaylist(): boolean {
    return this.systemPlaylist;
  }
  setSystemPlaylist(flag: boolean): void {
    this.systemPlaylist = flag;
  }
  private recalculateDuration() {
    let minuts: number = 0;
    let seconds: number = 0;
    this.songs.forEach((song) => {
      minuts += song.getDuration()[0];
      seconds += song.getDuration()[1];
    });
    this.duration = [Math.trunc(minuts/60), minuts%60 + Math.trunc(seconds/60)];
  }

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

  showInfo(order: Order = 0): string {
    const info: string = `${this.name}\n  -Géneros: ${this.getGenresNames()}\n  -Playlist original: ${(this.systemPlaylist ? 'Sí' : 'No')}\n`+
       `  -Duración: ${this.duration[0]}h ${this.duration[1]}min\n  -Canciones:\n    ${this.getSongsNames(order).join('\n    ')}\n`;
    console.log(info);
    return info;
  }

  private getGenresNames(): string[] {
    let genresNames: string[] = [];
    this.genres.map((genre) => {
      genresNames.push(genre.getName());
    });
    return genresNames;
  }

  public static deserialize(playlist: PlaylistInterface): Playlist {
    let songs: Song[] = [];
    playlist.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().getSongByName(s.name) as Song),
    );
    return new Playlist(playlist.name, songs, playlist.systemPlaylist);
  }
}

