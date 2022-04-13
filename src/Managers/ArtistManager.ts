import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {Artist} from '../Basics/Artist';
import {ArtistInterface} from '../Interfaces/ArtistInterface';
import {GroupManager} from './GroupManager';
import {GenreManager} from './GenreManager';
import {AlbumManager} from './AlbumManager';
import {Album} from '../Basics/Album';
import {SongManager} from './SongManager';
import {Song} from '../Basics/Song';
import {PlaylistManager} from './PlaylistManager';

type schemaType = {
    artists: ArtistInterface[]
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

  store() {
    this.database.set('artists', [...this.collection.values()]).write();
  }


  public deleteArtist(artist: Artist, deleteSongs: boolean = true): void {
    // Delete artists albums
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    const artistAlbums: Album[] = artist.getAlbums();
    const artistAlbumsNames: string[] = artistAlbums.map((album) => album.getName());
    artistAlbumsNames.forEach((albumName) => {
      let album: Album = objAlbumManager.searchByName(albumName);
      objAlbumManager.removeAlbum(album); // deleteAlbum cuando este AlbumManager
    });

    // Delete artists songs
    if (deleteSongs) {
      const objSongManager:SongManager = SongManager.getSongManager();
      const artistSongs: Song[] = artist.getSongs();
      const artistSongsNames: string[] = artistSongs.map((song) => song.getName());
      artistSongsNames.forEach((songName) => {
        let song: Song = objSongManager.searchByName(songName);
        objSongManager.removeSong(song);
      });
    }

    // Grupos
    const objGroupManager:GroupManager = GroupManager.getGroupManager();
    const groupNames: string[] = artist.getGroups();
    groupNames.forEach((groupName) => {
      if ((objGroupManager.searchByName(groupName)) !== undefined) {
        let group = objGroupManager.searchByName(groupName);
        group.removeArtist(artist); // If artist is not in list it won't do anything
        if (group.getArtists().length == 0) {
          objGroupManager.deleteGroup(group);
        }
      }
    });


    // Delet artist from genres
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = artist.getGenres();
    genreNames.forEach((genreName) => {
      if (objGenreManager.searchByName(genreName) !== undefined) {
        let genre = objGenreManager.searchByName(genreName);
        genre.deleteMusician(artist); // If artist is not in list it won't do anything
        if (genre.getMusicians().length == 0) {
          objGenreManager.deleteGenre(genre);
        }
      }
    });

    // Playlist
    PlaylistManager.getPlaylistManager().update();
    PlaylistManager.getPlaylistManager().store();
    // Delete from artist collection
    this.remove(artist);
    this.store();
  }
  public editArtist(artist: Artist, name: string, groups: string[],
      genres: string[], albums: Album[], songs: Song[]): void {
    artist.setName(name);
    artist.setGroups(groups);
    artist.setGenres(genres);
    artist.setAlbums(albums);
    artist.setSongs(songs);
    this.store();
    // Song
    const songManager: SongManager = SongManager.getSongManager();
    songManager.getCollection().forEach((song) => {
      if (artist.getSongs().find((s) => s === song) === undefined && song.getAuthorName() === artist.getName()) {
        songManager.removeSong(song);
      }
    });
    songManager.store();
    // Album
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (artist.getAlbums().find((a) => a === album) === undefined && album.getPublisher() === artist.getName()) {
        albumManager.removeAlbum(album);
      }
    });
    albumManager.store();
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (artist.getGroups().find((g) => g === group.getName()) !== undefined) {
        group.addArtist(artist);
      } else {
        group.removeArtist(artist);
        if (group.getArtists().length === 0) {
          groupManager.deleteGroup(group);
        }
      }
    });
    groupManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (artist.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addMusician(artist);
      } else {
        genre.deleteMusician(artist);
        if (genre.getMusicians().length === 0) {
          genreManager.deleteGenre(genre);
        }
      }
    });
    genreManager.store();
    // Playlist
    PlaylistManager.getPlaylistManager().update();
    this.store();
  }
  addArtist(artist: Artist): void {
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (artist.getGroups().find((g) => g === group.getName()) !== undefined) {
        group.addArtist(artist);
      }
    });
    groupManager.store();
    // Genre
    const genreManager: GenreManager = GenreManager.getGenreManager();
    genreManager.getCollection().forEach((genre) => {
      if (artist.getGenres().find((g) => g === genre.getName()) !== undefined) {
        genre.addMusician(artist);
      }
    });
    genreManager.store();
    // Artist
    this.add(artist);
    this.store();
  }
}