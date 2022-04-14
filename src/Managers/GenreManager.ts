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
import {Album} from '../Basics/Album';
import {Group} from '../Basics/Group';
import {Artist} from '../Basics/Artist';

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
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (genre.getAlbums().find((x) => x === album) !== undefined) {
        album.removeGenre(genre);
        if (album.getGenres().length === 0) {
          albumManager.removeAlbum(album); // Falta el deleteAlbum
        }
      }
    });
    albumManager.store();
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
    // Genre
    this.remove(genre);
    this.store();
  }

  addGenre(genre: Genre): void {
    // Song
    const songManager: SongManager = SongManager.getSongManager();
    songManager.getCollection().forEach((song) => {
      if (genre.getSongs().find((s) => s === song) !== undefined) {
        song.addGenre(genre);
      }
    });
    songManager.store();

    // Album
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (genre.getAlbums().find((a) => a === album) !== undefined) {
        album.addGenre(genre);
      }
    });
    albumManager.store();

    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (genre.getMusicians().find((a) => a === artist) !== undefined) {
        artist.addGenre(genre);
      }
    });
    artistManager.store();

    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (genre.getMusicians().find((g) => g === group) !== undefined) {
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

  editGenre(genre: Genre, name: string, musicians: (Group|Artist)[],
      albums: Album[], songs: Song[]): void {
    genre.setName(name);
    genre.setMusicians(musicians);
    genre.setAlbums(albums);
    genre.setSongs(songs);
    // Song
    const songManager: SongManager = SongManager.getSongManager();
    songManager.getCollection().forEach((song) => {
      if (genre.getSongs().find((s) => s === song) !== undefined) {
        song.addGenre(genre);
      } else {
        song.removeGenre(genre);
        if (song.getGenres().length === 0) {
          songManager.removeSong(song);
        }
      }
    });
    songManager.store();
    // Album
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (genre.getAlbums().find((a) => a === album) !== undefined) {
        album.addGenre(genre);
      } else {
        album.removeGenre(genre);
        if (album.getGenres().length === 0) {
          albumManager.removeAlbum(album);
        }
      }
    });
    albumManager.store();
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (genre.getMusicians().find((musician) => musician === artist) !== undefined) {
        artist.addGenre(genre);
      } else {
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
      if (genre.getMusicians().find((musician) => musician === group) !== undefined) {
        group.addGenre(genre);
      } else {
        group.removeGenre(genre);
        if (group.getGenres().length === 0) {
          groupManager.deleteGroup(group);
        }
      }
    });
    groupManager.store();
    // Playlist
    const playlistManager: PlaylistManager = PlaylistManager.getPlaylistManager();
    playlistManager.update();
  }


  /**
   * Guarda los géneros en la base de datos.
   */
  store() {
    this.database.set('genres', [...this.collection.values()]).write();
  }
}

