import {Group} from '../Basics/Group';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {ArtistInterface} from '../Interfaces/ArtistInterface';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {Artist} from '../Basics/Artist';
import {Album} from '../Basics/Album';
import {AlbumManager} from './AlbumManager';
import {GenreManager} from './GenreManager';
import {ArtistManager} from './ArtistManager';

type schemaType = {
    groups: { name: string; artists: ArtistInterface[], yearCreation: number, genres: string[], albums: AlbumInterface[] }[]
};

export class GroupsManager extends Manager<Group> {
  private static groupManager: GroupsManager;
  private database: lowdb.LowdbSync<schemaType>;

  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Group.json'));
    if (this.database.has('groups').value()) {
      let dbItems = this.database.get('groups').value();
      dbItems.forEach((item) => this.collection.add(Group.deserialize(item)));
    }
  }

  private storeGroups() {
    this.database.set('groups', [...this.collection.values()]).write();
  }

  public static getGroupManager(): GroupsManager {
    if (!GroupsManager.groupManager) {
      GroupsManager.groupManager = new GroupsManager();
    }
    return GroupsManager.groupManager;
  }

  addGroup(group: Group): void {
    this.collection.add(group);
    this.storeGroups();
  }

  removeGroup(group: Group): void {
    // Delete group from albums
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    const groupAlbums: Album[] = group.getAlbums();
    groupAlbums.forEach((album) => {
      objAlbumManager.deleteAlbum(album);
    });

    // Delet group from genres
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = group.getGenres();
    genreNames.forEach((genreName) => {
      let genre = objGenreManager.searchByName(genreName);
      genre.deleteMusician(group); // If group is not in list it won't do anything
      if (genre.getMusicians().length == 0) {
        objGenreManager.removeGenre(genre);
      }
    });

    // Delete artist from group
    const objArtistManager:ArtistManager = ArtistManager.getArtistsManager();
    const groupArtists: Artist[] = group.getArtists();
    groupArtists.forEach((artist) => {
      objArtistManager.removeArtist(artist);
    });

    this.collection.forEach((element) => {
      if (element.getName() === group.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeGroups();
  }

  editGroup(group: Group, newName: string, newArtists: Artist[], newYear: number,
      newGenres: string[], newAlbums: Album[] ): void {
    // ARTISTA Y ALBUM???
    this.removeGroup(group);
    this.addGroup(new Group(newName, newArtists, newYear, newGenres, newAlbums));
    this.storeGroups();
  }
}
