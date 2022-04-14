import {Song} from './Song';
import {BasicData} from './BasicData';
import {AlbumInterface} from '../Interfaces/AlbumInterface';
import {SongManager} from '../Managers/SongManager';
import {Genre} from './Genre';

/**
 * Clase que representa un Albúm
 * Extiende de la interfaz de datos basicos(get y set de nombre).
 * Las caracteristicas principales que tiene el album son:
 * @param name del abum
 * @param publisher quien publica el album
 * @param publicationYear año de publicación
 * @param genres géneros a los que pertenece
 * @param songs canciones que contiene
 */
export class Album extends BasicData {
  constructor(name: string, private publisher: string,
    private publicationYear: number, private genres: string[],
    private songs: Song[]) {
    super(name);
  }

  /**
   * Método getter para 'publisher'
   * @returns un string de quien publica el álbum
   */
  public getPublisher(): string {
    return this.publisher;
  }
  /**
   * Método getter para 'year'
   * @returns el año que fué publicado
   */
  public getYear(): number {
    return this.publicationYear;
  }
  /**
   * Método getter para 'genres'
   * @returns un array con los géneros a lo que pertenece
   */
  public getGenres(): string[] {
    return this.genres;
  }
  /**
   * Método getter para 'songs'
   * @returns las canciones que tiene el álbum
   */
  public getSongs(): Song[] {
    return this.songs;
  }
  /**
   * Método setter para 'publisher'
   * @param newPublisher nuevo artista o grupo que publica el álbum
   */
  public setPublisher(newPublisher: string): void {
    this.publisher = newPublisher;
  }
  /**
   * Método setter para 'year'
   * @param year año que fué publicado
   */
  public setYear(year: number): void {
    this.publicationYear = year;
  }
  /**
   * Método setter para 'genres'
   * @param newGenres para los nuevos géneros a los que pertenece el álbum
   */
  public setGenres(newGenres: string[]): void {
    this.genres = newGenres;
  }
  /**
  * Método setter para 'songs'
  * @param newSongs de tipo Song
  */
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  /**
   * Método que agrega un nuevo género al álbum
   * @param genre de tipo Genre
   */
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  /**
   * Agrega una nueva canción
   * @param newSong canción que será agregada al álbum
   */
  public addSong(newSong: Song) {
    this.songs.push(newSong);
  }
  /**
   * Elimina un género del ábum
   * @param genre de tipo Genre
   */
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  /**
   * Elimina la canción del álbum
   * @param songDelete canción que será eliminada del álbum
   */
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }
  /**
   * Método que deserealiza un objeto, en este caso es song.
   * @param album objeto de tipo 'AlbumInterface'
   * @returns Devuelve un nuevo álbum
   */
  public static deserialize(album: AlbumInterface): Album {
    let songs: Song[] = [];
    album.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().searchByName(s.name) as Song),
    );
    return new Album(album.name, album.whoPublishes, album.publicationYear, album.genres, songs);
  }
  /**
   * Devuelve la información del álbum
   * @returns un string con la información del álbum
   */
  public showInfo(): string {
    const info: string = `ÁLBUM ${this.name}
    -Publicado por: ${this.publisher}
    -Año de publicacion: ${this.publicationYear}
    -Genero: ${this.genres}
    -Canciones: 
      ${this.songs.map((song) => {
    return song.getName();
  }).join('\n      ')}`;
    console.log(info);
    return info;
  }
}