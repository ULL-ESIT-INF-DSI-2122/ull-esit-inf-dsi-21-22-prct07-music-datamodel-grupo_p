import {Genre} from '../Basics/Genre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {GroupInterface} from '../Interfaces/GroupInterface';
import {ArtistInterface} from '../Interfaces/ArtistInterface';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {SongInterface} from '../Interfaces/SongInterface';
import {Artist} from '../Basics/Artist';
import {Group} from '../Basics/Group';
import {Album} from '../Basics/Album';
import {Song} from '../Basics/Song';

type schemaType = {
    genres: {
      name: string;
      musicians: (GroupInterface|ArtistInterface)[];
      albums: AlbumInterface[],
      songs: SongInterface[] }[]
};
export class GenreManager extends Manager<Genre> {
  private static genresManager: GenreManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Genres.json'));
    if (this.database.has('genres').value()) {
      let dbItems = this.database.get('genres').value();
      dbItems.forEach((item) => this.collection.add(Genre.deserialize(item)));
    }
  }

  public static getGenreManager(): GenreManager {
    if (!GenreManager.genresManager) {
      GenreManager.genresManager = new GenreManager();
    }
    return GenreManager.genresManager;
  }

  addGenre(genre: Genre): void {
    this.collection.add(genre);
    this.storeGenres();
  }
  removeGenre(genre: Genre): void {
    this.collection.forEach((element) => {
      if (element.getName() === genre.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeGenres();
  }
  editGenre(genre: Genre, newName: string, newMusicians: (Group|Artist)[],
      newAlbums: Album[], newSongs: Song[] ): void {
    this.collection.forEach((element) => {
      if (element.getName() === genre.getName()) {
        element.setName(newName);
        element.setMusicians(newMusicians);
        element.setAlbums(newAlbums);
        element.setSongs(newSongs);
      }
    });
    this.storeGenres();
  }
  getGenreByName(name:string): Genre|undefined {
    return ([...this.collection.values()].find((genre) => genre.getName() === name));
  }

  storeGenres() {
    this.database.set('genres', [...this.collection.values()]).write();
  }
}

