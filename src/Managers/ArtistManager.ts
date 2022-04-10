import {Artist} from '../Basics/Artist';
import {Song} from '../Basics/Song';
import {Album} from '../Basics/Album';
import {Manager} from './Manager';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {SongInterface} from '../Interfaces/SongInterface';
import {AlbumManager} from './AlbumManager';
import {SongsManager} from './SongManager';
import {GroupsManager} from './GroupsManager';
import {GenreManager} from './GenreManager';


type schemaType = {
    artists: { name: string; groups: string[]; genres: string[], albums: AlbumInterface[], songs: SongInterface[] }[]
};

export class ArtistManager extends Manager<Artist> {
  private static artistManager: ArtistManager;
  private database: lowdb.LowdbSync<schemaType>;

  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Artist.json'));
    if (this.database.has('artists').value()) {
      let dbItems = this.database.get('artists').value();
      dbItems.forEach((item) => this.collection.add(Artist.deserialize(item)));
    }
  }

  private storeArtist() {
    this.database.set('artists', [...this.collection.values()]).write();
  }

  public static getArtistsManager(): ArtistManager {
    if (!ArtistManager.artistManager) {
      ArtistManager.artistManager = new ArtistManager();
    }
    return ArtistManager.artistManager;
  }

  addArtist(artist: Artist): void {
    let groups = artist.getGroups().map((groupName) => GroupsManager.getGroupManager().searchByName(groupName));
    groups.forEach((group) => {
      group.addArtist(artist);
    });

    let genres = artist.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
    genres.forEach((genre) => {
      genre.addMusician(artist);
    });

    artist.getAlbums().forEach((album) => {
      album.addWhoPublishes(artist);
    });

    this.collection.add(artist);
    this.storeArtist();
  }

  removeArtist(artist: Artist, deleteSongs: boolean = true): void {
    // Delete artists albums
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    const artistAlbums: Album[] = artist.getAlbums();
    const artistAlbumsNames: string[] = artistAlbums.map((album) => album.getName());
    artistAlbumsNames.forEach((albumName) => {
      objAlbumManager.deleteAlbum(albumName);
    });

    // Delete artists songs
    if (deleteSongs) {
      const objSongManager:SongsManager = SongsManager.getSongsManager();
      const artistSongs: Song[] = artist.getSongs();
      const artistSongsNames: string[] = artistSongs.map((song) => song.getName());
      artistSongsNames.forEach((songName) => {
        objSongManager.deleteSong(songName);
      });
    }

    // Grupos
    const objGroupManager:GroupsManager = GroupsManager.getGroupManager();
    const groupNames: string[] = artist.getGroups();
    groupNames.forEach((groupName) => {
      let group = objGroupManager.searchByName(groupName);
      group.removeArtist(artist); // If artist is not in list it won't do anything
      if (group.getArtists().length == 0) {
        objGroupManager.removeGroup(group);
      }
    });

    // Delet artist from genres
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = artist.getGenres();
    genreNames.forEach((genreName) => {
      let genre = objGenreManager.searchByName(genreName);
      genre.deleteMusician(artist); // If artist is not in list it won't do anything
      if (genre.getMusicians().length == 0) {
        objGenreManager.removeGenre(genre);
      }
    });

    // Delete from artist collection
    this.collection.forEach((element) => {
      if (element.getName() === artist.getName()) {
        this.collection.delete(element);
      }
    });
    this.storeArtist();
  }

  editArtist(artist: Artist, newName: string, newGroups: string[], newGenres: string[],
      newAlbums: Album[], newSongs: Song[] ): void {
    const originalSongs = artist.getSongs();
    const originalArtistName = artist.getName();
    this.removeArtist(artist, false);
    this.addArtist(new Artist(newName, newGroups, newGenres, newAlbums, newSongs));
    const newSongsNames = newSongs.map((song) => song.getName());
    const originalSongsToDelete = originalSongs.filter((song) => !newSongsNames.includes(song.getName()));
    originalSongsToDelete.forEach((song) => SongsManager.getSongsManager().removeSong(song));
    if (originalArtistName != newName) {
      newSongs.forEach((song) => song.setAuthor(newName));
    }
    this.storeArtist();
  }
}
