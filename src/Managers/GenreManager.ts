import {Genre} from '../Basics/Genre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {GenreInterface} from '../Interfaces/GenreInterface';
import {Song} from '../Basics/Song';
import {SongManager} from './SongManager';
import {AlbumManager} from './AlbumManager';
import {ArtistManager} from './ArtistManager';
import {GroupManager} from './GroupManager';
import {PlaylistManager} from './PlaylistManager';

/**
 * Tipo para almacenar géneros mediante Lowdb.
 */
type schemaType = {
    genres: GenreInterface[]
};

/**
 * Clase para gestionar los géneros.
 */
export class GenreManager extends Manager<Genre> {
  /**
   * Instancia de la clase `GenreManager`.
   */
  private static genresManager: GenreManager;
  /**
   * Base de datos de los géneros.
   */
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase `GenreManager`.
   */
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Genres.json'));
    let dbItems = this.database.get('genres').value();
    dbItems.forEach((item) => this.collection.add(Genre.deserialize(item)));
  }
  /**
   * Devuelve la instancia de la clase `GenreManager`.
   * @returns Devuelve la única instancia de la clase.
   */
  public static getGenreManager(): GenreManager {
    if (!GenreManager.genresManager) {
      GenreManager.genresManager = new GenreManager();
    }
    return GenreManager.genresManager;
  }
  /**
   *
   */
  removeSong(song: Song) {
    this.collection.forEach((element) => {
      element.deleteSong(song);
    });
    this.store();
  }

  deleteGenre(genre: Genre) {
    // Song
    const songManager: SongManager = SongManager.getSongManager();
    songManager.getCollection().forEach((song) => {
      if (genre.getSongs().find((x) => x === song) !== undefined) {
        song.removeGenre(genre);
        if (song.getGenres().length === 0) {
          songManager.removeSong(song);
        }
      }
    });
    songManager.store();
    // Album
    /*
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (genre.getAlbums().find((x) => x === album) !== undefined) {
        album.removeGenre(genre);
        if (album.getGenres().length === 0) {
          albumManager.removeAlbum(album); // Falta el deleteAlbum
        }
      }
    });
    albumManager.store();*/
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (genre.getMusicians().find((x) => x === artist) !== undefined) {
        artist.removeGenre(genre);
        if (artist.getGenres().length === 0) {
          artistManager.deleteArtist(artist);
        }
      }
    });
    artistManager.store();
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (genre.getMusicians().find((x) => x === group) !== undefined) {
        group.removeGenre(genre);
        if (group.getGenres().length === 0) {
          groupManager.remove(group);
        }
      }
    });
    groupManager.store();
    // Playlist
    PlaylistManager.getPlaylistManager().update();
    PlaylistManager.getPlaylistManager().store();
    this.remove(genre);
    this.store();
  }

  addGenre(genre: Genre): void {
    // Song
    const songManager: SongManager = SongManager.getSongManager();
    songManager.getCollection().forEach((song) => {
      if (song.getGenres().find((g) => g === genre.getName()) !== undefined) {
        song.addGenre(genre);
      }
    });
    songManager.store();

    // Album
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (album.getGenres().find((g) => g === genre.getName()) !== undefined) {
        album.addGenre(genre);
      }
    });
    albumManager.store();

    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (artist.getGenres().find((g) => g === genre.getName()) !== undefined) {
        artist.addGenre(genre);
      }
    });
    artistManager.store();

    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (group.getGenres().find((g) => g === genre.getName()) !== undefined) {
        group.addGenre(genre);
      }
    });
    groupManager.store();

    // Playlist
    const playlistsManager: PlaylistManager = PlaylistManager.getPlaylistManager();
    playlistsManager.update();
    playlistsManager.store();
    // Genre
    this.add(genre);
  }

  /**
   * Guarda los géneros en la base de datos.
   */
  store() {
    this.database.set('genres', [...this.collection.values()]).write();
  }
}

