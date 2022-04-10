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
  private storeSong() {
    this.database.set('songs', [...this.collection.values()]).write();
  }

  public getSongByName(name:string): Song|undefined {
    return ([...this.collection.values()].find((song) => song.getName() === name));
  }

  public static getSongManager(): SongManager {
    if (!SongManager.SongManager) {
      SongManager.SongManager = new SongManager();
    }
    return SongManager.SongManager;
  }

  public addSong(song: Song): void {
    this.collection.add(song);
    this.storeSong();
  }

  public deleteSong(song: Song): void {
    this.collection.delete(song);
    this.storeSong();
  }

  editSong(newName: string, newAuthor: string, newDuration: Duration, newGenre: string[],
      newDAtePublication: Date, changeSingle: boolean, repro: number): void {
    this.collection.forEach((element) => {
      if (element.getName() === newName) {
        element.setName(newName);
        element.setAuthor(newAuthor);
        element.setDuration(newDuration);
        element.setGenres(newGenre);
        element.setDatePublication(newDAtePublication);
        element.setIsSingle(changeSingle);
        element.setReproductions(repro);
      }
    });
    this.storeSong();
  }

  public static deserialize(song: SongInterface): Song {
    return new Song(song.name, song.author, song.duration, song.genres, song.datePublication, song.isSingle, song.reproductions);
  }
}


