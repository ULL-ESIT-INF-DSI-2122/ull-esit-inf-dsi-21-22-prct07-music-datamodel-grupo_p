import {Artist} from '../Basics/Artist';
import {Group} from '../Basics/Group';
import {Genre} from '../Basics/Genre';
import {Album} from '../Basics/Album';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');


type schemaType = {
    groups: { name: string; artists: Artist[], yearCreation: number, genres: Genre[], albums: Album[] }[]
};

export class GroupsManager extends Manager<Group> {
  private static groupManager: GroupsManager;
  private database: lowdb.LowdbSync<schemaType>;

  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Group.json'));
    if (this.database.has('groups').value()) {
      let dbItems = this.database.get('groups').value();
      dbItems.forEach((item) => this.collection.add(new Group(
          item.name, item.artists, item.yearCreation, item.genres, item.albums,
      )));
    }
  }

  public static getGroupManager(): GroupsManager {
    if (!GroupsManager.groupManager) {
      GroupsManager.groupManager = new GroupsManager();
    }
    return GroupsManager.groupManager;
  }

  storeGroups() {
    this.database.set('groups', [...this.collection.values()]).write();
  }

  addGroup(group: Group): void {
    this.collection.add(group);
    this.storeGroups();
  }

  removeGroup(group: Group): void {
    this.collection.forEach((element) => {
      if (element.getName() === group.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeGroups();
  }

  editGroup(group: Group, newName: string, newArtists: Artist[], newYear: number,
      newGenres: Genre[], newAlbums: Album[] ): void {
    this.collection.forEach((element) => {
      if (element.getName() === group.getName()) {
        element.setName(newName);
        element.setYearCreation(newYear);
        element.setGenres(newGenres);
        element.setArtists(newArtists);
        element.setAlbums(newAlbums);
      }
    });
    this.storeGroups();
  }
  printDetails(): void {
  }
  /*
  editName(group: Group, newName: string): void {
    group.setName(newName);
  }
  editYear(group: Group, newYear: number) {
    group.setYearCreation(newYear);
  }
  addGenre(group: Group, newGenre: Genre): void {
    group.addGenre(newGenre);
  }
  deleteGenre(group: Group, nameGenre: Genre): void {
    group.removeGenre(nameGenre);
  }
  addArtist(group: Group, newArtist: Artist): void {
    group.addArtist(newArtist);
  }
  deleteArtist(group: Group, artist: Artist): void {
    group.removeArtist(artist);
  }
  addAlbum(group: Group, newAlbum: Album) {
    group.addAlbum(newAlbum);
  }
  removeAlbum(group: Group, album: Album) {
    group.removeAlbum(album);
  }
  */
}