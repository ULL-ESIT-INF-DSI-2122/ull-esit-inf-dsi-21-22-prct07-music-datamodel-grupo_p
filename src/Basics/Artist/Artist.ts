import {Album} from '../Album/Album';
import {Song} from '../Song/Song';
import {BasicData} from '../../Interfaces/BasicData';
// import {ArtistInterface} from '../../Interfaces/ArtistInterface';
import {SongsManager} from '../../Managers/SongManager';
// import {AlbumManager} from '../../Managers/AlbumManager';


export class Artist implements BasicData {
  constructor(private name: string, private groups: string[],
      private genres: string[], private albums: Album[], private songs: Song[] = [], newSongName: string = '' ) {
    // We create the new songs with dummy attributes for now
    if (newSongName != '') {
      const mySong = new Song(newSongName, this.getName(), 0, [], new Date('0-0-0'), true, 0);
      this.songs.push(mySong);
      SongsManager.getSongsManager().addSong(mySong);
    }
  }

  // GETTERS
  public getName(): string {
    return this.name;
  }
  public getGroups(): string[] {
    return this.groups;
  }
  public getGenres(): string[] {
    return this.genres;
  }
  public getAlbums(): Album[] {
    return this.albums;
  }
  public getSongs(): Song[] {
    return this.songs;
  }
  // SETTERS
  public setName(newName: string): void {
    this.name = newName;
  }
  public setGroups(newGroups: string[]): void {
    this.groups = newGroups;
  }
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
  }
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  // ADDS
  public addGroup(newGroup: string) {
    this.groups.push(newGroup);
  }
  public addGenre(newGenre: string) {
    this.genres.push(newGenre);
  }
  public addSong(newSong: Song) {
    this.songs.push(newSong);
  }
  public addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }
  // REMOVES
  public removeGroup(groupDelete: string) {
    this.groups = this.groups.filter((elemento) => elemento !== groupDelete);
  }
  public removeGenre(genreDelete: string) {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }
  public removeAlbum(albumDelete: Album) {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }
  /*
  public getNumberListenersMonthly(): number {
    let listenersGroups: number = 0;
    let listenerSongs: number = 0;
    this.getGroups().forEach((group) => {
      listenersGroups += group.getNumberListenersMonthly();
    });
    this.getSongs().forEach((song) => {
      listenerSongs += song.monthlyReproductions();
    });
    return listenerSongs + listenersGroups;
  }

  public static deserialize(artist: ArtistInterface): Artist {
    let managerSong = SongsManager.getSongsManager();
    let managerAlbum = AlbumManager.getAlbumManager();
    let songs: Song[] = artist.songs.map((songName) => {
      return managerSong.searchByName(songName.name);
    });
    let albums: Album[] = artist.albums.map((albumName) => {
      return managerAlbum.searchByName(albumName.name);
    });
    return new Artist(artist.name, artist.groups, artist.genres, albums, songs);
  }
  */
}

