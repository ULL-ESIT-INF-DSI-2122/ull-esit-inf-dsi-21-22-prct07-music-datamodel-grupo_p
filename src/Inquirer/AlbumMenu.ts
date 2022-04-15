import * as inquirer from 'inquirer';
import {GenreManager} from '../Managers/GenreManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {Album} from '../Basics/Album';
import {promptUser} from './MainMenu';
import {SongManager} from '../Managers/SongManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {GroupManager} from '../Managers/GroupManager';
import {Song} from '../Basics/Song';

/**
 * Despliega el menú de los álbumes.
 */
export function promptAlbumPrincipal(): void {
  const manager: AlbumManager = AlbumManager.getAlbumManager();
  let options: string[] = ['Nuevo Album +'];
  options = options.concat(manager.getList());
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Albunes',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Nuevo Album +':
        promptAddAlbum();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        const album: Album = manager.searchByName(answers['command']);
        promptAlbum(album);
        break;
    }
  });
}
/**
 * Despliega el menú de un álbum en concreto.
 * @param album Álbum del cuál se despliega el menú.
 */
function promptAlbum(album: Album): void {
  console.clear();
  album.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Editar':
        promptEditAlbum(album);
        break;
      case 'Eliminar':
        promptRemoveAlbum(album);
        break;
      default:
        promptAlbumPrincipal();
        break;
    }
  },
  );
}
/**
 * Muestra una pregunta de confirmación para eliminar un álbum.
 * @param album Álbum a eliminar.
 */
function promptRemoveAlbum(album: Album) {
  const manager: AlbumManager = AlbumManager.getAlbumManager();
  console.clear();
  inquirer
      .prompt([
        {
          name: 'eliminar',
          type: 'confirm',
          message: '¿Seguro que quieres eliminar este album?',
        },
      ])
      .then((answer) => {
        if (answer.eliminar) manager.removeAlbum(album);
        promptAlbumPrincipal();
      });
}

/**
 * Despliega el menú para crear un nuevo álbum.
 */
function promptAddAlbum(): void {
  const manager: AlbumManager = AlbumManager.getAlbumManager();
  const artists: string[] = ArtistManager.getArtistManager().getList();
  const groups: string[] = GroupManager.getGroupManager().getList();
  const musicians = artists.concat(groups);
  const song: SongManager = SongManager.getSongManager();
  const genres: GenreManager = GenreManager.getGenreManager();
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre del album:',
      validate(value: string) {
        if (value.length === null) {
          return 'Debes dar un nombre al álbum.';
        } else if (manager.anotherOneWithThatName(value)) {
          return 'Error: ya existe un álbum con ese nombre.';
        }
        return true;
      },
    },
    {
      type: 'list',
      message: '¿Nombre del artista o grupo?:',
      name: 'musicians',
      choices: musicians,
      validate(answer: string) {
        if (answer.length !== 1) {
          return 'Debes elegir un artista o grupo.';
        }
        return true;
      },
    },
    {
      type: 'number',
      message: 'Año de publicación:',
      name: 'publication',
      validate(answer: number) {
        if (answer === null) {
          return 'Debes introducir el año de publicación';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige un/unos de los géneros:',
      name: 'genre',
      choices: genres.getList(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un género.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: '¿Selecciona las canciones?',
      name: 'songs',
      choices: song.getList(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una canción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    const songManager: SongManager = SongManager.getSongManager();
    let songs: Song[] = [];
    answers.songs.forEach((song: string) => {
      songs.push(songManager.searchByName(song));
    });
    const newAlbum: Album = new Album(answers.name, answers.musicians, answers.publication, answers.genre, songs);
    manager.addAlbum(newAlbum);
    promptAlbumPrincipal();
  });
}

/**
 * Despliega el menú para editar un álbum.
 * @param album Álbum a editar.
 */
function promptEditAlbum(album: Album): void {
  const manager: AlbumManager = AlbumManager.getAlbumManager();
  const artists: string[] = ArtistManager.getArtistManager().getList();
  const groups: string[] = GroupManager.getGroupManager().getList();
  const musicians = artists.concat(groups);
  let genreList: string[] = GenreManager.getGenreManager().getList();
  let songs: string[] = SongManager.getSongManager().getList();
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nuevo nombre del álbum:',
      default: album.getName(),
      validate(value: string) {
        if (value.length === null) {
          return 'Debes dar un nombre al álbum.';
        } else if (manager.anotherOneWithThatName(value, album)) {
          return 'Error: ya existe un álbum con ese nombre.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Autor del album:',
      name: 'publisher',
      choices: musicians,
      default: [album.getPublisher()],
      validate(answer: string[]) {
        if (answer.length !== 1) {
          return 'Debes elegir un autor.';
        }
        return true;
      },
    },
    {
      type: 'input',
      message: 'Año de publicación:',
      name: 'publication',
      default: album.getYear(),
      validate(answer: number) {
        if (answer === null) {
          return 'Debes introducir el año de publicación';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Género/s:',
      name: 'genres',
      choices: genreList,
      default: album.getGenres(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un género.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Canciones:',
      name: 'songs',
      choices: songs,
      default: album.getSongs(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una canción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    let songs: Song[] = [];
    answers.songs.forEach((s: string) => {
      songs.push(SongManager.getSongManager().searchByName(s));
    });
    manager.editAlbum(album, answers.name, answers.publisher[0], answers.publication,
        answers.genres, songs);
    promptAlbumPrincipal();
  });
}