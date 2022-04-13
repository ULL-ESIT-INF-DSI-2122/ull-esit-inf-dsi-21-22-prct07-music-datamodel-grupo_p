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

type schemaType = {
    groups: GroupInterface[]
};
export class GroupManager extends Manager<Group> {
  private static groupManager: GroupManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Groups.json'));
    if (this.database.has('groups').value()) {
      let dbItems = this.database.get('groups').value();
      dbItems.forEach((item) => this.collection.add(Group.deserialize(item)));
    }
  }

  public static getGroupManager(): GroupManager {
    if (!GroupManager.groupManager) {
      GroupManager.groupManager = new GroupManager();
    }
    return GroupManager.groupManager;
  }

  store() {
    this.database.set('groups', [...this.collection.values()]).write();
  }

  public addGroup(group: Group): void {
    let genres = group.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
    console.log(group.getGenres());
    console.log(genres);
    genres.forEach((genre) => {
      genre.addMusician(group);
      GenreManager.getGenreManager().store();
    });
    let artists = group.getArtists();
    artists.forEach((artist) => {
      artist.addGroup(group.getName());
      ArtistManager.getArtistManager().store();
    });
    this.collection.add(group);
    this.store();
  }

  public deleteGroup(group: Group): void {
    // elimina los integrantes del grupo
    const objArtistManager:ArtistManager = ArtistManager.getArtistManager();
    const groupArtists: Artist[] = group.getArtists();
    groupArtists.forEach((artist) => {
      // objArtistManager.deleteArtist(artist, false);
      artist.setGroups(['-']);
      objArtistManager.store();
    });
    // elimina los albumes del grupo
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    const groupAlbums: Album[] = group.getAlbums();
    groupAlbums.forEach((album) => {
      objAlbumManager.removeAlbum(album);
      AlbumManager.getAlbumManager().store();
    });

    // elimina el grupo en los generos
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = group.getGenres();
    genreNames.forEach((genreName) => {
      if (objGenreManager.searchByName(genreName) !== undefined) {
        let genre = objGenreManager.searchByName(genreName);
        genre.deleteMusician(group); // If group is not in list it won't do anything
        if (genre.getMusicians().length == 0) {
          objGenreManager.deleteGenre(genre);
        }
      }
    });
    GenreManager.getGenreManager().store();

    this.collection.forEach((element) => {
      if (element.getName() === group.getName()) {
        this.collection.delete(group);
      }
    });
    this.store();
    SongManager.getSongManager().store();
  }

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
}