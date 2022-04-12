import {Album} from './Album';
import {Song} from './Song';
import {BasicData} from './BasicData';
import {ArtistInterface} from '../Interfaces/ArtistInterface';
import {SongManager} from '../Managers/SongManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {Genre} from './Genre';
import {PlaylistManager} from '../Managers/PlaylistManager';
import {Playlist} from './Playlist';

export class Artist extends BasicData {
  constructor(name: string, private groups: string[],
      private genres: string[], private albums: Album[], private songs: Song[]) {
    super(name);
  }

  public static deserialize(artist: ArtistInterface): Artist {
    let albums: Album[] = [];
    let songs: Song[] = [];
    artist.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().searchByName(s.name)),
    );
    artist.albums.forEach((a) =>
      albums.push(AlbumManager.getAlbumManager().searchByName(a.name)),
    );
    return new Artist(artist.name, artist.groups, artist.genres, albums, songs);
  }

  // GETTERS
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
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
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
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  public removeAlbum(albumDelete: Album) {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }

  public showInfo(): void {
    let info: string = `ARTISTA ${this.getName()}
    -Nombre: ${this.getName()}
    -Grupos: ${this.getGroups()}
    -Genero/s: ${this.getGenres()}
    -Albums:
      ${this.getAlbums().map((album) => {
    return album.getName();
  }).join('\n      ')}
    -Canciones:
      ${this.getSongs().map((song) => {
    return song.getName();
  }).join('\n      ')}`;
    console.log(info);
  }

  showSongsOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getSongs().map((song) => song.getName());
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

  showSingles(): void {
    let songs: Song[] = this.getSongs().filter((song) => song.getIsSingle());
    let single: string[] = songs.map((song) => {
      return song.getName();
    });
    console.log('  '+single.join('\n  '));
  }

  showByReproductions(ascending: boolean = true): void {
    let songs = this.getSongs().sort((songA, songB) => {
      return songA.getReproductions() - songB.getReproductions();
    });
    let songsNames: string[] = songs.map((song) => {
      return song.getName();
    });
    if (ascending) {
      console.log('  '+songsNames.join('\n  '));
    } else {
      console.log('  '+songsNames.reverse().join('\n  '));
    }
  }

  showPlayListAsociate(): void {
    const playLists: Playlist[] = Array.from(PlaylistManager.getPlaylistManager().getCollection());
    const playListsWithAuthor: Playlist[] = playLists.filter((playList) => playList.getMusicians().includes(this.getName()));
    const asociatePlaylists: string[] = playListsWithAuthor.map((playlist) => {
      return playlist.getName();
    });
    console.log('  '+asociatePlaylists.join('\n  '));
  }
}
