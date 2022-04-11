import {Song, Duration} from '../Basics/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Genre} from '../Basics/Genre';
import {SongInterface} from '../Interfaces/SongInterface';
import {ArtistManager} from './ArtistManager';
import {GenreManager} from './GenreManager';
import {AlbumManager} from './AlbumManager';
import {PlaylistManager} from './PlaylistManager';


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

  removeGenre(genre: Genre) {
    this.collection.forEach((song) => {
      song.removeGenre(genre);
    });
    this.store();
  }

  updateGenre(genre: Genre, songs: string[]) {
    this.collection.forEach((song) => {
      if (songs.find((x) => x === song.getName()) !== undefined) {
        song.addGenre(genre);
      } else {
        song.removeGenre(genre);
      }
    });
    this.store();
  }

  /**
   * Función que añade un canción a la base
   * @param song que será agregado a la base
   */
  addSong(song: Song): void {
    // add in artist
    let author = song.getAuthorName();
    let authorObj = ArtistManager.getArtistManager().searchByName(author);
    if (authorObj != undefined) {
      authorObj.addSong(song);
      ArtistManager.getArtistManager().store();
    }
    // add in genre
    let genres = song.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
    genres.forEach((genre) => {
      genre.addSong(song);
      GenreManager.getGenreManager().store();
    });

    this.collection.add(song);
    this.store();
  }

  /**
   * Elimina la canción de la colección
   * @param song de tipo Song
   */
  removeSong(song: Song): void {
    // delete from album
    let albumsAsociate = AlbumManager.getAlbumManager().getCollection();
    let albumsObj = Array.from(albumsAsociate);
    let albumsThisSong = albumsObj.filter((album) => album.getSongs().includes(song));
    albumsThisSong.forEach((album) => album.removeSong(song));
    AlbumManager.getAlbumManager().store();
    // delete in artist
    let author = song.getAuthorName();
    let authorObj = ArtistManager.getArtistManager().searchByName(author);
    if (authorObj != undefined) {
      authorObj.removeSong(song);
      ArtistManager.getArtistManager().store();
    }
    // delete in genre
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = song.getGenres();
    genreNames.forEach((genreName) => {
      let genre = objGenreManager.searchByName(genreName);
      genre.removeSong(song); // If artist is not in list it won't do anything
      GenreManager.getGenreManager().store();
    });
    // delete from playlist
    let playlist = PlaylistManager.getPlaylistManager().getCollection();
    let playlistObj = Array.from(playlist);
    let playlistAsociate = playlistObj.filter((playlist) => playlist.getSongs().includes(song));
    playlistAsociate.forEach((playlist) => playlist.deleteSong(song));
    PlaylistManager.getPlaylistManager().store();

    this.collection.delete(song);
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