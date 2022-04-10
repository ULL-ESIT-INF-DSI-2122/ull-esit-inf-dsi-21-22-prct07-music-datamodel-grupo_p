import {Artist} from './Artist';
import {Song} from '../Song/Song';
import {PlaylistManager} from '../../Managers/PlaylistManager';
import {Playlist} from '../Playlist/Playlist';
import {ShowData} from '../../Interfaces/BasicData';

export class ArtistShow implements ShowData {
  constructor(private artist: Artist) {
  }

  public showInfo(): void {
    let info: string = `ARTISTA ${this.artist.getName()}
    Nombre: ${this.artist.getName()}
    Grupos: ${this.artist.getGroups()}
    Genero/s: ${this.artist.getGenres()}
    Albums: ${this.artist.getAlbums().map((album) => {
    return album.getName();
  })}
    Canciones: ${this.artist.getSongs().map((song) => {
    return song.getName();
  })}`;
    console.log(info);
  }

  showSongsOrder(ascending: boolean = true): void {
    let nameList: string[] = this.artist.getSongs().map((song) => {
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
    let nameList: string[] = this.artist.getAlbums().map((album) => {
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
    let albums = this.artist.getAlbums().sort((albumA, albumB) => {
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
    let songs: Song[] = this.artist.getSongs().filter((song) => song.isSingle());
    let single: string[] = songs.map((song) => {
      return song.getName();
    });
    console.log(single);
  }

  showByReproductions(ascending: boolean = true): void {
    let songs = this.artist.getSongs().sort((songA, songB) => {
      return songA.getReproductions() - songB.getReproductions();
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
    const playListsWithAuthor = playLists.filter((playList) => playList.getMusicians().includes(this.artist.getName()));
    console.log(playListsWithAuthor);
  }
}