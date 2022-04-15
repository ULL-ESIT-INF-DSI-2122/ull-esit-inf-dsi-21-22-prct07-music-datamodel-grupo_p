import {Song} from '../Basics/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {SongInterface} from '../Interfaces/SongInterface';
import {ArtistManager} from './ArtistManager';
import {GenreManager} from './GenreManager';
import {AlbumManager} from './AlbumManager';
import {PlaylistManager} from './PlaylistManager';
import {GroupManager} from './GroupManager';
import {Duration} from '../Basics/Playlist';

/**
 * Tipo para almacenar canciones mediante Lowdb.
 */
type schemaType = {
    songs: SongInterface[]
};

/**
 * Clase para gestionar las canciones.
 */
export class SongManager extends Manager<Song> {
  /**
   * Instancia de la clase `SongManager`.
   */
  private static SongManager: SongManager;
  /**
   * Base de datos de las canciones.
   */
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase `SongManager`.
   */
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Songs.json'));
    if (this.database.has('songs').value()) {
      let dbItems = this.database.get('songs').value();
      dbItems.forEach((item) => this.collection.add(new Song(item.name, item.author, item.duration,
          item.genres, item.publicationDate, item.isSingle, item.reproductions,
      )));
    }
  }
  /**
   * Devuelve la instancia de la clase `GroupManager`.
   * @returns Devuelve la única instancia de la clase.
   */
  public static getSongManager(): SongManager {
    if (!SongManager.SongManager) {
      SongManager.SongManager = new SongManager();
    }
    return SongManager.SongManager;
  }

  /**
   * Agrega una nueva canción a la colección.
   * @param song Canción a agregar
   */
  public addSong(song: Song): void {
    // Artist
    let author = song.getAuthorName();
    let artistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (artist.getName() === author) {
        artist.addSong(song);
      }
    });
    artistManager.store();
    // Genre
    let genreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (song.getGenres().find((g) => g === genre.getName())) {
        genre.addSong(song);
      }
    });
    genreManager.store();
    // Song
    this.add(song);
    this.store();
  }

  /**
   * Elimina una canción de la colección.
   * @param song Canción a eliminar.
   */
  public removeSong(song: Song): void {
    // Album
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (album.getSongs().find((s) => s === song) !== undefined) {
        album.removeSong(song);
        if (album.getSongs().length === 0) {
          albumManager.removeAlbum(album);
        }
      }
    });
    albumManager.store();
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (artist.getSongs().find((s) => s === song) !== undefined) {
        artist.removeSong(song);
        if (artist.getSongs().length === 0) {
          artistManager.deleteArtist(artist);
        }
      }
    });
    artistManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (genre.getSongs().find((s) => s === song) !== undefined) {
        genre.deleteSong(song);
        if (genre.getSongs().length === 0) {
          genreManager.deleteGenre(genre);
        }
      }
    });
    genreManager.store();
    // Playlist
    const playlistManager: PlaylistManager = PlaylistManager.getPlaylistManager();
    playlistManager.getCollection().forEach((playlist) => {
      if (playlist.getSongs().find((s) => s === song) !== undefined) {
        playlist.deleteSong(song);
        if (playlist.getSongs().length === 0) {
          playlistManager.remove(playlist);
        }
      }
    });
    playlistManager.update();
    playlistManager.store();
    // Song
    this.remove(song);
    this.store();
  }

  /**
   * Edita una canción de la colección.
   * @param song Canción a editar
   * @param newName Nombre
   * @param newAuthor Autor
   * @param newDuration Duración
   * @param newGenre Género
   * @param newDAtePublication Fecha de publicación
   * @param changeSingle Flag que indica si la canción es un single
   * @param changeReproductions Número de reproducciones
   */
  public editSong(song: Song, newName: string, newAuthor: string, newDuration: Duration, newGenre: string[],
      newDAtePublication: Date, changeSingle: boolean, changeReproductions: number): void {
    song.setName(newName);
    song.setAuthorName(newAuthor);
    song.setDuration(newDuration);
    song.setGenres(newGenre);
    song.setDatePublication(newDAtePublication);
    song.setIsSingle(changeSingle);
    song.setReproductions(changeReproductions);
    // Album
    AlbumManager.getAlbumManager().store();
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (artist.getName() === song.getAuthorName()) {
        artist.addSong(song);
      } else {
        artist.removeSong(song);
        if (artist.getSongs().length === 0) {
          artistManager.deleteArtist(artist);
        }
      }
    });
    artistManager.store();
    // Group
    GroupManager.getGroupManager().store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (song.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addSong(song);
      } else {
        genre.deleteSong(song);
        if (genre.getSongs().length === 0) {
          genreManager.deleteGenre(genre);
        }
      }
    });
    genreManager.store();
    // Playlist
    const playlistManager: PlaylistManager = PlaylistManager.getPlaylistManager();
    playlistManager.update();
    playlistManager.store();
    this.store();
  }

  /**
   * Guarda las canciones en la base de datos.
   */
  public store(): void {
    this.database.set('songs', [...this.collection.values()]).write();
  }
}