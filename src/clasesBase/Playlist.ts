import {MusicGenre} from './MusicGenre';
import {Song} from './Song';
export type Duration = [number, number];


export class Playlist {
  private duration: Duration;
  constructor(private name: string, private songs: Song[],
              private genres: MusicGenre[],
              private readonly systemPlaylist: boolean = false) {
    let hours: number = 0;
    let minuts: number = 0;
    /*
    this.songs.forEach((element) => {
      hours += element.getDuration()[0];
      minuts += element.getDuration()[1];
    });
    */
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
  getGenres(): MusicGenre[] {
    return this.genres;
  }
  getSystemPlaylist() {
    return this.systemPlaylist;
  }
  setName(newName: string) {
    this.name = newName;
  }
  setSongs(songs: Song[]) {
    this.songs = songs;
    // recalculateDuration();
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
  */

  setGenres(genres: MusicGenre[]) {
    this.genres = genres;
  }
  showInfo() {
    console.log(`${this.name}\n  -Duration: ${this.duration[0]}h ${this.duration[1]}min\n`+
                `  -Genres: ${this.genres}\n  -Songs: ${this.songs}`);
  }
}