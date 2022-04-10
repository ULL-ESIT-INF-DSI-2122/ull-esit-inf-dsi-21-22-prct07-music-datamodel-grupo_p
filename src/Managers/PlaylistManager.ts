import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Playlist} from '../Basics/Playlist';
import {PlaylistInterface} from '../Interfaces/PlaylistInterface';

type schemaType = {
    playlists: PlaylistInterface[]
};

export class PlaylistManager extends Manager<Playlist> {
  private static playlistsManager: PlaylistManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Playlists.json'));
    let dbItems = this.database.get('playlists').value();
    dbItems.forEach((item) => {
      this.collection.add(Playlist.deserialize(item));
    });
  }

  public static getPlaylistManager(): PlaylistManager {
    if (!PlaylistManager.playlistsManager) {
      PlaylistManager.playlistsManager = new PlaylistManager();
    }
    return PlaylistManager.playlistsManager;
  }

  addPlaylist(playlist: Playlist): void {
    this.collection.add(playlist);
    this.storePlaylists();
  }
  removePlaylist(playlist: Playlist): void {
    this.collection.forEach((element) => {
      if (element.getName() === playlist.getName()) {
        this.collection.delete(element);
      }
    });
    this.storePlaylists();
  }
  getPlaylistByName(name:string): Playlist|undefined {
    return ([...this.collection.values()].find((playlist) => playlist.getName() === name));
  }
  storePlaylists() {
    this.database.set('playlists', [...this.collection.values()]).write();
  }
}