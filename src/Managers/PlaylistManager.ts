import {Genre} from '../Basics/Genre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Song} from '../Basics/Song';
import {Playlist} from '../Basics/Playlist';
import {SongInterface} from '../Interfaces/SongInterface';

type schemaType = {
    playlists: { name: string, songs: SongInterface[], systemPlaylist: boolean}[]
};

export class PlaylistManager extends Manager<Playlist> {
  private static playlistsManager: PlaylistManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Playlists.json'));
    if (this.database.has('playlists').value()) {
      let dbItems = this.database.get('playlists').value();
      dbItems.forEach((item) => {
        this.collection.add(Playlist.deserialize(item));
      });
    }
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
  editPlaylist(playlist: Playlist, newName: string, newSongs: Song[], newGenres: Genre[]): void {
    this.collection.forEach((element) => {
      if (element.getName() === playlist.getName()) {
        element.setName(newName);
        element.setSongs(newSongs);
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
  updateGenre() {
    this.collection.forEach((playlist) => {
      playlist.updateGenres();
    });
    this.storePlaylists();
  }
  storePlaylists() {
    this.database.set('playlists', [...this.collection.values()]).write();
  }
}
