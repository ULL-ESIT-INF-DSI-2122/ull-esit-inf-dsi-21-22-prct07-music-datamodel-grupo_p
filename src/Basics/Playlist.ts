import {Genre} from './Genre';
import {Song} from './Song';

export type Duration = [number, number];


export class Playlist {
  private genres: Genre[];
  private duration: Duration;
  constructor(private name: string, private songs: Song[],
              private readonly systemPlaylist: boolean = false) {
    let hours: number = 0;
    let minuts: number = 0;
    let g: Genre[] = [];
    /*
    this.songs.forEach((s) => {
      hours += s.getDuration()[0];
      minuts += s.getDuration()[1];
      this.s.getGenres().forEach((g) => {
        if (genres.indexOf(g) === -1) {
          genres.push(element.getGenre);
        }
      });
    });
    */
    this.genres = g;
    this.duration = [hours + minuts/60, minuts%60];
  }
  getName(): string {
    return this.name;
  }
  getSongs(): Song[] {
    return this.songs;
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
  setName(newName: string): void {
    this.name = newName;
  }
  setSongs(songs: Song[]): void {
    this.songs = songs;
    // recalculateDuration();
    // updateGenres();
  }
  /*
  recalculateDuration() {
    let hours: number = 0;
    let minuts: number = 0;
    this.songs.forEach((element) => {
      hours += element.getDuration()[0];
      minuts += element.getDuration()[1];
    });
    this.duration = [hours + minuts/60, minuts%60];
  }
  updateGenres() {
    let g: Genre[] = [];
    this.songs.forEach((s) => {
      this.s.getGenres().forEach((g) => {
        if (genres.indexOf(g) === -1) {
          genres.push(element.getGenre);
        }
      });
    });
    this.genres = g;
  }
  */
  addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }
  deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
  }

  setGenres(genres: Genre[]): void {
    this.genres = genres;
  }
  showInfo(): void {
    console.log(`${this.name}\n  -Géneros: ${this.genres}\n  -Canciones: ${this.songs}\n`+
        `  -Playlist original: ${(this.systemPlaylist ? 'Sí' : 'No')}\n  -Duración: ${this.duration[0]}h ${this.duration[1]}min\n`);
  }
}