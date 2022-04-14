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
 * Clase que representa a un grupo
 * @param name nombre del grupo
 * @param artist artistas que coanforman el grupo
 * @param fundationYear año de incio dle grupo
 * @param genres géneros a los que pertenece el grupo
 * @param albums álbumes que tiene el grupo
 */
export class Group extends BasicData {
  constructor(name: string, private artists: Artist[],
      private fundationYear: number, private genres: string[],
      private albums: Album[]) {
    super(name);
  }
  /**
   * Getter para 'fundationYear'
   * @returns año de creación del grupo
   */
  getFundationYear(): number {
    return this.fundationYear;
  }
  /**
   * Getter para 'artists'
   * @returns los artitas del grupo
   */
  public getArtists(): Artist[] {
    return this.artists;
  }
  /**
   * Agrega un artista al grupo
   * @param newArtist nuevo artista que será añadido al grupo
   */
  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  /**
   * Elimina a un artista del grupo
   * @param artistDelete artista a eliminar
   */
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }
  /**
   * Getter para 'songs'
   * @returns las canciones que tiene el grupo
   */
  public getSongs(): Song[] {
    let listAcumulated: Song[] = [];
    return this.getAlbums().reduce((accList, album) => accList.concat(album.getSongs()), listAcumulated);
  }
  /**
   * Getter para 'genres'
   * @returns los géneros del grupo
   */
  public getGenres(): string[] {
    return this.genres;
  }
  /**
   * Elimina un género del grupo
   * @param genre género a eliminar del grupo
   */
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  /**
   * Agrega un género al grupo
   * @param genre género a agregar
   */
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  /**
   * Getter para 'albums'
   * @returns devuelve los álbumes
   */
  public getAlbums(): Album[] {
    return this.albums;
  }
  /**
   * Agrega un álbum al grupo
   * @param newAlbum nuevo álbum
   */
  public addAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }
  /**
   * Elimina un álbum del grupo
   * @param albumDelete álbum a eliminar
   */
  public removeAlbum(albumDelete: Album): void {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  /**
   * Setter para 'name'
   * @param newName nuevo nombre
   */
  public setName(newName: string): void {
    this.name = newName;
  }
  /**
   * Setter para 'yearCreation'
   * @param newYear nuevo año
   */
  public setYearCreation(newYear: number): void {
    this.fundationYear = newYear;
  }
  /**
   * Setter para 'artists'
   * @param newArtists nuevos asrtistas
   */
  public setArtists(newArtists: Artist[]): void {
    this.artists = newArtists;
  }
  /**
   * Setter para 'genres'
   * @param newGenres nuevos géneros
   */
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  /**
   * Setter para 'albums'
   * @param newAlbums nuevos álbumes
   */
  public setAlbums(newAlbums: Album[]): void {
    this.albums = newAlbums;
  }
  /**
   * Método que deserealiza un objeto
   * @param group objeto de tipo 'GroupInterface'
   * @returns Devuelve un nuevo Group
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
   * Muestra la canciones que fueron lanzadas como single
   */
  public showSingles(): void {
    let songsGroup: Song[] = this.getSongs();
    let singles: Song[] = songsGroup.filter((song) => song.getIsSingle());
    console.log('  '+singles.map((song) => song.getName()).join('\n  '));
  }
  /**
   * Ordena por número de reproducciones
   * @param ascending orden ascendiente si es true
   */
  public showByReproductions(ascending: boolean = true): void {
    let songsGroup: Song[] = this.getSongs();
    songsGroup = songsGroup.sort((songA, songB) => songA.getReproductions() - songB.getReproductions());
    songsGroup = ascending ? songsGroup : songsGroup.reverse();
    console.log('  '+songsGroup.map((song) => `${song.getName()} - ${song.getReproductions()}`).join('\n  '));
  }
  /**
   * Muestra las playlist asociadas al grupo.
   */
  public showPlayListAsociate(): void {
    const playLists: Playlist[] = [...PlaylistManager.getPlaylistManager().getCollection().values()];
    const playListsWithAuthor: Playlist[] = Array.from(playLists).filter((playList) => playList.getMusicians().includes(this.getName()));
    const asociatePlaylists: string[] = playListsWithAuthor.map((playlist) => {
      return playlist.getName();
    });
    console.log('  '+asociatePlaylists.join('\n  '));
  }
  /**
   * Ordena las canciones
   * @param ascending true para ordenar de forma ascendente
   */
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
   * Ordena los álbumes por año
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
   * Muestra la información del grupo
   */
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