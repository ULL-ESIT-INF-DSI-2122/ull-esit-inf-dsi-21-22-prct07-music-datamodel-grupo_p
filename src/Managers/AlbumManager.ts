import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Album} from '../Basics/Album';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {Song} from '../Basics/Song';
import {ArtistManager} from './ArtistManager';
import {GroupManager} from './GroupManager';
import {GenreManager} from './GenreManager';
import {SongManager} from './SongManager';

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
    const objSongManager: SongManager = SongManager.getSongManager();
    const albumSongs: Song[] = album.getSongs();
    const albumSongsNames: string[] = albumSongs.map((song) => song.getName());
    albumSongsNames.forEach((songName) => {
      let song: Song = objSongManager.searchByName(songName);
      objSongManager.removeSong(song);
    });
    // eliminar de los artistas
    let artistObj = ArtistManager.getArtistManager().getCollection();
    let artistArray = Array.from(artistObj);
    let artistsThisAlbum = artistArray.filter((artist) => artist.getAlbums().includes(album));
    artistsThisAlbum.forEach((artist) => {
      artist.removeAlbum(album);
      if (artist.getAlbums().length === 0) {
        ArtistManager.getArtistManager().deleteArtist(artist);
      }
    });
    ArtistManager.getArtistManager().store();
    // eliminar de los grupos
    let groupAsociate = GroupManager.getGroupManager().getCollection();
    let groupObj = Array.from(groupAsociate);
    let groupThisAlbum = groupObj.filter((group) => group.getAlbums().includes(album));
    groupThisAlbum.forEach((group) => {
      group.removeAlbum(album);
      if (group.getAlbums().length === 0) {
        GroupManager.getGroupManager().deleteGroup(group);
      }
    });
    GroupManager.getGroupManager().store();
    // eliminar de generos
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = album.getGenres();
    genreNames.forEach((genreName) => {
      if (objGenreManager.searchByName(genreName) !== undefined) {
        let genre = objGenreManager.searchByName(genreName);
        genre.deleteAlbum(album); // If artist is not in list it won't do anything
        if (genre.getAlbums().length === 0) {
          GenreManager.getGenreManager().deleteGenre(genre);
        }
        GenreManager.getGenreManager().store();
      }
    });

    // eliminar album
    this.collection.delete(album);
    this.store();
  }

  addAlbum(album: Album): void {
    // Artist
    const artistManager: ArtistManager = ArtistManager.getArtistManager();
    artistManager.getCollection().forEach((artist) => {
      if (album.getPublisher() === artist.getName()) {
        artist.addAlbum(album);
      }
    });
    artistManager.store();
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (album.getPublisher() === group.getName()) {
        group.addAlbums(album);
      }
    });
    groupManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (album.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addAlbum(album);
      }
    });
    genreManager.store();
    this.add(album);
    this.store();
  }
  editAlbum(oldAlbum: Album, newAlbum: Album): void {
    // actualizar album
    this.addAlbum(newAlbum);
    this.removeAlbum(oldAlbum);
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
