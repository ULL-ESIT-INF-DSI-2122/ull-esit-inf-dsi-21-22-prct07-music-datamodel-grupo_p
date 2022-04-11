import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Album} from '../Basics/Album';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {Song} from '../Basics/Song';

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

  removeSong(song: Song) {
    this.collection.forEach((al) => {
      al.removeSong(song);
    });
    this.store();
  }

  store() {
    this.database.set('albums', [...this.collection.values()]).write();
  }
}
