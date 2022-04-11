import {Genre} from '../Basics/Genre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {GenreInterface} from '../Interfaces/GenreInterface';
import {Song} from '../Basics/Song';

/**
 * Tipo para almacenar géneros mediante Lowdb.
 */
type schemaType = {
    genres: GenreInterface[]
};

/**
 * Clase para gestionar los géneros.
 */
export class GenreManager extends Manager<Genre> {
  /**
   * Instancia de la clase `GenreManager`.
   */
  private static genresManager: GenreManager;
  /**
   * Base de datos de los géneros.
   */
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase `GenreManager`.
   */
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Genres.json'));
    let dbItems = this.database.get('genres').value();
    dbItems.forEach((item) => this.collection.add(Genre.deserialize(item)));
  }
  /**
   * Devuelve la instancia de la clase `GenreManager`.
   * @returns Devuelve la única instancia de la clase.
   */
  public static getGenreManager(): GenreManager {
    if (!GenreManager.genresManager) {
      GenreManager.genresManager = new GenreManager();
    }
    return GenreManager.genresManager;
  }
  /**
   *
   */
  removeSong(song: Song) {
    this.collection.forEach((element) => {
      element.deleteSong(song);
    });
    this.store();
  }

  /**
   * Guarda los géneros en la base de datos.
   */
  store() {
    this.database.set('genres', [...this.collection.values()]).write();
  }
}

