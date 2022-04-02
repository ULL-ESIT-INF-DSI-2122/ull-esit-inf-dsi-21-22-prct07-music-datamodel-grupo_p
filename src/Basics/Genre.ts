
export class Genre {
  constructor(private name: string, private musicians: string[],
      private albums: string[], private songs: string[]) {
  }
  getName(): string {
    return this.name;
  }
  setName(newName: string): void {
    this.name = newName;
  }
  getMusicians(): string[] {
    return this.musicians;
  }
  setMusicians(musicians: string[]): void {
    this.musicians = musicians;
  }
  addMusician(newMusician: string): void {
    if (this.musicians.find((m) => m === newMusician) === undefined) {
      this.musicians.push(newMusician);
    }
  }
  deleteMusician(musician: string): void {
    const index = this.musicians.indexOf(musician);
    this.musicians.splice(index, 1);
  }
  getAlbums(): string[] {
    return this.albums;
  }
  setAlbums(albums: string[]): void {
    this.albums = albums;
  }
  addAlbum(newAlbum: string): void {
    if (this.albums.find((m) => m === newAlbum) === undefined) {
      this.albums.push(newAlbum);
    }
  }
  deleteAlbum(album: string): void {
    const index = this.albums.indexOf(album);
    this.albums.splice(index, 1);
  }
  getSongs(): string[] {
    return this.songs;
  }
  setSongs(songs: string[]): void {
    this.songs = songs;
  }
  addSong(newSong: string): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }
  deleteSong(song: string): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
  }
  showInfo(): void {
    console.log(`${this.name}\n  -Grupos/Artistas: ${this.musicians}\n`+
                `  -Álbums: ${this.albums}\n  -Canciones: ${this.songs}`);
  }
}