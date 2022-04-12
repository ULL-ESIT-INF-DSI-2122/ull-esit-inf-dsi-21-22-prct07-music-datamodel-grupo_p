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
      objArtistManager.deleteArtist(artist, false);
      ArtistManager.getArtistManager().store();
    });
    // elimina los albunes del grupo
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    const groupAlbums: Album[] = group.getAlbums();
    groupAlbums.forEach((album) => {
      objAlbumManager.remove(album);
      AlbumManager.getAlbumManager().store();
    });

    // elimina los grupo en los generos
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = group.getGenres();
    genreNames.forEach((genreName) => {
      let genre = objGenreManager.searchByName(genreName);
      genre.deleteMusician(group); // If group is not in list it won't do anything
      if (genre.getMusicians().length == 0) {
        objGenreManager.remove(genre);
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
  /*
  public editGroup(group: Group, newName: string, newArtists: Artist[], newYear: number,
      newGenres: string[], newAlbums: Album[] ): void {
    if (group.getArtists() != newArtists) {
      let artistGroup = group.getArtists();
      artistGroup.forEach((artist) => {
        artist.removeGroup(group.getName());
      });
      newArtists.forEach((artist) => {
        artist.addGroup(newName);
      });
    }
    if (group.getName() != newName) {
      group.setName(newName);
      let albumsGroups = group.getAlbums();
      albumsGroups.forEach((album) => {
        album.setPublisher(newName);
      });
      let artistGroup = group.getArtists();
      artistGroup.forEach((artist) => {
        artist.removeGroup(group.getName());
        artist.addGroup(newName);
      });
    }
    group.setYearCreation(newYear);
    if (group.getGenres() != newGenres) {
      const genreObj = group.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
      genreObj.forEach((genre) => {
        genre.deleteMusician(group);
      });
      const newGenreObj = newGenres.map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
      newGenreObj.forEach((genre) => {
        genre.addMusician(group);
      });
    }
    if (group.getAlbums() != newAlbums) {
      let albumsToDelete = group.getAlbums().filter((album) => !newAlbums.includes(album));
      group.setAlbums(newAlbums);
      albumsToDelete.forEach((album) => AlbumManager.getAlbumManager().remove(album));
    }
    group.setGenres(newGenres);
    ArtistManager.getArtistManager().store();
    AlbumManager.getAlbumManager().store();
    SongManager.getSongManager().store();
    GenreManager.getGenreManager().store();
    this.store();
  }*/
  public editGroup(oldGroup: Group, newGroup: Group) {
    this.addGroup(newGroup);
    this.deleteGroup(oldGroup);
  }
}