import {Genre} from '../Basics/Genre';
import {Reproduccion} from '../Basics/Reproduccion';
import {Album} from '../Basics/Album';
import {Artist} from '../Basics/Artist';
import {Group} from '../Basics/Group';
import {Song, Duration} from '../Basics/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {SongManager} from './SongsManager';

type schemaType = {
    album: { name: string, whopublishes: (Group|Artist), datePublication: number, genres: Genre[], songs: Song[]}[]
};
export class AlbumsManager extends Manager<Album> {
  private static AlbumsManager: AlbumsManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Album.json'));
    if (this.database.has('album').value()) {
      let dbItems = this.database.get('album').value();
      dbItems.forEach((item) => this.collection.add(new Album(item.name, item.whopublishes, item.datePublication, item.genres, item.songs,
      )));
    }
  }
  /**
   * Patron Singlenton
   * @returns la única instancia de la clase AlbumsManager
   */
  public static getAlbumsManager(): AlbumsManager {
    if (!AlbumsManager.AlbumsManager) {
      AlbumsManager.AlbumsManager = new AlbumsManager();
    }
    return AlbumsManager.AlbumsManager;
  }
  /**
   * Función q
   * @param album que será agregado a la base
   */
  addAlbum(album: Album): void {
    this.collection.add(album);
    this.storeAlbum();
  }
  removeAlbum(album: Album): void {
    this.collection.forEach((element) => {
      if (element.getName() === album.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeAlbum();
  }

  editAlbum(name: string, whopublishes: (Group|Artist), datePublication: number, genres: Genre[], songs: Song[]): void {
    this.collection.forEach((element) => {
      if (element.getName() === name) {
        element.setName(name);
        element.setWhoPublishes(whopublishes);
        element.setPublicationYear(datePublication);
        element.setGenre(genres);
        element.setSongs(songs);
      }
    });
    this.storeAlbum();
  }

  // updateMusician(musician: Artist|Group, genres: string[]): void {
  //   this.collection.forEach((element) => {
  //     if (genres.find((g) => g === element.getName()) !== undefined) {
  //       element.addMusician(musician);
  //     } else {
  //       element.removeMusician(musician);
  //     }
  //   });r
  //   this.storeAlbum();
  // }

  // removeMusician(musician: Artist|Group) {
  //   this.collection.forEach((element) => {
  //     element.removeMusician(musician);
  //   });
  //   this.storeAlbum();
  // }

  /**
   * Alamacena la información de la canción de acuerdo a lo
   * especificado en la schemaType.
   */
  storeAlbum() {
    this.database.set('album', [...this.collection.values()]).write();
  }
}