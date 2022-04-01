import {Album, Artist, Group, Song, MusicGenre} from '../Clases base/MusicGenre';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
type schemaType = {
    genres: { name: string; musicians: (Group|Artist)[]; albums: Album[], songs: Song[] }[]
};
export class MusicGenresManager extends Manager<MusicGenre> {
  private static musicGenresManager: MusicGenresManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/MusicGenres.json'));
    if (this.database.has('genres').value()) {
      let dbItems = this.database.get('genres').value();
      dbItems.forEach((item) => this.collection.add(new MusicGenre(
          item.name, item.musicians, item.albums, item.songs,
      )));
    }
  }

  public static getMusicGenresManager(): MusicGenresManager {
    if (!MusicGenresManager.musicGenresManager) {
      MusicGenresManager.musicGenresManager = new MusicGenresManager();
    }
    return MusicGenresManager.musicGenresManager;
  }

  addMusicGenre(genre: MusicGenre): void {
    this.collection.add(genre);
    this.storeGenres();
  }
  removeMusicGenre(genre: MusicGenre): void {
    this.collection.forEach((element) => {
      if (element.getName() === genre.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeGenres();
  }
  editMusicGenre(genre: MusicGenre, newName: string, newMusicians: (Group|Artist)[],
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
  updateMusician(musician: Artist|Group, genres: string[]): void {
    this.collection.forEach((element) => {
      if (genres.find((g) => g === element.getName()) !== undefined) {
        element.addMusician(musician);
      } else {
        element.removeMusician(musician);
      }
    });
    this.storeGenres();
  }

  removeMusician(musician: Artist|Group) {
    this.collection.forEach((element) => {
      element.removeMusician(musician);
    });
    this.storeGenres();
  }

  storeGenres() {
    this.database.set('genres', [...this.collection.values()]).write();
  }
}

