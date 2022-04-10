import * as inquirer from 'inquirer';
import {Group} from '../Basics//Group';
import {promptUser} from './MainMenu';
import {ArtistManager} from '../Managers/ArtistManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {GenreManager} from '../Managers/GenreManager';
import {GroupManager} from '../Managers/GroupManager';


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
      choices: genres,
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
    const newGroup: Group = new Group(answers.name, answers.genre, answers.groups,
        answers.albums, answers.songs);
    manager.addGroup(newGroup);
    promptGroups();
  });
}

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


function promptEditGroup(): void {
  console.clear();

  inquirer.prompt({
    type: 'list',
    name: 'groupEdit',
    message: 'Escoja el grupo que quiere editar:',
    choices: manager.getList(),
  }).then((answers) => {
    let group: Group = manager.searchByName(answers.groupEdit);
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
        default: group.getArtists(),
      },
      {
        type: 'input',
        message: 'Introduzca el año de creacion:',
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
        default: group.getAlbums(),
      },
    ];
    inquirer.prompt(questions).then((answers) => {
      group.setName(answers.name);
      group.setArtists(answers.musicians);
      group.setYearCreation(answers.year);
      group.setGenres(answers.genre);
      group.setAlbums(answers.albums);
      promptGroups();
    });
  });
}


enum visualizationMode {
  byTitle = 'Ver por titulo de cancion',
  byName = 'Ver por nombre de album',
  byPlaylist = 'Ver por pleylists asociadas',
  back = 'Volver'
}

function promptShowData() {
  console.clear();

  inquirer.prompt({
    type: 'list',
    name: 'group',
    message: 'Escoja el grupo que quiere ver:',
    choices: manager.getList(),
  }).then((answers) => {
    let group: Group = manager.searchByName(answers.group);
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
          promptGroups();
          break;
      }
    });
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
          }
        });
        break;
      case modeShowSong.single:
        group.showSingles();
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
              promptShowData(group);
              break;
          }
        });
        break;
    }
  });
}

enum modeShowPleyList {
  name = 'Mostrar playlist por nombre',
  back = 'Volver'
}

function promptShowPleyList(group: Group) {
  console.clear();

  inquirer.prompt({
    type: 'list',
    name: 'mode',
    message: 'Como quiere ver los datos?',
    choices: Object.values(modeShowPleyList),
  }).then((answers) => {
    switch (answers['mode']) {
      case modeShowPleyList.name:
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
              break;
            case modeShowPleyList.back:
              promptShowPleyList(group);
              break;
          }
        });
        break;
    }
  });
}
