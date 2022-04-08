import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Album} from '../Basics/Album';
import {Genre} from '../Basics/Genre';
import {AlbumInterface} from '../Interfaces/AlbumInterface';

type schemaType = {
    albums: AlbumInterface[]
};
export class AlbumManager extends Manager<Album> {
  private static albumManager: AlbumManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Albums.json'));
    if (this.database.has('albums').value()) {
      let dbItems = this.database.get('albums').value();
      dbItems.forEach((item) => this.collection.add(Album.deserialize(item)));
    }
  }

  public static getAlbumManager(): AlbumManager {
    if (!AlbumManager.albumManager) {
      AlbumManager.albumManager = new AlbumManager();
    }
    return AlbumManager.albumManager;
  }

  getAlbumByName(name:string): Album|undefined {
    return ([...this.collection.values()].find((album) => album.getName() === name));
  }

  removeGenre(genre: Genre) {
    this.collection.forEach((album) => {
      album.removeGenre(genre);
    });
    this.storeAlbums();
  }

  updateGenre(genre: Genre, albums: string[]) {
    this.collection.forEach((album) => {
      if (albums.find((x) => x === album.getName()) !== undefined) {
        album.addGenre(genre);
      } else {
        album.removeGenre(genre);
      }
    });
    this.storeAlbums();
  }

  storeAlbums() {
    this.database.set('albums', [...this.collection.values()]).write();
  }
}
