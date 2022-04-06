import {Artist} from '../clasesBase/Artist';
import {Group} from '../clasesBase/Group';
import {MusicGenre} from '../clasesBase/MusicGenre';
import {Album} from '../clasesBase/Album';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');


type schemaType = {
    groups: { name: string; artists: Artist[], yearCreation: number, genres: MusicGenre[], albums: Album[] }[]
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
      newGenres: MusicGenre[], newAlbums: Album[] ): void {
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
  /*
  editName(artista: Artist, newName: string): void {
    artista.setName(newName);
  }
  editYear(artista: Artist, newYear: number) {
    artista.setYearCreation(newYear);
  }
  addGenre(artista: Artist, newGenre: MusicGenre): void {
    artista.addGenre(newGenre);
  }
  deleteGenre(artista: Artist, nameGenre: MusicGenre): void {
    artista.removeGenre(nameGenre);
  }
  addGroup(artista: Artist, newGroup: Group): void {
    artista.addGroup(newGroup);
  }
  deleteGroup(artista: Artist, group: Group): void {
    artista.removeGroup(group);
  }
  addAlbum(artista: Artist, newAlbum: Album) {
    artista.addAlbum(newAlbum);
  }
  removeAlbum(artista: Artist, album: Album) {
    artista.removeAlbum(album);
  }
  */
}