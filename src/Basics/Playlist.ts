import {GenresManager} from '../Managers/GenresManager';
import {Genre} from './Genre';
import {Song} from './Song';

export type Duration = [number, number];


export class Playlist {
  private genres: Genre[];
  private duration: Duration;
  constructor(private name: string, private songs: Song[],
              private systemPlaylist: boolean = false) {
    let minuts: number = 0;
    let seconds: number = 0;
    let genres: Genre[] = [];
    this.songs.forEach((s: Song) => {
      minuts += s.getDuration()[0];
      seconds += s.getDuration()[1];
      s.getGenres().forEach((g) => {
        if ((genres.find((x: Genre) => x.getName() === g)) === undefined) {
          genres.push(GenresManager.getGenresManager().getGenreByName(g) as Genre);
        }
      });
    });
    this.genres = genres;
    this.duration = [Math.trunc(minuts/60), minuts%60 + Math.trunc(seconds/60)];
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

  private updateGenres() {
    this.genres = [];
    this.songs.forEach((s) => {
      s.getGenres().forEach((g) => {
        if ((this.genres.find((x: Genre) => x.getName() === g)) === undefined) {
          this.genres.push(GenresManager.getGenresManager().getGenreByName(g) as Genre);
        }
      });
    });
  }

  showInfo(): string {
    const info: string = `${this.name}\n  -Géneros: ${this.getGenresNames()}\n  -Canciones: ${this.getSongsNames()}\n`+
       `  -Playlist original: ${(this.systemPlaylist ? 'Sí' : 'No')}\n  -Duración: ${this.duration[0]}h ${this.duration[1]}min\n`;
    console.log(info);
    return info;
  }
  private getSongsNames(): string[] {
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }
  private getGenresNames(): string[] {
    let genresNames: string[] = [];
    this.genres.forEach((genre) => {
      genresNames.push(genre.getName());
    });
    return genresNames;
  }
}
