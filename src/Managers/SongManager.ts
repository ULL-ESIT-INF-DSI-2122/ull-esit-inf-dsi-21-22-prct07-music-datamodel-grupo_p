import {Song} from '../Basics/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Genre} from '../Basics/Genre';
import {SongInterface} from '../Interfaces/SongInterface';


type schemaType = {
    songs: SongInterface[]
};

export class SongManager extends Manager<Song> {
  private static SongManager: SongManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Songs.json'));
    if (this.database.has('songs').value()) {
      let dbItems = this.database.get('songs').value();
      dbItems.forEach((item) => this.collection.add(new Song(item.name, item.author, item.duration,
          item.genres, item.publicationDate, item.isSingle, item.reproductions,
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
  public static getSongManager(): SongManager {
    if (!SongManager.SongManager) {
      SongManager.SongManager = new SongManager();
    }
    return SongManager.SongManager;
  }

  removeGenre(genre: Genre) {
    this.collection.forEach((song) => {
      song.removeGenre(genre);
    });
    this.storeSong();
  }

  updateGenre(genre: Genre, songs: string[]) {
    this.collection.forEach((song) => {
      if (songs.find((x) => x === song.getName()) !== undefined) {
        song.addGenre(genre);
      } else {
        song.removeGenre(genre);
      }
    });
    this.storeSong();
  }


  /**
   * Alamacena la información de la canción de acuerdo a lo
   * especificado en la schemaType.
   */
  storeSong() {
    this.database.set('songs', [...this.collection.values()]).write();
  }
}