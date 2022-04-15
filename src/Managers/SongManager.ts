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


type schemaType = {
    songs: SongInterface[]
};


export class SongManager extends Manager<Song> {
  private static SongManager: SongManager;
  private database: lowdb.LowdbSync<schemaType>;
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
   * Patron Singlenton
   * @returns la única instancia de la clase SongManager
   */
  public static getSongManager(): SongManager {
    if (!SongManager.SongManager) {
      SongManager.SongManager = new SongManager();
    }
    return SongManager.SongManager;
  }


  /**
   * Función que añade un canción a la base
   * @param song que será agregado a la base
   */
  addSong(song: Song): void {
    // add in artist
    let author = song.getAuthorName();
    let artistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (artist.getName() === author) {
        artist.addSong(song);
      }
    });
    artistManager.store();
    // add in genre
    let genreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (song.getGenres().find((g) => g === genre.getName())) {
        genre.addSong(song);
      }
    });
    genreManager.store();

    this.add(song);
    this.store();
  }

  /**
   * Elimina la canción de la colección
   * @param song de tipo Song
   */
  removeSong(song: Song): void {
    // delete from album
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
    // delete in artist
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
    // delete in genre
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
    // delete from playlist
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

    this.remove(song);
    this.store();
  }

  editSong(song: Song, newName: string, newAuthor: string, newDuration: Duration, newGenre: string[],
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
   * Alamacena la información de la canción de acuerdo a lo
   * especificado en la schemaType.
   */
  store() {
    this.database.set('songs', [...this.collection.values()]).write();
  }
}