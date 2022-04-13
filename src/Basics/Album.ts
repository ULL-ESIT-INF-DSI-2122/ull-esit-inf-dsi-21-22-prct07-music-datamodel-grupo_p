import {Song} from './Song';
import {BasicData} from './BasicData';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {SongManager} from '../Managers/SongManager';
import {Genre} from './Genre';


export class Album extends BasicData {
  constructor(name: string, private whoPublishes: string,
    private publicationYear: number, private genres: string[],
    private songs: Song[]) {
    super(name);
  }

  // GETTERS
  public getPublisher(): string {
    return this.whoPublishes;
  }
  public getYear(): number {
    return this.publicationYear;
  }
  public getGenres(): string[] {
    return this.genres;
  }
  public getSongs(): Song[] {
    return this.songs;
  }
  // SETTERS
  public setPublisher(newPublisher: string): void {
    this.whoPublishes = newPublisher;
  }
  public setYear(year: number): void {
    this.publicationYear = year;
  }
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  // ADDS
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  public addSong(newSong: Song) {
    if (this.songs.find((song) => song === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }
  // REMOVES
  public removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }
  public static deserialize(album: AlbumInterface): Album {
    let songs: Song[] = [];
    album.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().searchByName(s.name) as Song),
    );
    return new Album(album.name, album.whoPublishes, album.publicationYear, album.genres, songs);
  }

  public showInfo(): string {
    const info: string = `ÁLBUM ${this.name}
    -Publicado por: ${this.whoPublishes}
    -Año de publicacion: ${this.publicationYear}
    -Genero: ${this.genres}
    -Canciones: 
      ${this.songs.map((song) => {
    return song.getName();
  }).join('\n      ')}`;
    console.log(info);
    return info;
  }

  getSongsNames(): string[] {
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }
}
