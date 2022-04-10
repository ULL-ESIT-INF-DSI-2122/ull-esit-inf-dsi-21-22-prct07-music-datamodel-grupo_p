import {Album} from '../Album/Album';
import {Artist} from '../Artist/Artist';
import {Song} from '../Song/Song';
import {BasicData} from '../../Interfaces/BasicData';
// import {GroupInterface} from '../../Interfaces/GroupInterface';
// import {AlbumManager} from '../../Managers/AlbumManager';
// import {ArtistManager} from '../../Managers/ArtistManager';
// import {PlaylistManager} from '../../Managers/PlaylistManager';
// import {Playlist} from '../Playlist/Playlist';


export class Group implements BasicData {
  constructor(private name: string, private artists: Artist[],
      private yearCreation: number, private genres: string[],
      private albums: Album[]) {
  }

  // GETTERS
  public getName(): string {
    return this.name;
  }
  public getArtists(): Artist[] {
    return this.artists;
  }
  public getYearCreation(): number {
    return this.yearCreation;
  }
  public getGenres(): string[] {
    return this.genres;
  }
  public getAlbums(): Album[] {
    return this.albums;
  }
  public getSongs(): Song[] {
    let listAcumulated: Song[] = [];
    return this.getAlbums().reduce((accList, album) => accList.concat(album.getSongs()), listAcumulated);
  }
  // SETTERS
  public setName(newName: string): void {
    this.name = newName;
  }
  public setYearCreation(newYear: number): void {
    this.yearCreation = newYear;
  }
  public setArtists(newArtists: Artist[]): void {
    this.artists = newArtists;
  }
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
  }

  // ADDS
  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  public addGenre(newGenre: string): void {
    this.genres.push(newGenre);
  }
  public addAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }
  // REMOVES
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }
  public removeGenre(genreDelete: string): void {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }
  public removeAlbum(albumDelete: Album): void {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  /*
  // suma de oyentes de las canciones de sus albunes
  public getNumberListenersMonthly(): number {
    let listeners:number = 0;
    this.getAlbums().forEach((album) => {
      album.getSongs().forEach((song) => {
        listeners += song.monthlyReproductions();
      });
    });
    return listeners;
  }

  public static deserialize(group: GroupInterface): Group {
    let managerArtist = ArtistManager.getArtistsManager();
    let managerAlbum = AlbumManager.getAlbumManager();
    let artists: Artist[] = group.artists.map((artistName) => {
      return managerArtist.searchByName(artistName.name);
    });
    let albums: Album[] = group.albums.map((albumName) => {
      return managerAlbum.searchByName(albumName.name);
    });
    return new Group(group.name, artists, group.yearCreation, group.genres, albums);
  } */
}
