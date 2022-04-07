import {Genre} from '../Basics/Genre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
type schemaType = {
    genres: { name: string; musicians: string[]; albums: string[], songs: string[] }[]
};
export class GenresManager extends Manager<Genre> {
  private static genresManager: GenresManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Genres.json'));
    if (this.database.has('genres').value()) {
      let dbItems = this.database.get('genres').value();
      dbItems.forEach((item) => this.collection.add(new Genre(
          item.name, item.musicians, item.albums, item.songs,
      )));
    }
  }

  public static getGenresManager(): GenresManager {
    if (!GenresManager.genresManager) {
      GenresManager.genresManager = new GenresManager();
    }
    return GenresManager.genresManager;
  }

  addGenre(genre: Genre): void {
    this.collection.add(genre);
    this.storeGenres();
  }
  removeGenre(genre: Genre): void {
    this.collection.forEach((element) => {
      if (element.getName() === genre.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeGenres();
  }
  editGenre(genre: Genre, newName: string, newMusicians: string[],
      newAlbums: string[], newSongs: string[] ): void {
    this.collection.forEach((element) => {
      if (element.getName() === genre.getName()) {
        element.setName(newName);
        element.setMusicians(newMusicians);
        element.setAlbums(newAlbums);
        element.setSongs(newSongs);
      }
    });
    this.storeGenres();
  }
  getGenreByName(name:string): Genre|undefined {
    return ([...this.collection.values()].find((genre) => genre.getName() === name));
  }
  // ====================
  updateMusician(musician: string, genres: string[]): void {
    this.collection.forEach((element) => {
      if (genres.find((g) => g === element.getName()) !== undefined) {
        element.addMusician(musician);
      } else {
        element.deleteMusician(musician);
      }
    });
    this.storeGenres();
  }

  removeMusician(musician: string) {
    this.collection.forEach((element) => {
      element.deleteMusician(musician);
    });
    this.storeGenres();
  }

  updateAlbum(album: string, genres: string[]): void {
    this.collection.forEach((element) => {
      if (genres.find((g) => g === element.getName()) !== undefined) {
        element.addAlbum(album);
      } else {
        element.deleteAlbum(album);
      }
    });
    this.storeGenres();
  }

  removeAlbum(album: string) {
    this.collection.forEach((element) => {
      element.deleteAlbum(album);
    });
    this.storeGenres();
  }
  updateSong(song: string, genres: string[]): void {
    this.collection.forEach((element) => {
      if (genres.find((g) => g === element.getName()) !== undefined) {
        element.addSong(song);
      } else {
        element.deleteSong(song);
      }
    });
    this.storeGenres();
  }

  removeSong(song: string) {
    this.collection.forEach((element) => {
      element.deleteSong(song);
    });
    this.storeGenres();
  }
  // ====================

  storeGenres() {
    this.database.set('genres', [...this.collection.values()]).write();
  }
}