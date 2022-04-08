import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {SongInterface} from '../Interfaces/SongInterface';
import {Artist} from '../Basics/Artist';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {Genre} from '../Basics/Genre';

type schemaType = {
    artists: {
      name: string,
      groups: string[],
      genres: string[],
      albums: AlbumInterface[],
      songs: SongInterface[]}[]
};
export class ArtistManager extends Manager<Artist> {
  private static artistManager: ArtistManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Artists.json'));
    if (this.database.has('artists').value()) {
      let dbItems = this.database.get('artists').value();
      dbItems.forEach((item) => this.collection.add(Artist.deserialize(item)));
    }
  }

  public static getArtistManager(): ArtistManager {
    if (!ArtistManager.artistManager) {
      ArtistManager.artistManager = new ArtistManager();
    }
    return ArtistManager.artistManager;
  }

  getArtistByName(name:string): Artist|undefined {
    return ([...this.collection.values()].find((album) => album.getName() === name));
  }

  removeGenre(genre: Genre) {
    this.collection.forEach((artist) => {
      artist.removeGenre(genre);
    });
    this.storeArtists();
  }

  updateGenre(genre: Genre, artists: string[]) {
    this.collection.forEach((artist) => {
      if (artists.find((x) => x === artist.getName()) !== undefined) {
        artist.addGenre(genre);
      } else {
        artist.removeGenre(genre);
      }
    });
    this.storeArtists();
  }

  storeArtists() {
    this.database.set('artists', [...this.collection.values()]).write();
  }
}