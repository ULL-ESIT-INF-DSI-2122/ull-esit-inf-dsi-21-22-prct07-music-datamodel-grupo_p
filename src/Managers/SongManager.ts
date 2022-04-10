import {Song} from '../Basics/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');


type schemaType = {
    songs: { name: string; author: string; duration: number, genres: string[],
        datePublication: Date, isSingle: boolean,
        reproductions: number}[]
};

export class SongsManager extends Manager<Song> {
  private static SongManager: SongsManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Songs.json'));
    if (this.database.has('songs').value()) {
      let dbItems = this.database.get('songs').value();
      dbItems.forEach((item) => this.collection.add(new Song(item.name, item.author, item.duration,
          item.genres, item.datePublication, item.isSingle, item.reproductions,
      )));
    }
  }

  getSongByName(name:string): Song|undefined {
    return ([...this.collection.values()].find((song) => song.getName() === name));
  }
  /**
   * Patron Singlenton
   * @returns la única instancia de la clase SongManager
   */
  public static getSongsManager(): SongsManager {
    if (!SongsManager.SongManager) {
      SongsManager.SongManager = new SongsManager();
    }
    return SongsManager.SongManager;
  }
  /**
   * Alamacena la información de la canción de acuerdo a lo
   * especificado en la schemaType.
   */
  storeSong() {
    this.database.set('songs', [...this.collection.values()]).write();
  }
}