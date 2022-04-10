import {Album} from './Album';
import {Song} from './Song';
import {BasicData} from '../Interfaces/BasicData';
import {ArtistInterface} from '../Interfaces/ArtistInterface';
import {SongsManager} from '../Managers/SongManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {PlaylistManager} from '../Managers/PlaylistManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {Playlist} from './Playlist';
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

  public getName(): string {
    return this.name;
  }
  public setName(newName: string): void {
    this.name = newName;
  }
  public getGroups(): string[] {
    return this.groups;
  }
  public setGroups(newGroups: string[]): void {
    this.groups = newGroups;
  }
  public addGroup(newGroup: string) {
    this.groups.push(newGroup);
  }
  public removeGroup(groupDelete: string) {
    this.groups = this.groups.filter((elemento) => elemento !== groupDelete);
  }

  public getGenres(): string[] {
    return this.genres;
  }
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  /*
  public addGenre(newGenre: string) {
    this.genres.push(newGenre);
  }
  public removeGenre(genreDelete: string) {
    this.genres = this.genres.filter((elemento) => elemento !== genreDelete);
  }
  */
  public getAlbums(): Album[] {
    return this.albums;
  }
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
  }
  public addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }
  public removeAlbum(albumDelete: Album) {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }

  public getSongs(): Song[] {
    return this.songs;
  }
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  public addSong(newSong: Song) {
    this.songs.push(newSong);
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
  }*/
  public showInfo(): void {
    let info: string = `ARTISTA ${this.name}
    Nombre: ${this.getName()}
    Grupos: ${this.getGroups()}
    Genero/s: ${this.getGenres()}
    Albums: ${this.getAlbums().map((album) => {
    return album.getName();
  })}
    Canciones: ${this.getSongs().map((song) => {
    return song.getName();
  })}`;
    console.log(info);
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

  showSingles(): void {
    let songs: Song[] = this.getSongs().filter((song) => song.isSingle());
    let single: string[] = songs.map((song) => {
      return song.getName();
    });
    console.log(single);
  }

  showByReproductions(ascending: boolean = true): void {
    let songs = this.getSongs().sort((songA, songB) => {
      return songA.getReproduction() - songB.getReproduction();
    });
    let songsNames: string[] = songs.map((song) => {
      return song.getName();
    });
    if (ascending) {
      console.log(songsNames);
    } else {
      console.log(songsNames.reverse());
    }
  }

  showPlayListAsociate(): void {
    const playLists: Playlist[] = Array.from(PlaylistManager.getPlaylistManager().getCollection());
    const playListsWithAuthor = playLists.filter((playList) => playList.getMusicians().includes(this.getName()));
    console.log(playListsWithAuthor);
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
}

