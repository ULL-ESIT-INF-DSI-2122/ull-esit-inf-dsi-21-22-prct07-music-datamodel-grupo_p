import {MusicGenre, genrer} from '../clasesBase/MusicGenre';
import {Duration} from '../clasesBase/Song';
import {Reproduccion} from '../clasesBase/Reproduccion';
import {Album} from '../clasesBase/Album';
import {Artist} from '../clasesBase/Artist';
import {Group} from '../clasesBase/Group';
import {Song} from '../clasesBase/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {BasicData} from '../interfaces/basicData';
type schemaType = {
    songs: { name: string; author: string; duration: Duration, genres: genrer[],
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
   * Función que añade un canción a las base
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
  /**
   * Función que edita la info de la canción
   * @param genre 
   * @param newName 
   * @param newMusicians 
   * @param newAlbums 
   * @param newSongs 
   */
  editSong(genre: MusicGenre, newName: string, newMusicians: (Group|Artist)[],
      newAlbums: Album[], newSongs: Song[] ): void {
    this.collection.forEach((element) => {
      if (element.getName() === genre.getName()) {
        element.setName(newName);
        element.setMusicians(newMusicians);
        element.setAlbums(newAlbums);
        element.setSongs(newSongs);
      }
    });
    this.storeSong();
  }
  
  updateMusician(musician: Artist|Group, genres: string[]): void {
    this.collection.forEach((element) => {
      if (genres.find((g) => g === element.getName()) !== undefined) {
        element.addMusician(musician);
      } else {
        element.removeMusician(musician);
      }
    });
    this.storeSong();
  }

  removeMusician(musician: Artist|Group) {
    this.collection.forEach((element) => {
      element.removeMusician(musician);
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