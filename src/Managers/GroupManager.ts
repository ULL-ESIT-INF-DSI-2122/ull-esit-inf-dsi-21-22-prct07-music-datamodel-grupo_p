import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Group} from '../Basics/Group';
import {Genre} from '../Basics/Genre';
import {GroupInterface} from '../Interfaces/GroupInterface';

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

  getGroupByName(name:string): Group|undefined {
    return ([...this.collection.values()].find((album) => album.getName() === name));
  }

  removeGenre(genre: Genre) {
    this.collection.forEach((group) => {
      group.removeGenre(genre);
    });
    this.storeGroups();
  }

  updateGenre(genre: Genre, groups: string[]) {
    this.collection.forEach((group) => {
      if (groups.find((x) => x === group.getName()) !== undefined) {
        group.addGenre(genre);
      } else {
        group.removeGenre(genre);
      }
    });
    this.storeGroups();
  }


  storeGroups() {
    this.database.set('groups', [...this.collection.values()]).write();
  }
}