import {Song} from '../Basics/Song/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {SongInterface} from '../Interfaces/SongInterface';

type Duration = [number, number];

type schemaType = {
    songs: { name: string; author: string; duration: Duration, genres: string[],
        datePublication: Date, isSingle: boolean,
        reproductions: number}[]
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
  public static getSongManager(): SongManager {
    if (!SongManager.SongManager) {
      SongManager.SongManager = new SongManager();
    }
    return SongManager.SongManager;
  }
  addSong(song: Song): void {
  }
  /**
   * Alamacena la información de la canción de acuerdo a lo
   * especificado en la schemaType.
   */
  storeSong() {
    this.database.set('songs', [...this.collection.values()]).write();
  }
  // CONVERTIR A OBJETO DATS DEL JSON
  public static deserialize(song: SongInterface): Song {
    return new Song(song.name, song.author, song.duration, song.genres, song.datePublication, song.isSingle, song.reproductions);
  }
}