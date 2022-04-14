import {Album} from './Album';
import {Song} from './Song';
import {BasicData} from './BasicData';
import {ArtistInterface} from '../Interfaces/ArtistInterface';
import {SongManager} from '../Managers/SongManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {Genre} from './Genre';
import {PlaylistManager} from '../Managers/PlaylistManager';
import {Playlist} from './Playlist';
/**
 * Clase que representa a un artista
 * @param name nombre del artista
 * @param groups grupos a los que pertenece el artista
 * @param genres generos que tiene el artista
 * @param albums albumes que tiene el artista
 * @param songs canciones que tiene el artista
 */
export class Artist extends BasicData {
  constructor(name: string, private groups: string[],
      private genres: string[], private albums: Album[], private songs: Song[]) {
    super(name);
  }
  /**
   * Método que deserealiza un objeto.
   * @param artist objeto de tipo 'ArtistInterface'
   * @returns Devuelve un nuevo Artista
   */
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

  /**
   * getter de grupos
   * @returns un string de grupos
   */
  public getGroups(): string[] {
    return this.groups;
  }
  /**
   * getter de genres
   * @returns devuelve los generos que tiene el artista
   */
  public getGenres(): string[] {
    return this.genres;
  }
  /**
   * getter de albums
   * @returns los albumes que tiene el artista
   */
  public getAlbums(): Album[] {
    return this.albums;
  }
  /**
   * getter de songs
   * @returns las canciones que tiene el artista
   */
  public getSongs(): Song[] {
    return this.songs;
  }
  /**
   * setter para nombre
   * @param newName nuevo nombre para el artista
   */
  public setName(newName: string): void {
    this.name = newName;
  }
  /**
   * Setter para 'groups'
   * @param newGroups nuevos grupos
   */
  public setGroups(newGroups: string[]): void {
    this.groups = newGroups;
  }
  /**
   * Setter para genrres
   * @param newGenres nuevos géneros
   */
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  /**
   * Setter para álbum
   * @param newAlbums nuevos álbumes
   */
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
  }
  /**
  *Setter para songs
  * @param newSongs nuevas canciones
  */
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  /**
   * Agrega un grupo al artista
   * @param newGroup nuevo grupo
   */
  public addGroup(newGroup: string) {
    this.groups.push(newGroup);
  }
  /**
   * Agrega un género al artista
   * @param genre nuevo género
   */
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  /**
   * Agrega un canción al artista
   * @param newSong nueva canción
   */
  public addSong(newSong: Song) {
    this.songs.push(newSong);
  }
  /**
   * Agrega un álbum al artista
   * @param newAlbum nuevo álbum
   */
  public addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }
  /**
   * Elimina el grupo del artista
   * @param groupDelete grupo a eliminar
   */
  public removeGroup(groupDelete: string) {
    this.groups = this.groups.filter((elemento) => elemento !== groupDelete);
  }
  /**
   * Elimina el género que tiene el artista
   * @param genre género a eliminar
   */
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  /**
   * Elimina el álbum que tiene el artista
   * @param albumDelete album que será eliminado
   */
  public removeAlbum(albumDelete: Album) {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  /**
   * Elimina la canción del artista
   * @param songDelete canción que será eliminada
   */
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }
  /**
   * Muestra la info del artista
   */
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
  /**
   * Ordena las canciones
   * @param ascending true para ordenar de forma ascendente
   */
  showSongsOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getSongs().map((song) => song.getName());
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
    }
  }
  /**
   * Ordena los albumes
   * @param ascending true si es de forma ascendente
   */
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
  /**
   * Ordena los albumes por año
   * @param ascending true si es de forma ascedente
   */
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
  /**
   * Muestra la canciones que fueron lanzadas como single
   */
  showSingles(): void {
    let songs: Song[] = this.getSongs().filter((song) => song.getIsSingle());
    let single: string[] = songs.map((song) => {
      return song.getName();
    });
    console.log('  '+single.join('\n  '));
  }
  /**
   * Ordena por número de reproducciones
   * @param ascending true si es de forma ascendente
   */
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
  /**
   * Muestra las playlist asociadas al artista.
   */
  showPlayListAsociate(): void {
    const playLists: Playlist[] = Array.from(PlaylistManager.getPlaylistManager().getCollection());
    const playListsWithAuthor: Playlist[] = playLists.filter((playList) => playList.getMusicians().includes(this.getName()));
    const asociatePlaylists: string[] = playListsWithAuthor.map((playlist) => {
      return playlist.getName();
    });
    console.log('  '+asociatePlaylists.join('\n  '));
  }
}