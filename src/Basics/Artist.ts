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
 * Clase para representar un género musical.
 */
export class Artist extends BasicData {
  /**
   * Constructor de la clase `Artist`.
   * @param name Nombre
   * @param groups Grupos
   * @param genres Géneros
   * @param albums Álbumes
   * @param songs Canciones
   */
  constructor(name: string, private groups: string[],
      private genres: string[], private albums: Album[], private songs: Song[]) {
    super(name);
  }

  /**
   * Getter para la propiedad `groups`.
   * @returns Devuelve el valor de`groups`.
   */
  public getGroups(): string[] {
    return this.groups;
  }
  /**
   * Getter para la propiedad `genres`.
   * @returns Devuelve el valor de`genres`.
   */
  public getGenres(): string[] {
    return this.genres;
  }
  /**
   * Getter para la propiedad `albums`.
   * @returns Devuelve el valor de`albums`.
   */
  public getAlbums(): Album[] {
    return this.albums;
  }
  /**
   * Getter para la propiedad `songs`.
   * @returns Devuelve el valor de`songs`.
   */
  public getSongs(): Song[] {
    return this.songs;
  }
  /**
   * Setter para la propiedad `groups`.
   * @param newGroups Nuevo valor de `groups`.
   */
  public setGroups(newGroups: string[]): void {
    this.groups = newGroups;
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
   * Setter para la propiedad `songs`.
   * @param newSongs Nuevo valor de `songs`.
   */
  public setSongs(newSongs: Song[]): void {
    this.songs = newSongs;
  }
  /**
   * Agrega un grupo al artista.
   * @param newGroup Grupo a agregar.
   */
  public addGroup(newGroup: string) {
    const noGroups: string = '-';
    if (this.groups.find((group) => group === noGroups) !== undefined) {
      this.groups.pop();
      this.groups.push(newGroup);
    } else if (this.groups.find((group) => group === newGroup) === undefined) {
      this.groups.push(newGroup);
    }
  }
  /**
   * Agrega un género al artista.
   * @param genre Género a agregar.
   */
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }
  /**
   * Agrega una canción al artista.
   * @param newSong Canción a agregar.
   */
  public addSong(newSong: Song) {
    if (this.songs.find((song) => song === newSong) === undefined) {
      this.songs.push(newSong);
    }
  }
  /**
   * Agrega un álbum al artista.
   * @param newAlbum Álbum a agregar.
   */
  public addAlbum(newAlbum: Album) {
    if (this.albums.find((album) => album === newAlbum) === undefined) {
      this.albums.push(newAlbum);
    }
  }
  /**
   * Elimina un grupo del artista.
   * @param groupDelete Grupo a eliminar.
   */
  public removeGroup(groupDelete: string) {
    const index = this.groups.indexOf(groupDelete);
    if (index !== -1) {
      this.groups.splice(index, 1);
      if (this.getGroups().length === 0) {
        this.setGroups(['-']);
      }
    }
  }
  /**
   * Elimina un género del artista.
   * @param genre Género a eliminar.
   */
  public removeGenre(genre: string): void {
    const index = this.genres.indexOf(genre);
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  /**
   * Elimina un álbum del artista.
   * @param albumDelete Álbum a eliminar.
   */
  public removeAlbum(albumDelete: Album) {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }
  /**
   * Elimina una canción del artista.
   * @param songDelete Canción a eliminar.
   */
  public removeSong(songDelete: Song) {
    this.songs = this.songs.filter((elemento) => elemento !== songDelete);
  }

  /**
   * Deserializa un objeto `ArtistInterface`.
   * @param artist Objeto `ArtistInterface`.
   * @returns Devuelve un nuevo objeto `Artist`.
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
   * Muestra la información del artista.
   * @returns Devuelve una cadena con la información del artista.
   */
  public showInfo(): string {
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
    return info;
  }

  /**
   * Muestra las canciones del artista en orden alfabético.
   * @returns Devuelve una cadena con las canciones del artista en orden alfabético.
   */
  public showSongsOrder(ascending: boolean = true): string {
    let nameList: string[] = this.getSongs().map((song) => song.getName());
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
    }
    return nameList.join('\n  ');
  }

  /**
   * Muestra los álbumes del artista en orden alfabético.
   * @returns Devuelve una cadena con los álbumes del artista en orden alfabético.
   */
  public showAlbumOrder(ascending: boolean = true): string {
    let nameList: string[] = this.getAlbums().map((album) => {
      return album.getName();
    });
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
    }
    return nameList.join('\n  ');
  }
  /**
   * Muestra los álbumes del artista ordenados por la fecha de lanzamiento.
   * @returns Devuelve una cadena con los álbumes del artista ordenados por la fecha de lanzamiento.
   */
  public showAlbumYearOrder(ascending: boolean = true): string {
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
    return albumNames.join('\n  ');
  }
  /**
   * Muestra los singles del artista.
   * @returns Devuelve una cadena con los singles del artista.
   */
  public showSingles(): string {
    let songs: Song[] = this.getSongs().filter((song) => song.getIsSingle());
    let single: string[] = songs.map((song) => {
      return song.getName();
    });
    console.log('  '+single.join('\n  '));
    return single.join('\n  ');
  }

  /**
   * Muestra las canciones del artista ordenadas por el número de reproducciones.
   * @returns Devuelve una cadena con las canciones del artista ordenadas por el número de reproducciones.
   */
  public showByReproductions(ascending: boolean = true): string {
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
    return songsNames.join('\n  ');
  }

  /**
   * Muestra las playlists asociadas al artista.
   * @returns Devuelve una cadena con las playlists asociadas al artista.
   */
  public showPlayListAsociate(): string {
    const playLists: Playlist[] = Array.from(PlaylistManager.getPlaylistManager().getCollection());
    const playListsWithAuthor: Playlist[] = playLists.filter((playList) => playList.getMusicians().includes(this.getName()));
    const asociatePlaylists: string[] = playListsWithAuthor.map((playlist) => {
      return playlist.getName();
    });
    console.log('  '+asociatePlaylists.join('\n  '));
    return asociatePlaylists.join('\n  ');
  }
}