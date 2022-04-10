import {BasicData} from './BasicData';
import {GroupInterface} from '../Interfaces/GroupInterface';
import {AlbumManager} from '../Managers/AlbumManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {Album} from './Album';
import {Artist} from './Artist';
import {Genre} from './Genre';
import {Song} from './Song';
import {PlaylistManager} from '../Managers/PlaylistManager';
import {Playlist} from './Playlist';

export class Group extends BasicData {
  constructor(name: string, private artists: Artist[],
      readonly fundationYear: number, private genres: string[],
      private albums: Album[]) {
    super(name);
  }
  getFundationYear(): number {
    return this.fundationYear;
  }
  public getArtists(): Artist[] {
    return this.artists;
  }
  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }
  public getSongs(): Song[] {
    let listAcumulated: Song[] = [];
    return this.getAlbums().reduce((accList, album) => accList.concat(album.getSongs()), listAcumulated);
  }
  public getGenres(): string[] {
    return this.genres;
  }
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }

  public getAlbums(): Album[] {
    return this.albums;
  }
  public addAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }
  public removeAlbum(albumDelete: Album): void {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  // SETTERS
  public setName(newName: string): void {
    this.name = newName;
  }
  public setYearCreation(newYear: number): void {
    this.fundationYear = newYear;
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
  public static deserialize(group: GroupInterface): Group {
    let artists: Artist[] = [];
    let albums: Album[] = [];
    group.artists.forEach((a) =>
      artists.push(ArtistManager.getArtistManager().searchByName(a.name)),
    );
    group.albums.forEach((a) =>
      albums.push(AlbumManager.getAlbumManager().searchByName(a.name)),
    );
    return new Group(group.name, artists, group.fundationYear, group.genres, albums);
  }
  public showSingles(): void {
    let songsGroup: Song[] = this.getSongs();
    let singles: Song[] = songsGroup.filter((song) => song.getIsSingle());
    console.log(singles.map((song) => song.getName()));
  }

  public showByReproductions(ascending: boolean = true): void {
    let songsGroup: Song[] = this.getSongs();
    songsGroup = songsGroup.sort((songA, songB) => songA.getReproductions() - songB.getReproductions());
    songsGroup = ascending ? songsGroup : songsGroup.reverse();
    console.log(songsGroup.map((song) => `${song.getName()} - ${song.getReproductions()}`));
  }

  public showPlayListAsociate(): void {
    const playLists: Playlist[] = Array.from(PlaylistManager.getPlaylistManager().getCollection());
    const playListsWithAuthor = playLists.filter((playList) => playList.getMusicians().includes(this.getName()));
    console.log(playListsWithAuthor);
  }

  showSongsOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getSongs().map((song) => {
      return song.getName();
    });
    nameList = nameList.sort();
    if (ascending) {
      console.log(nameList);
    } else {
      console.log(nameList.reverse());
    }
  }

  showAlbumOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getAlbums().map((album) => {
      return album.getName();
    });
    nameList = nameList.sort();
    if (ascending) {
      console.log(nameList);
    } else {
      console.log(nameList.reverse());
    }
  }

  showAlbumYearOrder(ascending: boolean = true): void {
    let albums = this.getAlbums().sort((albumA, albumB) => {
      return albumA.getYear() - albumB.getYear();
    });
    let albumNames: string[] = albums.map((album) => {
      return album.getName();
    });
    if (ascending) {
      console.log(albumNames);
    } else {
      console.log(albumNames.reverse());
    }
  }

  public showInfo(): void {
    let info: string = `GRUPO ${this.getName()}
    Nombre: ${this.getName()}
    Artistas: ${this.getArtists()}
    Genero/s: ${this.getGenres()}
    Albums: ${this.getAlbums()}
    Año creacion: ${this.getFundationYear()})}`;
    console.log(info);
  }
}