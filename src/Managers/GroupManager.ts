import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Group} from '../Basics/Group';
import {GroupInterface} from '../Interfaces/GroupInterface';
import {AlbumManager} from './AlbumManager';
import {GenreManager} from './GenreManager';
import {Album} from '../Basics/Album';
import {ArtistManager} from './ArtistManager';
import {Artist} from '../Basics/Artist';
import {SongManager} from './SongManager';
import {PlaylistManager} from './PlaylistManager';

/**
 * Tipo para almacenar grupos mediante Lowdb.
 */
type schemaType = {
    groups: GroupInterface[]
};
/**
 * Clase para gestionar los grupos.
 */
export class GroupManager extends Manager<Group> {
  /**
   * Instancia de la clase `GroupManager`.
   */
  private static groupManager: GroupManager;
  /**
   * Base de datos de los grupos.
   */
  private database: lowdb.LowdbSync<schemaType>;
  /**
   * Constructor de la clase `GroupManager`.
   */
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Groups.json'));
    if (this.database.has('groups').value()) {
      let dbItems = this.database.get('groups').value();
      dbItems.forEach((item) => this.collection.add(Group.deserialize(item)));
    }
  }
  /**
   * Devuelve la instancia de la clase `GroupManager`.
   * @returns Devuelve la única instancia de la clase.
   */
  public static getGroupManager(): GroupManager {
    if (!GroupManager.groupManager) {
      GroupManager.groupManager = new GroupManager();
    }
    return GroupManager.groupManager;
  }

  /**
   * Agrega un nuevo grupo a la colección.
   * @param group Grupo a agregar
   */
  public addGroup(group: Group): void {
    // Genre
    let genres = group.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
    console.log(group.getGenres());
    console.log(genres);
    genres.forEach((genre) => {
      genre.addMusician(group);
      GenreManager.getGenreManager().store();
    });
    // Artist
    let artists = group.getArtists();
    artists.forEach((artist) => {
      artist.addGroup(group.getName());
      ArtistManager.getArtistManager().store();
    });
    // Group
    this.collection.add(group);
    this.store();
  }

  /**
   * Elimina un grupo de la colección.
   * @param group Grupo a eliminar.
   */
  public deleteGroup(group: Group): void {
    // Artist
    const objArtistManager:ArtistManager = ArtistManager.getArtistManager();
    const groupArtists: Artist[] = group.getArtists();
    groupArtists.forEach((artist) => {
      artist.setGroups(['-']);
      objArtistManager.store();
    });
    // Album
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    const groupAlbums: Album[] = group.getAlbums();
    groupAlbums.forEach((album) => {
      objAlbumManager.removeAlbum(album);
      AlbumManager.getAlbumManager().store();
    });
    // Genre
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = group.getGenres();
    genreNames.forEach((genreName) => {
      if (objGenreManager.searchByName(genreName) !== undefined) {
        let genre = objGenreManager.searchByName(genreName);
        genre.deleteMusician(group);
        if (genre.getMusicians().length == 0) {
          objGenreManager.deleteGenre(genre);
        }
      }
    });
    GenreManager.getGenreManager().store();
    // Group
    this.collection.forEach((element) => {
      if (element.getName() === group.getName()) {
        this.collection.delete(group);
      }
    });
    this.store();
    SongManager.getSongManager().store();
  }

  /**
   * Edita un grupo de la colección.
   * @param group Grupo a editar.
   * @param name Nombre
   * @param artists Artistas
   * @param year Ano de fundación
   * @param genres Géneros
   * @param albums Álbumes
   */
  public editGroup(group: Group, name: string, artists: Artist[], year: number,
      genres: string[], albums: Album[] ): void {
    const oldName = group.getName();
    group.setName(name);
    group.setArtists(artists);
    group.setYearCreation(year);
    group.setGenres(genres);
    group.setAlbums(albums);
    this.store();
    // Song
    SongManager.getSongManager().store();
    // Album
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (group.getAlbums().find((a) => a === album) === undefined && album.getPublisher() === oldName) {
        albumManager.removeAlbum(album);
      }
    });
    albumManager.store();
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      artist.removeGroup(oldName);
      if (group.getArtists().find((a) => a === artist) !== undefined) {
        artist.addGroup(group.getName());
      } else {
        if (artist.getGroups().length === 0) {
          artist.setGroups(['-']);
        }
      }
    });
    artistManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (group.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addMusician(group);
      } else {
        genre.deleteMusician(group);
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
   * Guarda los artistas en la base de datos.
   */
  public store(): void {
    this.database.set('groups', [...this.collection.values()]).write();
  }
}