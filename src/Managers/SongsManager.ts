import {Genre} from '../Basics/Genre';
import {Reproduccion} from '../Basics/Reproduccion';
import {Album} from '../Basics/Album';
import {Artist} from '../Basics/Artist';
import {Group} from '../Basics/Group';
import {Song, Duration} from '../Basics/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');

type schemaType = {
    songs: { name: string, author: string, duration: Duration, genres: Genre[],
        datePublication: Date, isSingle: boolean,
        reproductions: Reproduccion[] }[]
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
  /**
   * Devuelve las canciones por nombre
   * @param name de tipo sting
   * @returns tipo Song o undefined
   */
  getSongByName(name:string): Song|undefined {
    return ([...this.collection.values()].find((song) => song.getName() === name));
  }
  /**
   * Función que añade un canción a la base
   * @param song que será agregado a la base
   */
  addSong(song: Song): void {
    this.collection.add(song);
    this.storeSong();
  }
  removeSong(song: Song): void {
    this.collection.forEach((element) => {
      if (element.getName() === song.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeSong();
  }

  editSong(newName: string, newAuthor: string, newDuration: Duration, newGenre: Genre[],
    newDAtePublication: Date, changeSingle: boolean, changeRsproductions: Reproduccion[]): void {
    this.collection.forEach((element) => {
      if (element.getName() === newName) {
        element.setName(newName);
        element.setNameAuthor(newAuthor);
        element.setDuration(newDuration);
        element.setGenres(newGenre);
        element.setDatePublication(newDAtePublication);
        element.setIsSingle(changeSingle);
        element.setReproductions(changeRsproductions);
      }
    });
    this.storeSong();
  }
  searchSongForMusicians(): string[] | string {
    let result: string[] | string = [];
    let musiscians: Group|Artist;
    this.collection.forEach((element) => {
      if (element.getNameAuthor() === musiscians.getName() ) {
        result = this.getList();
      } else {
        result = 'no hay canciones del artista';
      }
      return result;
    });
    return result;
  }

  // updateMusician(musician: Artist|Group, genres: string[]): void {
  //   this.collection.forEach((element) => {
  //     if (genres.find((g) => g === element.getName()) !== undefined) {
  //       element.addMusician(musician);
  //     } else {
  //       element.removeMusician(musician);
  //     }
  //   });r
  //   this.storeSong();
  // }

  // removeMusician(musician: Artist|Group) {
  //   this.collection.forEach((element) => {
  //     element.removeMusician(musician);
  //   });
  //   this.storeSong();
  // }
  /**
   * Alamacena la información de la canción de acuerdo a lo
   * especificado en la schemaType.
   */
  storeSong() {
    this.database.set('songs', [...this.collection.values()]).write();
  }
}