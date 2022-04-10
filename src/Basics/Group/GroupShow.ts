import {Playlist} from '../Playlist/Playlist';
import {Group} from '../Group/Group';
import {Song} from '../Song/Song';
import {PlaylistManager} from '../../Managers/PlaylistManager';
import {ShowData} from '../../Interfaces/BasicData';

export class GroupShow implements ShowData {
  constructor(private group: Group) {
  }

  public showSingles(): void {
    let songsGroup: Song[] = this.group.getSongs();
    let singles: Song[] = songsGroup.filter((song) => song.isSingle());
    console.log(singles.map((song) => song.getName()));
  }

  public showByReproductions(ascending: boolean = true): void {
    let songsGroup: Song[] = this.group.getSongs();
    songsGroup = songsGroup.sort((songA, songB) => songA.getReproductions() - songB.getReproductions());
    songsGroup = ascending ? songsGroup : songsGroup.reverse();
    console.log(songsGroup.map((song) => `${song.getName()} - ${song.getReproductions()}`));
  }

  public showPlayListAsociate(): void {
    const playLists: Playlist[] = Array.from(PlaylistManager.getPlaylistManager().getCollection());
    const playListsWithAuthor = playLists.filter((playList) => playList.getMusicians().includes(this.group.getName()));
    console.log(playListsWithAuthor);
  }

  showSongsOrder(ascending: boolean = true): void {
    let nameList: string[] = this.group.getSongs().map((song) => {
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
    let nameList: string[] = this.group.getAlbums().map((album) => {
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
    let albums = this.group.getAlbums().sort((albumA, albumB) => {
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
    let info: string = `GRUPO ${this.group.getName()}
    Nombre: ${this.group.getName()}
    Artistas: ${this.group.getArtists()}
    Genero/s: ${this.group.getGenres()}
    Albums: ${this.group.getAlbums()}
    Año creacion: ${this.group.getYearCreation()})}`;
    console.log(info);
  }
}
