import {Genre} from '../Basics/Genre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {GenreInterface} from '../Interfaces/GenreInterface';

type schemaType = {
    genres: GenreInterface[]
};
export class GenreManager extends Manager<Genre> {
  private static genresManager: GenreManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Genres.json'));
    let dbItems = this.database.get('genres').value();
    dbItems.forEach((item) => this.collection.add(Genre.deserialize(item)));
  }

  public static getGenreManager(): GenreManager {
    if (!GenreManager.genresManager) {
      GenreManager.genresManager = new GenreManager();
    }
    return GenreManager.genresManager;
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
  getGenreByName(name:string): Genre|undefined {
    return ([...this.collection.values()].find((genre) => genre.getName() === name));
  }

  storeGenres() {
    this.database.set('genres', [...this.collection.values()]).write();
  }
}

