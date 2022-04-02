import {Album} from './Album';
import {Artist} from './Artist';
import {Group} from './Group';
import {Song} from './Song';

export class Genre {
  constructor(private name: string, private musicians: (Group|Artist)[],
              private albums: Album[], private songs: Song[]) {
  }
  getName(): string {
    return this.name;
  }
  getMusicians(): (Group|Artist)[] {
    return this.musicians;
  }
  getAlbums(): Album[] {
    return this.albums;
  }
  getSongs(): Song[] {
    return this.songs;
  }
  setName(newName: string): void {
    this.name = newName;
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
  setAlbums(albums: Album[]): void {
    this.albums = albums;
  }
  setSongs(songs: Song[]): void {
    this.songs = songs;
  }
  showInfo(): void {
    console.log(`${this.name}\n  -Grupos/Artistas: ${this.musicians}\n`+
                `  -Álbums: ${this.albums}\n  -Canciones: ${this.songs}`);
  }
}