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

  public addArtist(artist: Artist): void {
    let groups = artist.getGroups().map((groupName) => GroupManager.getGroupManager().searchByName(groupName));
    groups.forEach((group) => {
      group.addArtist(artist);
    });

    let genres = artist.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
    genres.forEach((genre) => {
      genre.addMusician(artist);
    });

    this.collection.add(artist);
    this.store();
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
      let genre = objGenreManager.searchByName(genreName);
      genre.deleteMusician(artist); // If artist is not in list it won't do anything
      if (genre.getMusicians().length == 0) {
        objGenreManager.deleteGenre(genre);
      }
    });

    // Playlist
    PlaylistManager.getPlaylistManager().update();
    PlaylistManager.getPlaylistManager().store();
    // Delete from artist collection
    this.remove(artist);
    this.store();
  }
  /*
  public editArtist(artist: Artist, newName: string, newGroups: string[], newGenres: string[],
      newAlbums: Album[], newSongs: Song[] ): void {
    const originalSongs = artist.getSongs();
    const originalArtistName = artist.getName();
    this.deleteArtist(artist, false);
    this.addArtist(new Artist(newName, newGroups, newGenres, newAlbums, newSongs));
    const newSongsNames = newSongs.map((song) => song.getName());
    const originalSongsToDelete = originalSongs.filter((song) => !newSongsNames.includes(song.getName()));
    originalSongsToDelete.forEach((song) => SongManager.getSongManager().removeSong(song));
    if (originalArtistName != newName) {
      newSongs.forEach((song) => song.setAuthorName(newName));
    }
    this.store();
  }*/
  updateArtist(artist: Artist, name: string, songs: string[], albums: string[], groups: string[], genres: string[]): void {
    // Song
    const songManager: SongManager = SongManager.getSongManager();
    songManager.getCollection().forEach((song) => {
      if (songs.find((x) => x === song.getName()) === undefined && song.getAuthorName() === artist.getName()) {
        songManager.removeSong(song);
      }
    });
    songManager.store();
    // Album
    const albumManager: AlbumManager = AlbumManager.getAlbumManager();
    albumManager.getCollection().forEach((album) => {
      if (albums.find((x) => x === album.getName()) === undefined && album.getPublisher() === artist.getName()) {
        albumManager.remove(album); // delete album
      }
    });
    songManager.store();
    // Group
    const groupManager: GroupManager = GroupManager.getGroupManager();
    groupManager.getCollection().forEach((group) => {
      if (groups.find((x) => x === group.getName()) !== undefined) {
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
      if (genres.find((x) => x === genre.getName()) !== undefined) {
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
    PlaylistManager.getPlaylistManager().store();
    artist.setName(name);
    this.store();
  }
}