import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Album} from '../Basics/Album';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {Song} from '../Basics/Song';
import {ArtistManager} from './ArtistManager';
import {GroupManager} from './GroupManager';
import {GenreManager} from './GenreManager';
import {SongManager} from './SongManager';
import {PlaylistManager} from './PlaylistManager';

/**
 * Tipo para almacenar álbumes mediante Lowdb.
 */
export type schemaType = {
    albums: AlbumInterface[]
};
/**
 * Clase para gestionar los álbumes.
 */
export class AlbumManager extends Manager<Album> {
  /**
   * Instancia de la clase `AlbumManager`.
   */
  private static albumManager: AlbumManager;
  /**
   * Base de datos de los álbumes.
   */
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase `AlbumManager`.
   */
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Albums.json'));
    if (this.database.has('albums').value()) {
      let dbItems = this.database.get('albums').value();
      dbItems.forEach((item) => this.collection.add(Album.deserialize(item)));
    }
  }
  /**
   * Devuelve la instancia de la clase `AlbumManager`.
   * @returns Devuelve la única instancia de la clase.
   */
  public static getAlbumManager(): AlbumManager {
    if (!AlbumManager.albumManager) {
      AlbumManager.albumManager = new AlbumManager();
    }
    return AlbumManager.albumManager;
  }
  /**
   * Elimina un álbum de la colección.
   * @param album Álbum a eliminar.
   */
  public removeAlbum(album: Album): void {
    // Song
    const objSongManager: SongManager = SongManager.getSongManager();
    const albumSongs: Song[] = album.getSongs();
    const albumSongsNames: string[] = albumSongs.map((song) => song.getName());
    albumSongsNames.forEach((songName) => {
      let song: Song = objSongManager.searchByName(songName);
      objSongManager.removeSong(song);
    });
    // Artist
    let artistObj = ArtistManager.getArtistManager().getCollection();
    let artistArray = Array.from(artistObj);
    let artistsThisAlbum = artistArray.filter((artist) => artist.getAlbums().includes(album));
    artistsThisAlbum.forEach((artist) => {
      artist.removeAlbum(album);
      if (artist.getAlbums().length === 0) {
        ArtistManager.getArtistManager().deleteArtist(artist);
      }
    });
    ArtistManager.getArtistManager().store();
    // Group
    let groupAsociate = GroupManager.getGroupManager().getCollection();
    let groupObj = Array.from(groupAsociate);
    let groupThisAlbum = groupObj.filter((group) => group.getAlbums().includes(album));
    groupThisAlbum.forEach((group) => {
      group.removeAlbum(album);
      if (group.getAlbums().length === 0) {
        GroupManager.getGroupManager().deleteGroup(group);
      }
    });
    GroupManager.getGroupManager().store();
    // Genre
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = album.getGenres();
    genreNames.forEach((genreName) => {
      if (objGenreManager.searchByName(genreName) !== undefined) {
        let genre = objGenreManager.searchByName(genreName);
        genre.deleteAlbum(album); // If artist is not in list it won't do anything
        if (genre.getAlbums().length === 0) {
          GenreManager.getGenreManager().deleteGenre(genre);
        }
        GenreManager.getGenreManager().store();
      }
    });
    // Album
    this.collection.delete(album);
    this.store();
  }


  /**
   * Agrega un nuevo álbum a la colección.
   * @param album Álbum a agregar
   */
  public addAlbum(album: Album): void {
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (album.getPublisher() === artist.getName()) {
        artist.addAlbum(album);
      }
    });
    artistManager.store();
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (album.getPublisher() === group.getName()) {
        group.addAlbums(album);
      }
    });
    groupManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (album.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addAlbum(album);
      }
    });
    genreManager.store();
    this.add(album);
    this.store();
  }

  /**
   * Edita un álbum de la colección.
   * @param album Album a editar
   * @param name Nombre
   * @param publisher Autor
   * @param publicationYear Ano de publicación
   * @param genres Géneros
   * @param songs Canciones
   */
  public editAlbum(album: Album, name: string, publisher: string, publicationYear: number, genres: string[], songs: Song[]): void {
    album.setName(name);
    album.setPublisher(publisher);
    album.setYear(publicationYear);
    album.setGenres(genres);
    const oldSongs: Song[] = album.getSongs();
    album.setSongs(songs);
    this.store();
    // Song
    const songManager: SongManager = SongManager.getSongManager();
    let hasAlbum: boolean;
    oldSongs.forEach((song) => {
      hasAlbum = false;
      this.getCollection().forEach((album) => {
        if (album.getSongs().find((s) => s === song) !== undefined) {
          hasAlbum = true;
        }
      });
      if (!hasAlbum) {
        songManager.removeSong(song);
      }
    });
    songManager.store();
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (artist.getName() === album.getPublisher()) {
        artist.addAlbum(album);
      } else {
        artist.removeAlbum(album);
        if (artist.getAlbums().length === 0) {
          artistManager.deleteArtist(artist);
        }
      }
    });
    artistManager.store();
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (group.getName() === album.getPublisher()) {
        group.addAlbums(album);
      } else {
        group.removeAlbum(album);
        if (group.getAlbums().length === 0) {
          groupManager.deleteGroup(group);
        }
      }
    });
    groupManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (album.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addAlbum(album);
      } else {
        genre.deleteAlbum(album);
        if (genre.getAlbums().length === 0) {
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
   * Elimina una canción de todos los álbumes
   * @param song Canción a eliminar
   */
  public removeSong(song: Song): void {
    this.collection.forEach((al) => {
      al.removeSong(song);
    });
    this.store();
  }
  /**
   * Guarda los álbumes en la base de datos.
   */
  public store(): void {
    this.database.set('albums', [...this.collection.values()]).write();
  }
}
