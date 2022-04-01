export type Group = string;
export type Artist = string;
export type Album = string;
export type Song = string;

export class MusicGenre {
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
  addMusician(newMusician: Group|Artist) {
    if (this.musicians.find((m) => m === newMusician) === undefined) {
      this.musicians.push(newMusician);
    }
  }
  removeMusician(musician: Group|Artist) {
    const index = this.musicians.indexOf(musician);
    this.musicians.splice(index, 1);
  }
  setAlbums(albums: Album[]): void {
    this.albums = albums;
  }
  setSongs(songs: Song[]): void {
    this.songs = songs;
  }
  showInfo() {
    console.log(`${this.name}\n  -Groups/Artists: ${this.musicians}\n`+
                `  -Albums: ${this.albums}\n  -Songs: ${this.songs}`);
  }
}