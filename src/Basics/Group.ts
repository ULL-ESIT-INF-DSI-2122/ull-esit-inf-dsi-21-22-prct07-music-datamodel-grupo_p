import {Album} from './Album';
import {BasicData} from '../Interfaces/BasicData';
import {GroupInterface} from '../Interfaces/GroupInterface';
import {Artist} from './Artist';
import {Song} from './Song';
import {AlbumManager} from '../Managers/AlbumManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {PlaylistManager} from '../Managers/PlaylistManager';
import {Playlist} from './Playlist';


export class Group implements BasicData {
  constructor(private name: string, private artists: Artist[],
      private yearCreation: number, private genres: string[],
      private albums: Album[]) {
  }

  public getName(): string {
    return this.name;
  }
  public setName(newName: string): void {
    this.name = newName;
  }
  public getArtists(): Artist[] {
    return this.artists;
  }
  public setArtists(newArtists: Artist[]): void {
    this.artists = newArtists;
  }
  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }
  public getYearCreation(): number {
    return this.yearCreation;
  }
  public setYearCreation(newYear: number): void {
    this.yearCreation = newYear;
  }
  public getGenres(): string[] {
    return this.genres;
  }
  public addGenre(newGenre: string): void {
    this.genres.push(newGenre);
  }
  public removeGenre(genreDelete: string): void {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }

  public getAlbums(): Album[] {
    return this.albums;
  }
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
  }
  public addAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum);
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
  */

  showSongsOrder(ascending: boolean = true): void {
    let songsGroup: Song[] = this.getSongs();
    songsGroup = ascending ? songsGroup.sort() : songsGroup.sort().reverse();
    console.log(songsGroup.map((song) => `${song.getName()} - ${song.getName()}`));
  }

  showAlbumOrder(ascending: boolean = true): void {
    let albums: Album[] = this.getAlbums();
    albums = ascending ? albums.sort() : albums.sort().reverse();
    console.log(albums.map((album) => album.getName()));
  }

  showAlbumYearOrder(ascending: boolean = true): void {
    let albums = this.getAlbums().sort((albumA, albumB) => albumA.getYear() - albumB.getYear());
    albums = ascending ? albums : albums.reverse();
    console.log(albums.map((album) => `${album.getName()} - ${album.getYear()}`));
  }

  getSongs(): Song[] {
    let listAcumulated: Song[] = [];
    return this.getAlbums().reduce((accList, album) => accList.concat(album.getSongs()), listAcumulated);
  }

  showSingles(): void {
    let songsGroup: Song[] = this.getSongs();
    let singles: Song[] = songsGroup.filter((song) => song.isSingle());
    console.log(singles.map((song) => song.getName()));
  }

  showByReproductions(ascending: boolean = true): void {
    let songsGroup: Song[] = this.getSongs();
    songsGroup = songsGroup.sort((songA, songB) => songA.getReproduction() - songB.getReproduction());
    songsGroup = ascending ? songsGroup : songsGroup.reverse();
    console.log(songsGroup.map((song) => `${song.getName()} - ${song.getReproduction()}`));
  }

  showPlayListAsociate(): void {
    const playLists: Playlist[] = Array.from(PlaylistManager.getPlaylistManager().getCollection());
    const playListsWithAuthor = playLists.filter((playList) => playList.getMusicians().includes(this.getName()));
    console.log(playListsWithAuthor);
  }

  public showInfo(): string {
    let info: string = `GRUPO ${this.name}
    Nombre: ${this.getName()}
    Artistas: ${this.getArtists()}
    Genero/s: ${this.getGenres()}
    Albums: ${this.getAlbums()}
    Año creacion: ${this.getYearCreation()})}`;
    // console.log(info);
    return info;
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
  }
}
