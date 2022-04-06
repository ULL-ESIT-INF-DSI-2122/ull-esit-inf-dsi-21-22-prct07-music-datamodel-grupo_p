import {Artist} from '../clasesBase/Artist';
import {Group} from '../clasesBase/Group';
import {MusicGenre} from '../clasesBase/MusicGenre';
import {Album} from '../clasesBase/Album';
import {Song} from '../clasesBase/Song';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');


type schemaType = {
    artists: { name: string; groups: Group[]; genres: MusicGenre[], albums: Album[], songs: Song[] }[]
};

export class ArtistManager extends Manager<Artist> {
  private static artistManager: ArtistManager;
  private database: lowdb.LowdbSync<schemaType>;

  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Artist.json'));
    if (this.database.has('artists').value()) {
      let dbItems = this.database.get('artists').value();
      dbItems.forEach((item) => this.collection.add(new Artist(
          item.name, item.groups, item.genres, item.albums, item.songs,
      )));
    }
  }

  public static getArtistsManager(): ArtistManager {
    if (!ArtistManager.artistManager) {
      ArtistManager.artistManager = new ArtistManager();
    }
    return ArtistManager.artistManager;
  }

  private storeArtist() {
    this.database.set('artists', [...this.collection.values()]).write();
  }
  addArtist(artist: Artist): void {
    this.collection.add(artist);
    this.storeArtist();
  }

  removeArtist(artist: Artist): void {
    this.collection.forEach((element) => {
      if (element.getName() === artist.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeArtist();
  }

  editArtist(artist: Artist, newName: string, newGroups: Group[], newGenres: MusicGenre[],
      newAlbums: Album[], newSongs: Song[] ): void {
    this.collection.forEach((element) => {
      if (element.getName() === artist.getName()) {
        element.setName(newName);
        element.setGenres(newGenres);
        element.setGroups(newGroups);
        element.setAlbums(newAlbums);
        element.setSongs(newSongs);
      }
    });
    this.storeArtist();
  }
  /*
  editName(artista: Artist, newName: string): void {
    artista.setName(newName);
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
  addSong(artista: Artist, newSong: Song) {
    artista.addSong(newSong);
  }
  removeSong(artista: Artist, song: Song) {
    artista.removeSong(song);
  }
  */
}

