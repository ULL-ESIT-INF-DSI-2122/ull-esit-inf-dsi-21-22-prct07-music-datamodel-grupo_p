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
  
 Asi mismo, estas clases básicas contienen sus respectivos getters, setters y métodos para eliminar o añadir elementos a las propiedades en forma de array, y métodos para mostrar su información por pantalla (showInfo) y para deserializar un objeto extraído del JSON correspondiente (deserialize). Todas clase básica hereda de la clase abstracta `BasicData` que implementa los métodos `getName()` y `setName()`, que son comunes a todas estas clases, y que sirve para respetar el principio SOLID __Dependency inversion principle__ en la restricción de tipos de la clase génerica `Manager` que se explica en el apartado [Clases gestoras](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_p/edit/desarrollo/README.md#clases-gestoras).
  
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
    
 ## __Clases gestoras__
 Estas clases contienen las colecciones de cada objeto básico y se encargan de gestionar su funcionamiento. De esta manera las clases mánager gestionan el almacenamiento de datos mediante Lowdb, las operaciones de eliminación, creación y edición de los objetos correspondientes y, en el caso de los manager de Artist, Group y Playlist, de reordenar los elementos mostrados por pantalla. Estas clases están desarrolladas siguiendo el patrón de diseño __Singleton__ para impedir que se cree más de una estancia de cada una de ellas.
  
Toda clase mánager es una específicación de la clase abstracta génerica `Manager<T>` que contiene las propiedades básicas comunes a todas ellas:
  
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
  
## __Menús__
  
## __Interfaces__
  
    
 

