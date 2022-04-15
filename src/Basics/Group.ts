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

/**
 * Clase para representar un grupo.
 */
export class Group extends BasicData {
  /**
   * Constructor de la clase Group.
   * @param name Nombre
   * @param artists Artistas
   * @param fundationYear Ano de lanzamiento
   * @param genres Géneros
   * @param albums Álbumess
   */
  constructor(name: string, private artists: Artist[],
      private fundationYear: number, private genres: string[],
      private albums: Album[]) {
    super(name);
  }
  /**
   * Getter para la propiedad `fundationYear`.
   * @returns Devuelve el valor de`fundationYear`.
   */
  public getFundationYear(): number {
    return this.fundationYear;
  }
  /**
   * Getter para la propiedad `artists`.
   * @returns Devuelve el valor de`artists`.
   */
  public getArtists(): Artist[] {
    return this.artists;
  }
  /**
   * Agrega un artista al grupo.
   * @param newArtist Artista a agregar.
   */
  public addArtist(newArtist: Artist): void {
    if (this.artists.find((artist) => artist === newArtist) === undefined) {
      this.artists.push(newArtist);
    }
  }
  /**
   * Elimina un artista del grupo.
   * @param artistDelete Artista a eliminar.
   */
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }
  /**
   * Getter para la obtener las canciones del grupo.
   * @returns Devuelve un array con las canciones del grupo.
   */
  public getSongs(): Song[] {
    let listAcumulated: Song[] = [];
    return this.getAlbums().reduce((accList, album) => accList.concat(album.getSongs()), listAcumulated);
  }
  /**
   * Getter para la propiedad `genres`.
   * @returns Devuelve el valor de`genres`.
   */
  public getGenres(): string[] {
    return this.genres;
  }
  /**
   * Elimina un género del grupo.
   * @param genre Género a eliminar.
   */
  public removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  /**
   * Agrega un género al grupo.
   * @param genre Género a agregar.
   */
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  /**
   * Getter para la propiedad `albums`.
   * @returns Devuelve el valor de`albums`.
   */
  public getAlbums(): Album[] {
    return this.albums;
  }
  /**
   * Agrega un álbum al grupo.
   * @param newAlbum Álbum a agregar.
   */
  public addAlbums(newAlbum: Album): void {
    if (this.albums.find((album) => album === newAlbum) === undefined) {
      this.albums.push(newAlbum);
    }
  }
  /**
   * Elimina un álbum del grupo.
   * @param albumDelete Álbum a eliminar.
   */
  public removeAlbum(albumDelete: Album): void {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  /**
   * Setter para la propiedad `fundationYear`.
   * @param newYear Nuevo valor de `fundationYear`.
   */
  public setYearCreation(newYear: number): void {
    this.fundationYear = newYear;
  }
  /**
   * Setter para la propiedad `artists`.
   * @param newArtists Nuevo valor de `artists`.
   */
  public setArtists(newArtists: Artist[]): void {
    this.artists = newArtists;
  }
  /**
   * Setter para la propiedad `genres`.
   * @param newGenres Nuevo valor de `genres`.
   */
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  /**
   * Setter para la propiedad `albums`.
   * @param newAlbums Nuevo valor de `albums`.
   */
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
  }
  /**
   * Deserializa un objeto `GroupInterface`.
   * @param group Objeto `GroupInterface`.
   * @returns Devuelve un nuevo objeto `Group`.
   */
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
  /**
   * Muestra la información del grupo.
   * @returns Devuelve una cadena con la información del grupo.
   */
  public showInfo(): string {
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
    return info;
  }
  /**
   * Muestra los singles del grupo.
   * @returns Devuelve una cadena con los singles del grupo.
   */
  public showSingles(): string {
    let songsGroup: Song[] = this.getSongs();
    let singles: Song[] = songsGroup.filter((song) => song.getIsSingle());
    const info = '  '+singles.map((song) => song.getName()).join('\n  ');
    console.log(info);
    return info;
  }
  /**
   * Muestra las canciones del grupo ordenadas por el número de reproducciones.
   * @returns Devuelve una cadena con las canciones del grupo ordenadas por el número de reproducciones.
   */
  public showByReproductions(ascending: boolean = true): string {
    let songsGroup: Song[] = this.getSongs();
    songsGroup = songsGroup.sort((songA, songB) => songA.getReproductions() - songB.getReproductions());
    songsGroup = ascending ? songsGroup : songsGroup.reverse();
    const info = '  '+songsGroup.map((song) => `${song.getName()} - ${song.getReproductions()}`).join('\n  ');
    console.log(info);
    return info;
  }
  /**
   * Muestra las playlists asociadas al grupo.
   * @returns Devuelve una cadena con las playlists asociadas al grupo.
   */
  public showPlayListAsociate(): string {
    const playLists: Playlist[] = [...PlaylistManager.getPlaylistManager().getCollection().values()];
    const playListsWithAuthor: Playlist[] = Array.from(playLists).filter((playList) => playList.getMusicians().includes(this.getName()));
    const asociatePlaylists: string[] = playListsWithAuthor.map((playlist) => playlist.getName());
    const info = '  '+asociatePlaylists.join('\n  ');
    console.log(info);
    return info;
  }
  /**
   * Muestra las canciones del grupo en orden alfabético.
   * @returns Devuelve una cadena con las canciones del grupo en orden alfabético.
   */
  showSongsOrder(ascending: boolean = true): string {
    let info:string;
    let nameList: string[] = this.getSongs().map((song) => song.getName());
    nameList = nameList.sort();
    if (ascending) {
      info = '  '+nameList.join('\n  ');
    } else {
      info = '  '+nameList.reverse().join('\n  ');
    }
    console.log(info);
    return info;
  }
  /**
   * Muestra los álbumes del grupo en orden alfabético.
   * @returns Devuelve una cadena con los álbumes del grupo en orden alfabético.
   */
  showAlbumOrder(ascending: boolean = true): string {
    let info: string;
    let nameList: string[] = this.getAlbums().map((album) => album.getName());
    nameList = nameList.sort();
    if (ascending) {
      info = '  '+nameList.join('\n  ');
    } else {
      info = '  '+nameList.reverse().join('\n  ');
    }
    console.log(info);
    return info;
  }
  /**
   * Muestra los álbumes del grupo ordenados por la fecha de lanzamiento.
   * @returns Devuelve una cadena con los álbumes del grupo ordenados por la fecha de lanzamiento.
   */
  showAlbumYearOrder(ascending: boolean = true): string {
    let info: string;
    let albums = this.getAlbums().sort((albumA, albumB) => albumA.getYear() - albumB.getYear());
    let albumNames: string[] = albums.map((album) => album.getName());
    if (ascending) {
      info = '  '+albumNames.join('\n  ');
    } else {
      info = '  '+albumNames.reverse().join('\n  ');
    }
    console.log(info);
    return info;
  }
}