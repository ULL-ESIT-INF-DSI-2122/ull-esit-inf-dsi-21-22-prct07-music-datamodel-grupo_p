import {Song} from './Song';
import {BasicData} from './BasicData';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {SongManager} from '../Managers/SongManager';
import {Genre} from './Genre';


/**
 * Clase para representar un álbum musical.
 */
export class Album extends BasicData {
  /**
   * Constructor de la clase `Álbum`
   * @param name Nombre
   * @param whoPublishes Autor
   * @param publicationYear Ano de publicación
   * @param genres Géneros
   * @param songs Canciones
   */
  constructor(name: string, private whoPublishes: string,
    private publicationYear: number, private genres: string[],
    private songs: Song[]) {
    super(name);
  }

  /**
   * Getter para la propiedad `whoPublishes`.
   * @returns Devuelve el valor de`whoPublishes`.
   */
  public getPublisher(): string {
    return this.whoPublishes;
  }
  /**
   * Getter para la propiedad `publicationYear`.
   * @returns Devuelve el valor de`publicationYear`.
   */
  public getYear(): number {
    return this.publicationYear;
  }
  /**
   * Getter para la propiedad `genres`.
   * @returns Devuelve el valor de`genres`.
   */
  public getGenres(): string[] {
    return this.genres;
  }
  /**
   * Getter para la propiedad `songs`.
   * @returns Devuelve el valor de`songs`.
   */
  public getSongs(): Song[] {
    return this.songs;
  }
  /**
   * Setter para la propiedad `whoPublishes`.
   * @param newPublisher Nuevo valor de `whoPublishes`.
   */
  public setPublisher(newPublisher: string): void {
    this.whoPublishes = newPublisher;
  }
  /**
   * Setter para la propiedad `publicationYear`.
   * @param year Nuevo valor de `publicationYear`.
   */
  public setYear(year: number): void {
    this.publicationYear = year;
  }
  /**
   * Setter para la propiedad `genres`.
   * @param newGenres Nuevo valor de `genres`.
   */
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  /**
   * Setter para la propiedad `songs`.
   * @param newSongs Nuevo valor de `songs`.
   */
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  /**
   * Agrega un género al álbum.
   * @param genre Género a agregar.
   */
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  /**
   * Agrega una canción al álbum.
   * @param newSong Canción a agregar.
   */
  public addSong(newSong: Song) {
    if (this.songs.find((song) => song === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }
  /**
   * Elimina un género del álbum.
   * @param genre Género a eliminar.
   */
  public removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  /**
   * Elimina una canción del álbum.
   * @param songDelete Canción a eliminar.
   */
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }
  /**
   * Deserializa un objeto `AlbumInterface`.
   * @param album Objeto `AlbumInterface`.
   * @returns Devuelve un nuevo objeto `Album`.
   */
  public static deserialize(album: AlbumInterface): Album {
    let songs: Song[] = [];
    album.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().searchByName(s.name) as Song),
    );
    return new Album(album.name, album.whoPublishes, album.publicationYear, album.genres, songs);
  }

  /**
   * Muestra la información del álbum.
   * @returns Devuelve una cadena con la información del álbum.
   */
  public showInfo(): string {
    const info: string = `ÁLBUM ${this.name}
    -Publicado por: ${this.whoPublishes}
    -Año de publicacion: ${this.publicationYear}
    -Genero: ${this.genres}
    -Canciones: 
      ${this.songs.map((song) => {
    return song.getName();
  }).join('\n      ')}`;
    console.log(info);
    return info;
  }

  /**
   * Devuelve los nombres de las canciones del álbum.
   * @returns Devuelve un array con los nombres de las canciones del álbum.
   */
  public getSongsNames(): string[] {
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }
}