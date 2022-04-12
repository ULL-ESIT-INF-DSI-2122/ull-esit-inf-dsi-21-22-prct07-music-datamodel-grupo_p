import {Song, Duration} from '../Basics/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {SongInterface} from '../Interfaces/SongInterface';
import {ArtistManager} from './ArtistManager';
import {GenreManager} from './GenreManager';
import {AlbumManager} from './AlbumManager';
import {PlaylistManager} from './PlaylistManager';
import {Genre} from '../Basics/Genre';


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
  public addSong(song: Song): void {
    // add in artist
    let author = song.getAuthor();
    let artistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (artist.getName() === author) {
        artist.addSong(song);
      }
    });
    artistManager.store();
    // add in genre
    let genres: Genre[] = song.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
    genres.forEach((genre) => {
      genre.addSong(song);
    });
    GenreManager.getGenreManager().store();

    this.add(song);
    this.store();
  }

  /**
   * Elimina la canción de la colección
   * @param song de tipo Song
   */
  public removeSong(song: Song): void {
    // delete from album
    let albumsAsociate = AlbumManager.getAlbumManager().getCollection();
    let albumsObj = Array.from(albumsAsociate);
    let albumsThisSong = albumsObj.filter((album) => album.getSongs().includes(song));
    albumsThisSong.forEach((album) => {
      album.removeSong(song);
      if (album.getSongs().length === 0) {
        AlbumManager.getAlbumManager().deleteAlbum(album);
      }
    });
    AlbumManager.getAlbumManager().store();
    // delete in artist
    let author = song.getAuthor();
    let authorObj = ArtistManager.getArtistManager().searchByName(author);
    if (authorObj != undefined) {
      authorObj.removeSong(song);
      if (authorObj.getSongs().length === 0) {
        ArtistManager.getArtistManager().deleteArtist(authorObj);
      }
    }
    ArtistManager.getArtistManager().store();
    // delete in genre
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = song.getGenres();
    genreNames.forEach((genreName) => {
      let genre = objGenreManager.searchByName(genreName);
      genre.removeSong(song); // If artist is not in list it won't do anything
      if (genre.getSongs().length === 0) {
        objGenreManager.deleteGenre(genre);
      }
      objGenreManager.store();
    });
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

  public editSong(song: Song, newName: string, newAuthor: string, newDuration: Duration, newGenre: string[],
      newDAtePublication: Date, changeSingle: boolean, changeReproductions: number): void {
    song.setName(newName);
    song.setAuthor(newAuthor);
    song.setDuration(newDuration);
    song.setGenres(newGenre);
    song.setPublicationDate(newDAtePublication);
    song.setIsSingle(changeSingle);
    song.setReproductions(changeReproductions);

    AlbumManager.getAlbumManager().store();
    ArtistManager.getArtistManager().store();
    GenreManager.getGenreManager().store();
    PlaylistManager.getPlaylistManager().store();
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