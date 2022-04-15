import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Playlist} from '../Basics/Playlist';
import {PlaylistInterface} from '../Interfaces/PlaylistInterface';

/**
 * Tipo para almacenar playlists mediante Lowdb.
 */
type schemaType = {
    playlists: PlaylistInterface[]
};

/**
 * Clase para gestionar las playlists.
 */
export class PlaylistManager extends Manager<Playlist> {
  /**
   * Instancia de la clase `PlaylistManager`.
   */
  private static playlistsManager: PlaylistManager;
  /**
   * Base de datos de las playlists.
   */
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase `PlaylistManager`.
   */
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Playlists.json'));
    let dbItems = this.database.get('playlists').value();
    dbItems.forEach((item) => {
      this.collection.add(Playlist.deserialize(item));
    });
  }
  /**
   * Devuelve la instancia de la clase `PlaylistManager`.
   * @returns Devuelve la única instancia de la clase.
   */
  public static getPlaylistManager(): PlaylistManager {
    if (!PlaylistManager.playlistsManager) {
      PlaylistManager.playlistsManager = new PlaylistManager();
    }
    return PlaylistManager.playlistsManager;
  }
  /**
   * Actualiza los géneros de todas las playlists.
   */
  public update(): void {
    this.collection.forEach((playlist) => {
      playlist.updateGenres();
      playlist.recalculateDuration();
      if (playlist.getSongs().length === 0) {
        this.remove(playlist);
      }
    });
    this.store();
  }
  /**
   * Guarda las playlists en la base de datos.
   */
  public store(): void {
    this.database.set('playlists', [...this.collection.values()]).write();
  }
}
