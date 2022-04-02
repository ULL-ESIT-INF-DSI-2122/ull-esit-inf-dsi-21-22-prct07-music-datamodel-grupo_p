import {Genre} from '../Basics/Genre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Group} from '../Basics/Group';
import {Artist} from '../Basics/Artist';
import {Album} from '../Basics/Album';
import {Song} from '../Basics/Song';
type schemaType = {
    genres: { name: string; musicians: (Group|Artist)[]; albums: Album[], songs: Song[] }[]
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
  editGenre(genre: Genre, newName: string, newMusicians: (Group|Artist)[],
      newAlbums: Album[], newSongs: Song[] ): void {
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
  updateMusician(musician: Artist|Group, genres: string[]): void {
    this.collection.forEach((element) => {
      if (genres.find((g) => g === element.getName()) !== undefined) {
        element.addMusician(musician);
      } else {
        element.removeMusician(musician);
      }
    });
    this.storeGenres();
  }

  removeMusician(musician: Artist|Group) {
    this.collection.forEach((element) => {
      element.removeMusician(musician);
    });
    this.storeGenres();
  }

  storeGenres() {
    this.database.set('genres', [...this.collection.values()]).write();
  }
}

