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

enum options {
  Show = 'Show Data Base',
  Add = 'Add new group+',
  Revove = 'Delete group',
  Edit = 'Edit group',
  Back = 'Back'
}

const manager = GroupManager.getGroupManager();
const albums: string[] = AlbumManager.getAlbumManager().getList();
const genres: string[] = GenreManager.getGenreManager().getList();
const artists: string[] = ArtistManager.getArtistManager().getList();
/*
export function promptGroups(): void {
  console.clear();

  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Escoja que quiere hacer:',
    choices: Object.values(options),
  }).then((answers) => {
    switch (answers['command']) {
      case options.Add:
        promptAddGroup();
        break;
      case options.Edit:
        promptEditGroup();
        break;
      case options.Revove:
        promptRemoveGroup();
        break;
      case options.Show:
        promptShowData();
        break;
      case options.Back:
        promptUser();
        break;
      default:
        promptGroups();
        break;
    }
  });
}
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

function promptAddGroup(): void {
  console.clear();

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
/*
function promptRemoveGroup(): void {
  console.clear();
  // ELEGIR GRUPO A ELIMINAR
  inquirer.prompt({
    type: 'list',
    name: 'groupRemove',
    message: 'Escoja el grupo que quiere eliminar:',
    choices: manager.getList(),
  }).then((answers) => {
    inquirer.prompt([
      {
        name: 'remove',
        type: 'confirm',
        message: '¿Eliminar este grupo?',
      },
    ]).then((answer) => {
      if (answer.eliminar) {
        let group: Group = manager.searchByName(answers.groupRemove);
        manager.removeGroup(group);
      }
      promptGroups();
    });
  });
}
*/

function promptEditGroup(group: Group): void {
  console.clear();
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
      name: 'artist',
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
      name: 'genre',
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
    let artist: Artist[] = [];
    answers.artist.forEach((artistName: string) => {
      artist.push(ArtistManager.getArtistManager().searchByName(artistName));
    });
    manager.editGroup(group, answers.name, artist, answers.year, answers.genre, albums);
    promptGroups();
  });
}


enum visualizationMode {
  byTitle = 'Ver por titulo de cancion',
  byName = 'Ver por nombre de album',
  byPlaylist = 'Ver por pleylists asociadas',
  back = 'Volver'
}

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
        promptShowPleyList(group);
        break;
      default:
        promptGroup(group);
        break;
    }
  });
}

enum modeShowSong {
  title = 'Mostrar canciones por titulo',
  repro = 'Mostrar por numero de reproducciones',
  single = 'Mostrar solo los singles',
  back = 'Volver'
}

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
          choices: ['Ascendente', 'Descendente'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              group.showSongsOrder();
              break;
            case 'Descendente':
              group.showSongsOrder(false);
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
          choices: ['Ascendente', 'Descendente'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              group.showByReproductions();
              break;
            case 'Descendente':
              group.showByReproductions(false);
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

enum modeShowAlbum {
  name = 'Mostrar albunes por nombre',
  year = 'Mostrar por año de lanzamiento',
  back = 'Volver'
}

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
          choices: ['Ascendente', 'Descendente'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              group.showAlbumOrder();
              break;
            case 'Descendente':
              group.showAlbumOrder(false);
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
          choices: ['Ascendente', 'Descendente'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              group.showAlbumYearOrder();
              break;
            case 'Descendente':
              group.showAlbumYearOrder(false);
              break;
            default:
              promptShowAlbums(group);
              break;
          }
        });
        break;
    }
  });
}

enum modeShowPlayList {
  name = 'Mostrar playlist asociadas',
  back = 'Volver'
}

function promptShowPleyList(group: Group) {
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
          choices: ['Ascendente', 'Descendente'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
              group.showPlayListAsociate();
              break;
            case 'Descendente':
              group.showPlayListAsociate();
              break;
            default:
              promptShowPleyList(group);
              break;
          }
        });
      default:
        promptShowData(group);
        break;
    }
  });
}
