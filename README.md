# __PRÁCTICA 7. Digitalizando la colección de música de los abuelos__

Asignatura: Desarrollo de sistemas informáticos

Curso: 3º, 2021/22

Grupo: P

Integrantes:

- Ainoa Iglesias Dasilva, alu0101164403@ull.edu.es

- Carla Fernanda Flores Gonzalez, alu0101278353@ull.edu.es

- Marc Carbonell González De Chaves, alu0101323282@ull.edu.es

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_p/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_p/actions/workflows/tests.yml)

## __Planteamiento__
Para realizar esta práctica hemos planteado el siguiente esquema de clases:
- Seis clases básicas de nuestro proyecto que representan canciones, álbumes, artistas, grupos, géneros musicales y playlists (todas estas heredan de la clase abstracta BasicData).
src/Basics:
  - BasicData
    - Song
    - Album
    - Artist
    - Group
    - Genre
    - Playlist
- Seis clases que contienen las colecciones de cada una de las clases básicas y que sirven para gestionar su funcionamiento (todas estas heredan de la clase abstracta genérica Manager<T>).
src/Managers:
  - Manager<T>
    - SongManager
    - AlbumManager
    - ArtistManager
    - GroupManager
    - GenreManager
    - PlaylistManager

Asi mismo, nuestro proyecto incluye ficheros para almacenar las funciones encargadas de desplegar el menú de cada clase básica y del propio menú principal del
programa. 
src/Inquirer:
  - MainMenu
  - SongsMenu
  - AlbumsMenu
  - ArtistsMenu
  - GroupsMenu
  - GenresMenu
  - PlaylistsMenu
  
Además, también se incluyen, en un directorio a parte, las interfaces que se utilizan para dar forma de tipo a los objetos extraídos de los ficheros JSON mediante Lowdb, y que, más tarde, serán deserializados por la clase básica correspondiente.
src/Interfaces:
  - SongInterface
  - AlbumInterface
  - ArtistInterface
  - GroupInterface
  - GenreInterface
  - PlaylistInterface

Por último, dentro del directorio Data, se encuentran los ficheros JSON correspondientes a cada clase básica que almacenan los datos del programa.
src/Data:
  -Songs.JSON
  - Albums.JSON
  - Artists.JSON
  - Groups.JSON
  - Genres.JSON
  - Playlists.JSON
  


## __Interfaces__

Las interfaces que contiene el programa representan como se organiza la información en los ficheros JSON. Para los atributos en las clases que guardan objetos se llama a la interfaz correspondiente para que se pueda crear correctamente esos atributos después.

```typescript
import {SongInterface} from './SongInterface';

export interface PlaylistInterface {
    name: string,
    songs: SongInterface[],
    systemPlaylist: boolean
}
```

```typescript
import {AlbumInterface} from './AlbumInterface';
import {ArtistInterface} from './ArtistInterface';

export interface GroupInterface {
  name: string;
  artists: ArtistInterface[],
  fundationYear: number,
  genres: string[],
  albums: AlbumInterface[]
}
```

## __Clases básicas__
  Estas clases representan los objetos que sirven como base del programa y de los cuáles se quiere poder gestionar sus datos. Para almacenar de manera correcta las propiedades principales de las clases básicas en sus respectivos ficheros JSON debemos elegir que atributos alamacenarán los propios objetos o simplemente una referencia a ellos, en nuestro caso utilizaremos un string con el nombre del objeto. Para ello hemos diseñado el siguiente esquema de almacenamiento para las clases básicas:
  - Song
    - Autor (author) -> string
    - Géneros (genres) -> string[]
  - Album
    - Autor (whoPublishes) -> string
    - Géneros (genres) -> string[]
    - __Canciones (songs) -> Song[]__
  - Artist
    - Grupos (groups) -> string[]
    - __Álbumes (albums) -> Album[]__
    - __Canciones (songs) -> Song[]__
  - Group
    - Géneros (genres) -> string[]
    - __Artistas (artists) -> Artist[]__
    - __Álbumes (albums) -> Album[]__
  - Genre
    - __Músicos (musicians) -> (Group|Artist)[]__
    - __Álbumes (albums) -> Album[]__
    - __Canciones (songs) -> Song[]__
  - Playlist
    - __Géneros (genres) -> Genre[]__
    - __Canciones (songs) -> Song[]__
 
 El criterio en el que se basa este diseño es en que cada clase almacene como objetos a las clases que "contiene" y guarde el nombre de las clases que la "contienen":
  
  [Playlist [Género [Grupo [Artista [Álbum [Canción]]]]]]
  
 Asi mismo, estas clases básicas contienen sus respectivos getters, setters, métodos para eliminar o añadir elementos a las propiedades en forma de array, métodos para mostrar su información por pantalla (showInfo) y para deserializar un objeto extraído del JSON correspondiente (deserialize). Todas clase básica hereda de la clase abstracta `BasicData` que implementa los métodos `getName()` y `setName()`, que son comunes a todas estas clases, y que sirve para respetar el principio SOLID __Dependency inversion principle__ en la restricción de tipos de la clase génerica `Manager` que se explica en el apartado [Clases gestoras](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_p/edit/desarrollo/README.md#clases-gestoras).
  
 ``` typescript
 export abstract class BasicData {
  constructor(protected name: string) {
  }
  public getName(): string {
    return this.name;
  }
  public setName(newName: string): void {
    this.name = newName;
  }
 ```

Ejemplo clase base, en este caso la clase también necesitaba de métodos que mostraran cierta información y con un orden alfabético concreto:

```typescript
export class Artist extends BasicData {
  constructor(name: string, private groups: string[],
      private genres: string[], private albums: Album[], private songs: Song[]) {
    super(name);
  }
  public static deserialize(artist: ArtistInterface): Artist {
    let managerSong = SongManager.getSongManager();
    let managerAlbum = AlbumManager.getAlbumManager();
    let songs: Song[] = artist.songs.map((songName) => managerSong.searchByName(songName.name));
    let albums: Album[] = artist.albums.map((albumName) => managerAlbum.searchByName(albumName.name));
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
  // MOSTRAR
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

  public showSongsOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getSongs().map((song) => song.getName());
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
    }
  }

  public showAlbumOrder(ascending: boolean = true): void {
    let nameList: string[] = this.getAlbums().map((album) => album.getName());
    nameList = nameList.sort();
    if (ascending) {
      console.log('  '+nameList.join('\n  '));
    } else {
      console.log('  '+nameList.reverse().join('\n  '));
    }
  }

  public showAlbumYearOrder(ascending: boolean = true): void {
    let albums = this.getAlbums().sort((albumA, albumB) => albumA.getYear() - albumB.getYear());
    let albumNames: string[] = albums.map((album) => album.getName());
    if (ascending) {
      console.log('  '+albumNames.join('\n  '));
    } else {
      console.log('  '+albumNames.reverse().join('\n  '));
    }
  }

  public showSingles(): void {
    let songs: Song[] = this.getSongs().filter((song) => song.getIsSingle());
    let single: string[] = songs.map((song) => song.getName());
    console.log('  '+single.join('\n  '));
  }

  public showByReproductions(ascending: boolean = true): void {
    let songs = this.getSongs().sort((songA, songB) => {
      return songA.getReproductions() - songB.getReproductions();
    });
    let songsNames: string[] = songs.map((song) => song.getName());
    if (ascending) {
      console.log('  '+songsNames.join('\n  '));
    } else {
      console.log('  '+songsNames.reverse().join('\n  '));
    }
  }

  public showPlayListAsociate(): void {
    const playLists: Playlist[] = Array.from(PlaylistManager.getPlaylistManager().getCollection());
    const playListsWithAuthor: Playlist[] = playLists.filter((playList) => playList.getMusicians().includes(this.getName()));
    const asociatePlaylists: string[] = playListsWithAuthor.map((playlist) => {
      return playlist.getName();
    });
    console.log('  ' + asociatePlaylists.join('\n  '));
  }
}
```

Como puede verse, contiene un método **deserialice**, su función es convertir lo que se lee en los ficheros JSON en objetos, para ello se tiene en cuenta que atributos son almacenados como objetos de otras clases bases ya que 

En la clases bases de Song, encontramos también un método que devuelve los artistas asociados a una canción:

```typescript
public getArtists(): string[] {
    const artists: string[] = ArtistManager.getArtistManager().getList();
    const objArtist: Artist[] = artists.map((name) => ArtistManager.getArtistManager().searchByName(name));
    let artistAsociate: Artist[] = objArtist.filter((artist) => artist.getSongs().includes(this));
    return artistAsociate.map((artistObj) => artistObj.getName());
  }
```

En la clase Playlist encontramos algunas diferencias ya que además de mostrar información relacionada con datos que no contiene como mostrar según artistas/grupos, tambien necesita calcular el tiempo que dura según las canciones que contiene, y actualizar los géneros. 

```typescript
export type Duration = [number, number];
export type Order = 0|1|2|3|4|5|6|7|8|9|10|11;

export class Playlist extends BasicData {
  private genres: Genre[];
  private duration: Duration;

  constructor(name: string, private songs: Song[],
              private systemPlaylist: boolean = false) {
    super(name);
    this.genres = [];
    this.duration = [0, 0];
    this.recalculateDuration();
    this.updateGenres();
  }

  getSongs(): Song[] {
    return this.songs;
  }

  setSongs(songs: Song[]): void {
    this.songs = songs;
    this.recalculateDuration();
    this.updateGenres();
  }

  addSong(newSong: Song): void {
    if (this.songs.find((m) => m === newSong) === undefined) {
      this.songs.push(newSong);
    }
    this.recalculateDuration();
    this.updateGenres();
  }

  deleteSong(song: Song): void {
    const index = this.songs.indexOf(song);
    this.songs.splice(index, 1);
    this.recalculateDuration();
    this.updateGenres();
  }

  getDuration(): Duration {
    return this.duration;
  }

  getGenres(): Genre[] {
    return this.genres;
  }

  getSystemPlaylist(): boolean {
    return this.systemPlaylist;
  }

  setSystemPlaylist(flag: boolean): void {
    this.systemPlaylist = flag;
  }

  recalculateDuration(): void {
    let minuts: number = 0;
    let seconds: number = 0;
    this.songs.forEach((song) => {
      minuts += song.getDuration()[0];
      seconds += song.getDuration()[1];
    });
    this.duration = [Math.trunc(minuts/60), minuts%60 + Math.trunc(seconds/60)];
  }

  updateGenres() {
    this.genres = [];
    this.songs.forEach((s) => {
      s.getGenres().forEach((g) => {
        if ((this.genres.find((x: Genre) => x.getName() === g)) === undefined) {
          this.genres.push(GenreManager.getGenreManager().searchByName(g));
        }
      });
    });
  }

  getSongsNames(order: Order = 0): string[] {
    switch (order) {
      case 0:
        this.songs.sort(function(a, b) {
          if (a.getName() < b.getName()) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 1:
        this.songs.sort(function(a, b) {
          if (a.getName() > b.getName()) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 2:
        this.songs.sort(function(a, b) {
          if (a.getAuthorName() < b.getAuthorName()) {
            return -1;
          }
          if (a.getAuthorName() > b.getAuthorName()) {
            return 1;
          }
          return 0;
        });
        break;
      case 3:
        this.songs.sort(function(a, b) {
          if (a.getAuthorName() > b.getAuthorName()) {
            return -1;
          }
          if (a.getAuthorName() < b.getAuthorName()) {
            return 1;
          }
          return 0;
        });
        break;
      case 4:
        this.songs.sort(function(a, b) {
          if (a.getPublicationDate() < b.getPublicationDate()) {
            return -1;
          }
          if (a.getPublicationDate() > b.getPublicationDate()) {
            return 1;
          }
          return 0;
        });
        break;
      case 5:
        this.songs.sort(function(a, b) {
          if (a.getPublicationDate() > b.getPublicationDate()) {
            return -1;
          }
          if (a.getPublicationDate() < b.getPublicationDate()) {
            return 1;
          }
          return 0;
        });
        break;
      case 6:
        this.songs.sort(function(a, b) {
          if ((a.getDuration()[0]*60 + a.getDuration()[1]) < (b.getDuration()[0]*60 + b.getDuration()[1])) {
            return -1;
          }
          if ((a.getDuration()[0]*60 + a.getDuration()[1]) > (b.getDuration()[0]*60 + b.getDuration()[1])) {
            return 1;
          }
          return 0;
        });
        break;
      case 7:
        this.songs.sort(function(a, b) {
          if ((a.getDuration()[0]*60 + a.getDuration()[1]) > (b.getDuration()[0]*60 + b.getDuration()[1])) {
            return -1;
          }
          if ((a.getDuration()[0]*60 + a.getDuration()[1]) < (b.getDuration()[0]*60 + b.getDuration()[1])) {
            return 1;
          }
          return 0;
        });
        break;
      case 8:
        this.songs.sort(function(a, b) {
          if (a.getGenres()[0] < b.getGenres()[0]) {
            return -1;
          }
          if (a.getGenres()[0] > b.getGenres()[0]) {
            return 1;
          }
          return 0;
        });
        break;
      case 9:
        this.songs.sort(function(a, b) {
          if (a.getGenres()[0] > b.getGenres()[0]) {
            return -1;
          }
          if (a.getGenres()[0] < b.getGenres()[0]) {
            return 1;
          }
          return 0;
        });
        break;
      case 10:
        this.songs.sort(function(a, b) {
          if (a.getReproductions() < b.getReproductions()) {
            return -1;
          }
          if (a.getReproductions() > b.getReproductions()) {
            return 1;
          }
          return 0;
        });
        break;
      case 11:
        this.songs.sort(function(a, b) {
          if (a.getReproductions() > b.getReproductions()) {
            return -1;
          }
          if (a.getReproductions() < b.getReproductions()) {
            return 1;
          }
          return 0;
        });
        break;
    }
    let songsNames: string[] = [];
    this.songs.forEach((song) => {
      songsNames.push(song.getName());
    });
    return songsNames;
  }

  showInfo(order: Order = 0): string {
    const info: string = `PLAYLIST ${this.name}
    -Géneros: ${this.getGenresNames()}
    -Playlist original: ${(this.systemPlaylist ? 'Sí' : 'No')}
    -Duración: ${this.duration[0]}h ${this.duration[1]}min
    -Canciones:
      ${this.getSongsNames(order).join('\n      ')}`;
    console.log(info);
    return info;
  }

  public getMusicians(): string[] {
    const artistList: string[] = this.getSongs().map((song) => song.getAuthorName());
    // const artistList = artistLists.reduce((acumulated, newList) => acumulated.concat(newList));
    return artistList;
  }

  private getGenresNames(): string[] {
    let genresNames: string[] = [];
    this.genres.map((genre) => {
      genresNames.push(genre.getName());
    });
    return genresNames;
  }

  public static deserialize(playlist: PlaylistInterface): Playlist {
    let songs: Song[] = [];
    playlist.songs.forEach((s) =>
      songs.push(SongManager.getSongManager().searchByName(s.name)),
    );
    return new Playlist(playlist.name, songs, playlist.systemPlaylist);
  }
}
```

 ## __Clases gestoras__
 Estas clases contienen las colecciones de cada objeto básico y se encargan de gestionar su funcionamiento. De esta manera las clases mánager gestionan el almacenamiento de datos mediante Lowdb, las operaciones de eliminación, creación y edición de los objetos correspondientes. Estas clases están desarrolladas siguiendo el patrón de diseño __Singleton__ para impedir que se cree más de una estancia de cada una de ellas.
  
Toda clase mánager es una especificación de la clase abstracta génerica `Manager<T>` que contiene las propiedades básicas comunes a todas ellas:
  
``` typescript
export abstract class Manager<T extends BasicData> {
  protected collection: Set<T> = new Set<T>();
  getCollection(): Set<T> {
    return this.collection;
  }
  getList(): string[] {
    let options: string[] = [];
    this.collection.forEach((element) => {
      options.push(element.getName());
    });
    return options;
  }
  anotherOneWithThatName(name: string, element?: T): boolean {
    let exists: boolean = false;
    this.collection.forEach((c) => {
      if (name === c.getName() && c !== element) {
        exists = true;
      }
    });
    return exists;
  }
  searchByName(name:string): T {
    return [...this.collection.values()].find((g) =>
      g.getName() === name) as T;
  }
  add(element: T): void {
    this.collection.add(element);
    this.store();
  }
  remove(element: T): void {
    this.collection.forEach((x) => {
      if (x.getName() === element.getName()) {
        this.collection.delete(element);
      }
    });
    this.store();
  }
  abstract store(): void;
}
```

En las clases gestoras, se define un constructor donde se indica, usando **lowdb**, el fichero JSON en el que se guardará la información de la clase correspodiente, si el fichero no existe se creará pero si ya existe se sobreescriben los datos. Como se dijo antes, las clases básicas tienen un método deserialice, a este método de le pasa una interfaz y con ello se sabe como se están leyendo los datos. Puesto que hay atributos que guardan un objeto o lista de objetos de otras clases, al crear el objeto actual debe indicarse en el deserialice que otros objetos debe guardar, para ello se hace uso de las clases manager correspodientes y se crea la lista con esos objetos. Al final se crea un objeto de la clase actual pasandole como parámetros las listas de objetod construidas con los manager y los pasados por parámetro.

Estas clases contienen un método estático que crea un objeto de la clase, con esto se evita la creación varias veces de objetod de una clase gestora que ya que no tiene sentido. Al ser estáticas estas clases no se les llama por un contructor sino por este método.

Se sobreescribe el método **store()** de la clase padre de éstas, el cual se encarga de actualizar los datos en el JSON correspondiente a la clase.

Y todas contienen 3 métodos de modificación de datos. Para los tres se tiene en cuenta las dependencias entre clases, ya que por ejemplo si se elimina una canción no solo debe de desaparecer de su colección sino que debe eliminarse de los álbunes, de los artistas, playlist y géneros, o en caso de editarse un objeto, éste debe cambiar también en el resto de bbdd.

Ejemplo clase gestora:

```typescript
type schemaType = {
    artists: ArtistInterface[]
};
export class ArtistManager extends Manager<Artist> {
  private static artistManager: ArtistManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Artists.json'));
    if (this.database.has('artists').value()) {
      let dbItems = this.database.get('artists').value();
      dbItems.forEach((item) => this.collection.add(Artist.deserialize(item)));
    }
  }

  public static getArtistManager(): ArtistManager {
    if (!ArtistManager.artistManager) {
      ArtistManager.artistManager = new ArtistManager();
    }
    return ArtistManager.artistManager;
  }

  store() {
    this.database.set('artists', [...this.collection.values()]).write();
  }

  public addArtist(artist: Artist): void {
    let groups = artist.getGroups().map((groupName) => GroupManager.getGroupManager().searchByName(groupName));
    groups.forEach((group) => {
      group.addArtist(artist);
    });
    GroupManager.getGroupManager().store();

    let genres = artist.getGenres().map((genreName) => GenreManager.getGenreManager().searchByName(genreName));
    genres.forEach((genre) => {
      genre.addMusician(artist);
    });
    GenreManager.getGenreManager().store();
    this.add(artist);
    this.store();
  }

  public deleteArtist(artist: Artist, deleteSongs: boolean = true): void {
    // Delete artists albums
    const objAlbumManager:AlbumManager = AlbumManager.getAlbumManager();
    const artistAlbums: Album[] = artist.getAlbums();
    const artistAlbumsNames: string[] = artistAlbums.map((album) => album.getName());
    artistAlbumsNames.forEach((albumName) => {
      let album: Album = objAlbumManager.searchByName(albumName);
      objAlbumManager.deleteAlbum(album); // deleteAlbum cuando este AlbumManager
    });
    objAlbumManager.store();
    // Delete artists songs
    if (deleteSongs) {
      const objSongManager:SongManager = SongManager.getSongManager();
      const artistSongs: Song[] = artist.getSongs();
      const artistSongsNames: string[] = artistSongs.map((song) => song.getName());
      artistSongsNames.forEach((songName) => {
        let song: Song = objSongManager.searchByName(songName);
        objSongManager.removeSong(song);
      });
      objSongManager.store();
    }
    // Grupos
    const objGroupManager:GroupManager = GroupManager.getGroupManager();
    const groupNames: string[] = artist.getGroups();
    groupNames.forEach((groupName) => {
      if ((objGroupManager.searchByName(groupName)) !== undefined) {
        let group = objGroupManager.searchByName(groupName);
        group.removeArtist(artist); // If artist is not in list it won't do anything
        if (group.getArtists().length == 0) {
          objGroupManager.deleteGroup(group);
        }
      }
      objGroupManager.store();
    });

    // Delet artist from genres
    const objGenreManager:GenreManager = GenreManager.getGenreManager();
    const genreNames: string[] = artist.getGenres();
    genreNames.forEach((genreName) => {
      let genre = objGenreManager.searchByName(genreName);
      genre.deleteMusician(artist); // If artist is not in list it won't do anything
      if (genre.getMusicians().length == 0) {
        objGenreManager.deleteGenre(genre);
      }
    });
    objGenreManager.store();
    // Playlist
    PlaylistManager.getPlaylistManager().update();
    PlaylistManager.getPlaylistManager().store();
    // Delete from artist collection
    this.remove(artist);
    this.store();
  }

  public editArtist(oldArtist: Artist, newArtist: Artist) {
    // actualiza artista
    this.addArtist(newArtist);
    this.deleteArtist(oldArtist);
  }
}
```

En esta clase, podemos ver un ejemplo de implementación de los métodos añadir, eliminar y editar. En el método de añadir un artista pertene a un grupo y a géneros por lo que primero se busca los objetos de esos manágers que van a contener al nuevo artista y se les añade en el atributo correspondiente y actualizando la bbdd, luego se añade el artista a su colección y se actualiza tambíen su bbdd.
Para el método que elimina un artista, se tiene en cuenta que un artista tiene álbunes canciones que deben eliminarse y se hace llamando a los métodos de los managers correspondientes y que pertene a grupo y géneros, por lo que deben eliminarse primero de la lista de éstos y luego eliminar el artista. Si se hiciera en un órden incorrecto podría pasar que no se encuentre los datos que desean eliminarse.
En el caso del método editar, en este caso, se hace uso de los método añadir y eliminar de la propia clase, puesto que se guardan los nuevos datos del artista (que pueden ser los que ya tenía en algunos atributos) se pasa un artista nuevo creado con estos datos, se añade a la bbdd usando el método de este manáger por lo que ya hace las actualizaciones necesarias, y luego elimina el artista 'viejo'.

En los tres casos se tiene en cuenta que pueden quedar listas vacías, por ejemplo si se elimina integrantes de un grupo y éste queda vacío no tiene sentido tenerlo guardado en la bbdd por lo que es elimando usando el método de su manáger.

Para el manáger de playlist difiere un poco sus métodos respecto a las demás. en este caso encontramos un solo método de modificación de datos, que lo que hace es actualizar su lista de géneros, recalcular su duración y eliminarla en caso de quedar vacía:

```typescript
export class PlaylistManager extends Manager<Playlist> {
  private static playlistsManager: PlaylistManager;
  private database: lowdb.LowdbSync<schemaType>;
  private constructor() {
    super();
    this.database = lowdb(new FileSync('src/Data/Playlists.json'));
    let dbItems = this.database.get('playlists').value();
    dbItems.forEach((item) => {
      this.collection.add(Playlist.deserialize(item));
    });
  }
  public static getPlaylistManager(): PlaylistManager {
    if (!PlaylistManager.playlistsManager) {
      PlaylistManager.playlistsManager = new PlaylistManager();
    }
    return PlaylistManager.playlistsManager;
  }
  update(): void {
    this.collection.forEach((playlist) => {
      playlist.updateGenres();
      playlist.recalculateDuration();
      if (playlist.getSongs().length === 0) {
        this.remove(playlist);
      }
    });
  }
  store() {
    this.database.set('playlists', [...this.collection.values()]).write();
  }
}
```

## __Menús__

Los `MENUS` son la parte iteractiva sobre como hemos realizado la gestión de playlists, canciones, álbumes, artistas y grupos por una línea de comandos haciendo uso del modulo `Inquiere`. A continuación se muestra el prompt principal:

```ts
/**
 * Enumeración de las opciones del menú principal.
 */
export enum Commands {
    Genres = 'Géneros',
    Groups = 'Grupos',
    Artists = 'Artistas',
    Albums = 'Álbumes',
    Songs = 'Canciones',
    Playlists = 'Playlists',
    Quit = 'Salir'
}
/**
 * Despliega el menú principal.
 */
export function promptUser(): void {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Menú principal',
    choices: Object.values(Commands),
  }).then((answers) => {
    switch (answers['command']) {
      case Commands.Genres:
        promptGenres();
        break;
      case Commands.Artists:
        promptArtists();
        break;
      case Commands.Groups:
        promptGroups();
        break;
      case Commands.Songs:
        promptSongPrincipal();
        break;
      case Commands.Playlists:
        promptPlaylists();
        break;
      case Commands.Albums:
        promptAlbumPrincipal();
        break;
    }
  });
}
/**
 * Inicia el programa.
 */
export function run():void {
  SongManager.getSongManager();
  AlbumManager.getAlbumManager();
  ArtistManager.getArtistManager();
  GroupManager.getGroupManager();
  GenreManager.getGenreManager();
  PlaylistManager.getPlaylistManager();
  promptUser();
}

run();
```
Como se puede ver, se ha realizado un `prompt` para cada clase gestora, es decir, si se quiere agregar, modificar o eliminar artistas, canciones, grupos, géneros o playlist se llama al prompt principal de la clase gestora. También se puede apreciar la función `run`, esta inicia el programa en ese orden específico.

Una vez el usuario por ejemplo quiera visualizar, editar, o eliminar un `Artista`se le mostrará el siguiente menú:
```ts
enum options {
  Show = 'Show Data Base',
  Add = 'Add new artist+',
  Revove = 'Delete artist',
  Edit = 'Edit artista',
  Back = 'Back'
}

const manager = ArtistManager.getArtistManager();


export function promptArtists(): void {
  let options: string[] = ['Nuevo artista +'];
  options = options.concat(manager.getList());
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Artistas',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Nuevo artista +':
        promptAddArtist();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        const artist: Artist = manager.searchByName(answers['command']);
        promptArtist(artist);
        break;
    }
  });
}
```

Con el menú  siguiente se listará todos los artistas registrados en la base de datos, desde aquí es que el usuario elige eliminar, agregar o modificar el artista.

```ts
export function promptArtist(artist: Artist): void {
  console.clear();
  artist.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Mostrar información', 'Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Mostrar información':
        promptShowData(artist);
        break;
      case 'Editar':
        promptEditArtist(artist);
        break;
      case 'Eliminar':
        promptRemoveArtist(artist);
        break;
      default:
        promptArtists();
        break;
    }
  },
  );
}
```

Ahora, en la sección de `agregar un artista`, se le solicita que resgistre el artista, colocando el `nombre` y este nombre no puede ser repetido, ya que está registrado en la base de datos(Se valida la entrada previamente), después se le da lo opción de eligir los géneros(haciendo uso del tipo `list` para que se listen todos los géneros de la base, obligando a que elija al menos un género), después le pide elegir los grupos a los que pertenece el artista, despues las canciones que tiene y los álbunes que ha lanzado. Ya que `Artist` recibe un array de tipo `Album` y `Song` se hace lo siguiente para poder hacer la instancia del artista:

```ts
let albums: Album[] = [];
    answers.albums.forEach((a: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(a));
    });
```
Se realiza lo mismo para `Song`, y se agrega el artista de la siguiente manera(Obviamente intanciando `Artist`):

```ts
const newArtist: Artist = new Artist(answers.name, answers.groups, answers.genre,
        albums, songs);
    manager.addArtist(newArtist);
```
A continuación se muestra el contenido completo de como se agregaría el artista:

```ts
function promptAddArtist(): void {
  console.clear();
  const songs: string[] = SongManager.getSongManager().getList();
  const albums: string[] = AlbumManager.getAlbumManager().getList();
  const genres: string[] = GenreManager.getGenreManager().getList();
  const groups: string[] = GroupManager.getGroupManager().getList();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Artist name:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value)) {
          val = 'Error: ya existe un artista con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      name: 'genre',
      message: 'Choice genre:',
      choices: genres,
      validate(value: string[]) {
        if (value.length < 1) {
          return 'Debes elegir al menos un genero';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige grupos:',
      name: 'groups',
      choices: groups,
      validate(value: string[]) {
        if (value.length < 1) {
          return 'Debes elegir al menos un grupo';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige álbums:',
      name: 'albums',
      choices: albums,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un álbum.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige canciones:',
      name: 'song',
      choices: songs,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una cancion.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    let albums: Album[] = [];
    answers.albums.forEach((a: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(a));
    });
    let songs: Song[] = [];
    answers.song.forEach((s: string) => {
      songs.push(SongManager.getSongManager().searchByName(s));
    });
    const newArtist: Artist = new Artist(answers.name, answers.groups, answers.genre,
        albums, songs);
    manager.addArtist(newArtist);
    promptArtists();
  });
}
```

Por otra parte, también tenemos el prompt para eliminar el artista, que prácticamente la funcioón `promptRemoveArtist()` recibe el artista que el usuario haya elegido para eliminar. Se usa el tipo `confirm` para confirma la acción de eliminar.

```ts
export function promptRemoveArtist(artist: Artist) {
  console.clear();
  inquirer
      .prompt([
        {
          name: 'eliminar',
          type: 'confirm',
          message: '¿Seguro que quieres eliminar este artista?',
        },
      ])
      .then((answer) => {
        if (answer.eliminar) {
          manager.deleteArtist(artist);
        }
        promptArtists();
      });
}
```

Después tenemos la función `promptEditArtist()` que recibe el artista que el usuario haya elegido. A continuación se despliega la serie de preguntas con los datos que **quiere y puede** el usuario editar.

Si se quiere editar el nombre del artista, se valida que el nombre del artista no exista en la base, si existe, no se podrá editar.
```ts
{
      type: 'input',
      name: 'newName',
      message: 'Artist new name:',
      default: artist.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        manager.getCollection().forEach((element) => {
          if (value === element.getName() && artist !== element) {
            val = 'Error: ya existe un artista con ese nombre.';
          }
        });
        return val;
      },
    },
```

Para la elección de los grupos a los que pertenece el artista, se despliega un `checkbox` con todos los grupos en la base para que pueda selecionarlos, más los que tiene ya seleccionados por si quiere deseleccionarlos:

```ts
    {
      type: 'checkbox',
      message: 'Elige grupos:',
      name: 'groups',
      choices: groups,
      default: artist.getGroups(),
    },
```

Y lo mismo para la elección de los géneros, canciones y álbumes:

```ts
{
      type: 'checkbox',
      message: 'Elige generos:',
      name: 'genres',
      choices: genres,
      default: artist.getGenres(),
    },
    {
      type: 'checkbox',
      message: 'Elige álbums:',
      name: 'albums',
      choices: albums,
      default: albumsNames,
    },
    {
      type: 'checkbox',
      message: 'Elige canciones:',
      name: 'songs',
      choices: songs,
      default: songsNames,
    },
```
Después de la serie de preguntas, se llama al método `editArtist()` donse se le pasa todas las respuestas seleccionadas por el usuario.

```ts
inquirer.prompt(questions).then((answers) => {
    let albums: Album[] = [];
    answers.albums.forEach((a: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(a));
    });
    let songs: Song[] = [];
    answers.songs.forEach((s: string) => {
      songs.push(SongManager.getSongManager().searchByName(s));
    });
    manager.editArtist(artist, answers.newName, answers.groups, answers.genres, albums, songs);
    promptArtists();
  });
```

Para tener un modo de visualización de los artistas por las canciones, o por los álbumes que tiene, o por las playlists que tiene asociada, se tiene una fucnción `promptShowData()`

```ts
enum visualizationMode {
  byTitle = 'Canciones',
  byName = 'Álbumes',
  byPlaylist = 'Playlists asociadas',
  back = 'Volver'
}

function promptShowData(artist: Artist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'visualization',
    message: 'Que quiere ver',
    choices: Object.values(visualizationMode),
  }).then((answers) => {
    switch (answers['visualization']) {
      case visualizationMode.byTitle:
        promptShowSongs(artist);
        break;
      case visualizationMode.byName:
        promptShowAlbums(artist);
        break;
      case visualizationMode.byPlaylist:
        promptShowPlayList(artist);
        break;
      default:
        promptArtist(artist);
        break;
    }
  });
}
```

Para la visualización de las canciones de modo `ascendente`, `descendente`, por los `singles` o por el `número de reproducciones`, bajo la serie de preguntas y según el usuario requiera visualizar se llama a la función de la clase básica `Artist` donde tiene implementado el método `showSongsOrder()` y `showByReproductions()`, como se ha mencionado anteriormente en la descripción de las clases básicas.
Si se elige orden ascendente no se pone el valor a `true`, porque lo tiene por defecto. Así también para la visualización de los álbumes y las playlists que tiene asociado el artista.

### **SHOWSONG**

```ts
enum modeShowSong {
  title = 'Por titulo',
  repro = 'Por numero de reproducciones',
  single = 'Mostrar solo los singles',
  back = 'Volver'
}

function promptShowSongs(artist: Artist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'mode',
    message: 'Como quiere ver los datos?',
    choices: Object.values(modeShowSong),
  }).then((answers) => {
    switch (answers['mode']) {
      case modeShowSong.title:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              artist.showSongsOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(artist);
              });
              break;
            case 'Descendente':
              artist.showSongsOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(artist);
              });
              break;
            default:
              promptShowSongs(artist);
              break;
          }
        });
        break;
      case modeShowSong.repro:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              artist.showByReproductions();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(artist);
              });
              break;
            case 'Descendente':
              artist.showByReproductions(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(artist);
              });
              break;
            default:
              promptShowSongs(artist);
              break;
          }
        });
        break;
      case modeShowSong.single:
        artist.showSingles();
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Opciones:',
          choices: ['Volver'],
        }).then((answers) => {
          promptShowSongs(artist);
        });
        break;
      default:
        promptShowData(artist);
        break;
    }
  });
}
```
### **SHOWALBUMS**

```ts
enum modeShowAlbum {
  name = 'Por nombre',
  year = 'Por año de lanzamiento',
  back = 'Volver'
}

function promptShowAlbums(artist: Artist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'mode',
    message: 'Como quiere ver los datos?',
    choices: Object.values(modeShowAlbum),
  }).then((answers) => {
    switch (answers['mode']) {
      case modeShowAlbum.name:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              artist.showAlbumOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(artist);
              });
              break;
            case 'Descendente':
              artist.showAlbumOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(artist);
              });
              break;
            default:
              promptShowAlbums(artist);
              break;
          }
        });
        break;
      case modeShowAlbum.year:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              artist.showAlbumYearOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(artist);
              });
              break;
            case 'Descendente':
              artist.showAlbumYearOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(artist);
              });
              break;
            default:
              promptShowAlbums(artist);
              break;
          }
        });
        break;
      case modeShowAlbum.back:
        promptShowData(artist);
        break;
    }
  });
}
```

### **SHOWPLAYLIST**

```ts
enum modeShowPlayList {
  name = 'Mostrar playlist asociadas',
  back = 'Volver'
}

function promptShowPlayList(artist: Artist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'mode',
    message: 'Como quiere ver los datos?',
    choices: Object.values(modeShowPlayList),
  }).then((answers) => {
    switch (answers['mode']) {
      case modeShowPlayList.name:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              artist.showPlayListAsociate();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowPlayList(artist);
              });
              break;
            case 'Descendente':
              artist.showPlayListAsociate();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowPlayList(artist);
              });
              break;
            default:
              promptShowPlayList(artist);
              break;
          }
        });
        break;
      default:
        promptShowData(artist);
        break;
    }
  });
}
```
