import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Album} from '../Basics/Album';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {Song} from '../Basics/Song';
import {Group} from '../Basics/Group';
import {Artist} from '../Basics/Artist';
import {Genre} from '../Basics/Genre';
import {SongManager} from './SongManager';
import { ArtistManager } from './ArtistManager';
import { GroupManager } from './GroupManager';
import { GenreManager } from './GenreManager';

type schemaType = {
    albums: AlbumInterface[]
};
export class AlbumManager extends Manager<Album> {
  private static albumManager: AlbumManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Albums.json'));
    if (this.database.has('albums').value()) {
      let dbItems = this.database.get('albums').value();
      dbItems.forEach((item) => this.collection.add(Album.deserialize(item)));
    }
  }

  public static getAlbumManager(): AlbumManager {
    if (!AlbumManager.albumManager) {
      AlbumManager.albumManager = new AlbumManager();
    }
    return AlbumManager.albumManager;
  }

  removeAlbum(album: Album): void {
    // eliminar canciones del album
    const objSongManager:SongManager = SongManager.getSongManager(); h    const albumSis.collection.delete(album);
    this.store();
  }

  addAlbum (album: Album): void {
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach(artist => {
      if (album.getPublisher() === artist.getName()) {
        artist.addAlbum(album);
      }
    });
    artistManager.store();
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach(group => {
      if (album.getPublisher() === group.getName()) {
        group.addAlbums(album);
      }
    });
    groupManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach(genre => {
      if (album.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addAlbum(album);
      }
    });
    genreManager.store();
    this.store();
  }

  removeSong(song: Song) {
    this.collection.forEach((al) => {
      al.removeSong(song);
    });
    this.store();
  }

  store() {
    this.database.set('albums', [...this.collection.values()]).write();
  }
}
