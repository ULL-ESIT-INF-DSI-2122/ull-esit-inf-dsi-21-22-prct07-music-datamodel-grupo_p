import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Group} from '../Basics/Group';
import {Genre} from '../Basics/Genre';
import {GroupInterface} from '../Interfaces/GroupInterface';
import {AlbumManager} from './AlbumManager';
import {GenreManager} from './GenreManager';
import {Album} from '../Basics/Album';
import {ArtistManager} from './ArtistManager';
import {Artist} from '../Basics/Artist';

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

  removeGenre(genre: Genre) {
    this.collection.forEach((group) => {
      group.removeGenre(genre);
    });
    this.store();
  }

  updateGenre(genre: Genre, groups: string[]) {
    this.collection.forEach((group) => {
      if (groups.find((x) => x === group.getName()) !== undefined) {
        group.addGenre(genre);
      } else {
        group.removeGenre(genre);
      }
    });
    this.store();
  }


  store() {
    this.database.set('groups', [...this.collection.values()]).write();
  }

  public addGroup(group: Group): void {
    let genres = group.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
    genres.forEach((genre) => {
      genre.addMusician(group);
    });
    let artists = group.getGenres().map((artistName) => ArtistManager.getArtistManager().searchByName(artistName));
    artists.forEach((artist) => {
      artist.addGroup(group.getName());
    });
    this.collection.add(group);
    this.store();
  }

  public removeGroup(group: Group): void {
    // Delete group from albums
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    const groupAlbums: Album[] = group.getAlbums();
    groupAlbums.forEach((album) => {
      objAlbumManager.remove(album);
    });

    // Delet group from genres
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = group.getGenres();
    genreNames.forEach((genreName) => {
      let genre = objGenreManager.searchByName(genreName);
      genre.deleteMusician(group); // If group is not in list it won't do anything
      if (genre.getMusicians().length == 0) {
        objGenreManager.remove(genre);
      }
    });

    // Delete artist from group
    const objArtistManager:ArtistManager = ArtistManager.getArtistManager();
    const groupArtists: Artist[] = group.getArtists();
    groupArtists.forEach((artist) => {
      objArtistManager.deleteArtist(artist);
    });

    this.collection.forEach((element) => {
      if (element.getName() === group.getName()) {
        this.collection.delete(element);
      }
    });
    this.store();
  }

  public editGroup(group: Group, newName: string, newArtists: Artist[], newYear: number,
      newGenres: string[], newAlbums: Album[] ): void {
    // ARTISTA Y ALBUM???
    this.removeGroup(group);
    this.addGroup(new Group(newName, newArtists, newYear, newGenres, newAlbums));
    this.store();
  }
}