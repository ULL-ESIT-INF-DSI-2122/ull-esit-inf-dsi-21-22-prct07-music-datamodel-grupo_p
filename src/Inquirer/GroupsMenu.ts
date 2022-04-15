/* eslint-disable no-unused-vars */
import * as inquirer from 'inquirer';
import {Group} from '../Basics/Group';
import {promptUser} from './MainMenu';
import {ArtistManager} from '../Managers/ArtistManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {GenreManager} from '../Managers/GenreManager';
import {GroupManager} from '../Managers/GroupManager';
import {Artist} from '../Basics/Artist';
import {Album} from '../Basics/Album';

/**
 * Group Manager.
 */
const manager = GroupManager.getGroupManager();

/**
 * Despliega el menú de los grupos.
 */
export function promptGroups(): void {
  let options: string[] = ['Nuevo group +'];
  options = options.concat(manager.getList());
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Grupos',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Nuevo group +':
        promptAddGroup();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        const group: Group = manager.searchByName(answers['command']);
        // console.log(answers['command']);
        // promptSync('prueba');
        promptGroup(group);
        break;
    }
  });
}
/**
 * Despliega el menú de un grupo en concreto.
 * @param group Grupo del cuál se despliega el menú.
 */
export function promptGroup(group: Group): void {
  console.clear();
  group.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Mostrar información', 'Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Mostrar información':
        promptShowData(group);
        break;
      case 'Editar':
        promptEditGroup(group);
        break;
      case 'Eliminar':
        promptRemoveGroup(group);
        break;
      default:
        promptGroups();
        break;
    }
  },
  );
}
/**
 * Despliega el menú para crear un nuevo grupo.
 */
function promptAddGroup(): void {
  console.clear();
  const albums: string[] = AlbumManager.getAlbumManager().getList();
  const genres: string[] = GenreManager.getGenreManager().getList();
  const artists: string[] = ArtistManager.getArtistManager().getList();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Group name:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value)) {
          val = 'Error: ya existe un grupo con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      name: 'artist',
      message: 'Choice artist:',
      choices: artists,
      validate(value: string[]) {
        if (value.length < 1) {
          return 'Debes elegir al menos un artista para el grupo.';
        }
        return true;
      },
    },
    {
      type: 'input',
      message: 'Año de creacion del grupo:',
      name: 'year',
      validate(value: number) {
        if (value < 1 || value > 9999) {
          return 'Introduce un año válido.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      name: 'genre',
      message: 'Choice genre:',
      choices: genres,
      validate(value: string[]) {
        if (value.length < 1) {
          return 'Debes elegir al menos un género';
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
  ];
  inquirer.prompt(questions).then((answers) => {
    let albums: Album[] = [];
    answers.albums.forEach((albumName: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(albumName));
    });
    let artist: Artist[] = [];
    answers.artist.forEach((artistName: string) => {
      artist.push(ArtistManager.getArtistManager().searchByName(artistName));
    });
    const newGroup: Group = new Group(answers.name, artist, answers.year, answers.genre, albums);
    manager.addGroup(newGroup);
    promptGroups();
  });
}
/**
 * Muestra una pregunta de confirmación para eliminar un grupo.
 * @param group Grupo a eliminar.
 */
export function promptRemoveGroup(group: Group) {
  console.clear();
  inquirer
      .prompt([
        {
          name: 'eliminar',
          type: 'confirm',
          message: '¿Seguro que quieres eliminar este grupo?',
        },
      ])
      .then((answer) => {
        if (answer.eliminar) {
          manager.deleteGroup(group);
        }
        promptGroups();
      });
}

/**
 * Despliega el menú para editar un grupo.
 * @param group Grupo a editar.
 */
function promptEditGroup(group: Group): void {
  console.clear();
  const albums: string[] = AlbumManager.getAlbumManager().getList();
  const genres: string[] = GenreManager.getGenreManager().getList();
  const artists: string[] = ArtistManager.getArtistManager().getList();
  const albumsNames: string[] = [];
  group.getAlbums().forEach((album) => {
    albumsNames.push(album.getName());
  });
  const artistNames: string[] = [];
  group.getArtists().forEach((artist) => artistNames.push(artist.getName()));
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Group name:',
      default: group.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        manager.getCollection().forEach((element) => {
          if (value === element.getName() && group !== element) {
            val = 'Error: ya existe un grupo con ese nombre.';
          }
        });
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige artistas:',
      name: 'artists',
      choices: artists,
      default: artistNames,
    },
    {
      type: 'input',
      message: 'Introduzca el año de creacion:',
      name: 'year',
      default: group.getFundationYear(),
      validate(value: number) {
        if (value < 1 || value > 9999) {
          return 'Introduce un año válido.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige generos:',
      name: 'genres',
      choices: genres,
      default: group.getGenres(),
    },
    {
      type: 'checkbox',
      message: 'Elige álbums:',
      name: 'albums',
      choices: albums,
      default: albumsNames,
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    let albums: Album[] = [];
    answers.albums.forEach((albumName: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(albumName));
    });
    let artists: Artist[] = [];
    answers.artists.forEach((artistName: string) => {
      artists.push(ArtistManager.getArtistManager().searchByName(artistName));
    });
    manager.editGroup(group, answers.name, artists, answers.year, answers.genres, albums);
    promptGroups();
  });
}

/**
 * Opciones del menú de visualizacion.
 */
enum visualizationMode {
  byTitle = 'Canciones',
  byName = 'Álbumes',
  byPlaylist = 'Playlists asociadas',
  back = 'Volver'
}

/**
 * Despliega el menú de visualización de un grupo.
 * @param group Grupo del que se va a visualizar información.
 */
function promptShowData(group: Group) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'visualization',
    message: 'Que quiere ver',
    choices: Object.values(visualizationMode),
  }).then((answers) => {
    switch (answers['visualization']) {
      case visualizationMode.byTitle:
        promptShowSongs(group);
        break;
      case visualizationMode.byName:
        promptShowAlbums(group);
        break;
      case visualizationMode.byPlaylist:
        promptShowPlayList(group);
        break;
      default:
        promptGroup(group);
        break;
    }
  });
}

/**
 * Opciones del menú de visualización de canciones del grupo.
 */
enum modeShowSong {
  title = 'Por titulo',
  repro = 'Por número de reproducciones',
  single = 'Mostrar solo los singles',
  back = 'Volver'
}

/**
 * Despliega el menú de visualización de canciones un grupo.
 * @param group Grupo del que se van a visualizar las canciones.
 */
function promptShowSongs(group: Group) {
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
              group.showSongsOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(group);
              });
              break;
            case 'Descendente':
              group.showSongsOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(group);
              });
              break;
            default:
              promptShowSongs(group);
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
              group.showByReproductions();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(group);
              });
              break;
            case 'Descendente':
              group.showByReproductions(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(group);
              });
              break;
            default:
              promptShowSongs(group);
              break;
          }
        });
        break;
      case modeShowSong.single:
        group.showSingles();
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Opciones:',
          choices: ['Volver'],
        }).then((answers) => {
          promptShowSongs(group);
        });
        break;
      default:
        promptShowData(group);
        break;
    }
  });
}

/**
 * Opciones del menú de visualización de álbumes del grupo.
 */
enum modeShowAlbum {
  name = 'Por nombre',
  year = 'Por año de lanzamiento',
  back = 'Volver'
}
/**
 * Despliega el menú de visualización de álbumes un grupo.
 * @param group Grupo del que se van a visualizar los álbumes.
 */
function promptShowAlbums(group: Group) {
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
              group.showAlbumOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(group);
              });
              break;
            case 'Descendente':
              group.showAlbumOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(group);
              });
              break;
            default:
              promptShowAlbums(group);
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
              group.showAlbumYearOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(group);
              });
              break;
            case 'Descendente':
              group.showAlbumYearOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(group);
              });
              break;
            default:
              promptShowAlbums(group);
              break;
          }
        });
        break;
      default:
        promptShowData(group);
        break;
    }
  });
}

/**
 * Opciones del menú de visualización de playlist asociadas al grupo.
 */
enum modeShowPlayList {
  name = 'Mostrar playlist asociadas',
  back = 'Volver'
}

/**
 * Despliega el menú de visualización de playlists asociadas a un grupo.
 * @param group Grupo del que se van a visualizar las playlists asociadas.
 */
function promptShowPlayList(group: Group) {
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
              group.showPlayListAsociate();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowPlayList(group);
              });
              break;
            case 'Descendente':
              group.showPlayListAsociate();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowPlayList(group);
              });
              break;
            default:
              promptShowPlayList(group);
              break;
          }
        });
        break;
      default:
        promptShowData(group);
        break;
    }
  });
}
