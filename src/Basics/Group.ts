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
  // private listeners: number;
  constructor(name: string, private artists: Artist[],
      private fundationYear: number, private genres: string[],
      private albums: Album[]) {
    super(name);/*
    this.listeners = 0;
    this.albums.forEach((album) => {
      album.getSongs().forEach((song) => {
        this.listeners += song.getReproductions();
      });
    });*/
  }
  getFundationYear(): number {
    return this.fundationYear;
  }
  /*
  getListeners(): number {
    return this.listeners;
  }*/
  public getArtists(): Artist[] {
    return this.artists;
  }
  public addArtist(newArtist: Artist): void {
    if (this.artists.find((artist) => artist === newArtist) === undefined) {
      this.artists.push(newArtist);
    }
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
  public removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);
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
    if (this.albums.find((album) => album === newAlbum) === undefined) {
      this.albums.push(newAlbum);
    }
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
  /*
  recalculateListeners(): void {
    this.listeners = 0;
    this.albums.forEach((album) => {
      album.getSongs().forEach((song) => {
        this.listeners += song.getReproductions();
      });
    });
  }*/

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

  showSongsOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getSongs().map((song) => {
      return song.getName();
    });
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
    }
  }

  showAlbumOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getAlbums().map((album) => {
      return album.getName();
    });
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
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
      console.log('  '+albumNames.join('\n  '));
    } else {
      console.log('  '+albumNames.reverse().join('\n  '));
    }
  }

  public showInfo(): void {
    let info: string = `GRUPO ${this.getName()}
    -Nombre: ${this.getName()}
    -Artistas: ${this.getArtists().map((artist) => {
    return artist.getName();
  })}
    -Año creacion: ${this.getFundationYear()}
    -Genero/s: ${this.getGenres()}
    -Albums:
      ${this.getAlbums().map((album) => {
    return album.getName();
  }).join('\n      ')}`;
    console.log(info);
  }
}