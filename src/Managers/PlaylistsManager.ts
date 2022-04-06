import {Genre} from '../Basics/Genre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Song} from '../Basics/Song';
import {Playlist} from '../Basics/Playlist';

type schemaType = {
    playlists: { name: string, songs: Song[], systemPlaylist: boolean}[]
};
export class PlaylistsManager extends Manager<Playlist> {
  private static playlistsManager: PlaylistsManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Playlists.json'));
    if (this.database.has('playlists').value()) {
      let dbItems = this.database.get('playlists').value();
      dbItems.forEach((item) => this.collection.add(new Playlist(
          item.name, item.songs, item.systemPlaylist,
      )));
    }
  }

  public static getPlaylistManager(): PlaylistsManager {
    if (!PlaylistsManager.playlistsManager) {
      PlaylistsManager.playlistsManager = new PlaylistsManager();
    }
    return PlaylistsManager.playlistsManager;
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
  editPlaylist(playlist: Playlist, newName: string, newSongs: Song[], newGenres: Genre[]): void {
    this.collection.forEach((element) => {
      if (element.getName() === playlist.getName()) {
        element.setName(newName);
        element.setSongs(newSongs);
        // element.setGenres(newGenres);
      }
    });
    this.storePlaylists();
  }
  removeSong(song: Song) {
    this.collection.forEach((element) => {
      element.deleteSong(song);
    });
    this.storePlaylists();
  }
  storePlaylists() {
    this.database.set('playlists', [...this.collection.values()]).write();
  }
}
