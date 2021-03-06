import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Artist} from '../Basics/Artist';
import {ArtistInterface} from '../Interfaces/ArtistInterface';
import {GroupManager} from './GroupManager';
import {GenreManager} from './GenreManager';
import {AlbumManager} from './AlbumManager';
import {Album} from '../Basics/Album';
import {SongManager} from './SongManager';
import {Song} from '../Basics/Song';
import {PlaylistManager} from './PlaylistManager';

/**
 * Tipo para almacenar artistas mediante Lowdb.
 */
export type schemaType = {
    artists: ArtistInterface[]
};

/**
 * Clase para gestionar los artistas.
 */
export class ArtistManager extends Manager<Artist> {
  /**
   * Instancia de la clase `ArtistManager`.
   */
  private static artistManager: ArtistManager;
  /**
   * Base de datos de los artistas.
   */
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase `ArtistManager`.
   */
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Artists.json'));
    if (this.database.has('artists').value()) {
      let dbItems = this.database.get('artists').value();
      dbItems.forEach((item) => this.collection.add(Artist.deserialize(item)));
    }
  }
  /**
   * Devuelve la instancia de la clase `ArtistManager`.
   * @returns Devuelve la única instancia de la clase.
   */
  public static getArtistManager(): ArtistManager {
    if (!ArtistManager.artistManager) {
      ArtistManager.artistManager = new ArtistManager();
    }
    return ArtistManager.artistManager;
  }

  /**
   * Elimina un artista de la colección.
   * @param artist Artista a eliminar.
   * @param deleteSongs Flag que indica si hay que eliminar las canciones.
   */
  public deleteArtist(artist: Artist, deleteSongs: boolean = true): void {
    // Album
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    artist.getAlbums().forEach((album) => {
      if (artist.getName() === album.getPublisher()) {
        objAlbumManager.removeAlbum(album);
      }
    });
    // Song
    if (deleteSongs) {
      const objSongManager:SongManager = SongManager.getSongManager();
      artist.getSongs().forEach((song) => {
        if (artist.getName() === song.getAuthorName()) {
          objSongManager.removeSong(song);
        }
      });
    }
    // Group
    const objGroupManager: GroupManager = GroupManager.getGroupManager();
    objGroupManager.getCollection().forEach((group) => {
      if (artist.getGroups().find((groupName) => groupName === group.getName()) !== undefined) {
        group.removeArtist(artist);
        if (group.getArtists().length === 0) {
          objGroupManager.deleteGroup(group);
        }
      }
    });
    objGroupManager.store();
    // Genre
    const objGenresManager: GenreManager = GenreManager.getGenreManager();
    objGenresManager.getCollection().forEach((genre) => {
      if (artist.getGenres().find((genreName) => genreName === genre.getName()) !== undefined) {
        genre.deleteMusician(artist);
        if (genre.getMusicians().length === 0) {
          objGenresManager.deleteGenre(genre);
        }
      }
    });
    objGenresManager.store();
    // Playlist
    PlaylistManager.getPlaylistManager().update();
    // Artist
    this.remove(artist);
    this.store();
  }

  /**
   * Edita un artista de la colección.
   * @param artist Artista a editar.
   * @param name Nombre
   * @param groups Grupos
   * @param genres Géneros
   * @param albums Álbumes
   * @param songs Canciones
   */
  public editArtist(artist: Artist, name: string, groups: string[],
      genres: string[], albums: Album[], songs: Song[]): void {
    artist.setName(name);
    artist.setGroups(groups);
    artist.setGenres(genres);
    artist.setAlbums(albums);
    artist.setSongs(songs);
    this.store();
    // Song
    const songManager: SongManager = SongManager.getSongManager();
    songManager.getCollection().forEach((song) => {
      if (artist.getSongs().find((s) => s === song) === undefined && song.getAuthorName() === artist.getName()) {
        songManager.removeSong(song);
      }
    });
    songManager.store();
    // Album
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (artist.getAlbums().find((a) => a === album) === undefined && album.getPublisher() === artist.getName()) {
        albumManager.removeAlbum(album);
      }
    });
    albumManager.store();
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (artist.getGroups().find((g) => g === group.getName()) !== undefined) {
        group.addArtist(artist);
      } else {
        group.removeArtist(artist);
        if (group.getArtists().length === 0) {
          groupManager.deleteGroup(group);
        }
      }
    });
    groupManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (artist.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addMusician(artist);
      } else {
        genre.deleteMusician(artist);
        if (genre.getMusicians().length === 0) {
          genreManager.deleteGenre(genre);
        }
      }
    });
    genreManager.store();
    // Playlist
    PlaylistManager.getPlaylistManager().update();
    this.store();
  }
  /**
   * Agrega un nuevo artista a la colección.
   * @param artist Artista a agregar
   */
  public addArtist(artist: Artist): void {
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (artist.getGroups().find((g) => g === group.getName()) !== undefined) {
        group.addArtist(artist);
      }
    });
    groupManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (artist.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addMusician(artist);
      }
    });
    genreManager.store();
    // Artist
    this.add(artist);
    this.store();
  }

  /**
   * Guarda los artistas en la base de datos.
   */
  public store(): void {
    this.database.set('artists', [...this.collection.values()]).write();
  }
}