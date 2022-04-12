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
      private fundationYear: number, private genres: string[],
      private albums: Album[]) {
    super(name);
  }
  // GETTERS
  public getArtists(): Artist[] {
    return this.artists;
  }
  public getFundationYear(): number {
    return this.fundationYear;
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
  public setFundationYear(newYear: number): void {
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
  // ADDS
  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  public addAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }

  // REMOVES
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  public removeAlbum(albumDelete: Album): void {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  //
  public static deserialize(group: GroupInterface): Group {
    let managerArtist = ArtistManager.getArtistManager();
    let managerAlbum = AlbumManager.getAlbumManager();
    let artists: Artist[] = group.artists.map((artistName) => managerArtist.searchByName(artistName.name));
    let albums: Album[] = group.albums.map((albumName) => managerAlbum.searchByName(albumName.name));
    return new Group(group.name, artists, group.fundationYear, group.genres, albums);
  }
  // MOSTRAR
  public showSingles(): void {
    let songsGroup: Song[] = this.getSongs();
    let singles: Song[] = songsGroup.filter((song) => song.getIsSingle());
    console.log('  '+singles.map((song) => song.getName()).join('\n  '));
  }

  public showByReproductions(ascending: boolean = true): void {
    let songsGroup: Song[] = this.getSongs();
    songsGroup = songsGroup.sort((songA, songB) => songA.getReproductions() - songB.getReproductions());
    songsGroup = ascending ? songsGroup : songsGroup.reverse();
    console.log('  '+songsGroup.map((song) => `${song.getName()} - ${song.getReproductions()}`).join('\n  '));
  }

  public showPlayListAsociate(): void {
    const playLists: Playlist[] = [...PlaylistManager.getPlaylistManager().getCollection().values()];
    const playListsWithAuthor: Playlist[] = Array.from(playLists).filter((playList) => playList.getMusicians().includes(this.getName()));
    const asociatePlaylists: string[] = playListsWithAuthor.map((playlist) => {
      return playlist.getName();
    });
    console.log('  '+asociatePlaylists.join('\n  '));
  }

  public showSongsOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getSongs().map((song) => song.getName());
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
    }
  }

  public showAlbumOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getAlbums().map((album) => album.getName());
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
    }
  }

  public showAlbumYearOrder(ascending: boolean = true): void {
    let albums = this.getAlbums().sort((albumA, albumB) => {
      return albumA.getYear() - albumB.getYear();
    });
    let albumNames: string[] = albums.map((album) => album.getName());
    if (ascending) {
      console.log('  '+albumNames.join('\n  '));
    } else {
      console.log('  '+albumNames.reverse().join('\n  '));
    }
  }

  public showInfo(): void {
    let info: string = `GRUPO ${this.getName()}
    -Nombre: ${this.getName()}
    -Artistas: ${this.getArtists().map((artist) => artist.getName())}
    -Año creacion: ${this.getFundationYear()}
    -Genero/s: ${this.getGenres()}
    -Albums: ${this.getAlbums().map((album) => album.getName())}).join('\n      ')}`;
    console.log(info);
  }
}