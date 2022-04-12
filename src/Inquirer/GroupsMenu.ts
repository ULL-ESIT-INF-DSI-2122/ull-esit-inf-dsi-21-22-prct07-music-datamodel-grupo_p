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


const manager = GroupManager.getGroupManager();
const albums: string[] = AlbumManager.getAlbumManager().getList();
const genres: string[] = GenreManager.getGenreManager().getList();
const artists: string[] = ArtistManager.getArtistManager().getList();

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
        promptGroup(group);
        break;
    }
  });
}

enum optionsMod {
  Show = 'Mostrar información.',
  Revove = 'Eliminar grupo.',
  Edit = 'Editar grupo.',
  Back = 'Volver.'
}

export function promptGroup(group: Group): void {
  console.clear();
  group.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: Object.values(optionsMod),
  }).then((answers) => {
    switch (answers['command']) {
      case optionsMod.Show:
        promptShowData(group);
        break;
      case optionsMod.Edit:
        promptEditGroup(group);
        break;
      case optionsMod.Revove:
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
    const albumsObj: Album[] = answers.albums.map((albumName: string) => AlbumManager.getAlbumManager().searchByName(albumName));
    const artistObj: Artist[] = answers.artist.map((artistName: string) => ArtistManager.getArtistManager().searchByName(artistName));
    const newGroup: Group = new Group(answers.name, artistObj, answers.year, answers.genre, albumsObj);
    manager.addGroup(newGroup);
    promptGroups();
  });
}

export function promptRemoveGroup(group: Group) {
  console.clear();
  inquirer.prompt([
    {
      name: 'eliminar',
      type: 'confirm',
      message: '¿Seguro que quieres eliminar este grupo?',
    },
  ]).then((answer) => {
    if (answer.eliminar) {
      manager.deleteGroup(group);
    }
    promptGroups();
  });
}


function promptEditGroup(group: Group): void {
  console.clear();
  const albumsNames: string[] = group.getAlbums().map((album) => album.getName());
  const artistNames: string[] = group.getArtists().map((artist) => artist.getName());
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
    const albumsObj: Album[] = answers.albums.map((albumName: string) => AlbumManager.getAlbumManager().searchByName(albumName));
    const artistObj: Artist[] = answers.artist.map((artistName: string) => ArtistManager.getArtistManager().searchByName(artistName));
    const newGroup: Group = new Group(answers.name, artistObj, answers.year, answers.genre, albumsObj);
    manager.editGroup(group, newGroup);
    // manager.editGroup(group, answers.name, artistObj, answers.year, answers.genre, albumsObj);
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

enum orden {
  asc = 'Ascendente',
  des = 'Descendente',
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
          choices: Object.values(orden),
        }).then((answers) => {
          switch (answers['order']) {
            case orden.asc:
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
            case orden.des:
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
          choices: Object.values(orden),
        }).then((answers) => {
          switch (answers['order']) {
            case orden.asc:
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
            case orden.des:
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

enum modeShowAlbum {
  name = 'Por nombre',
  year = 'Por año de lanzamiento',
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
          choices: Object.values(orden),
        }).then((answers) => {
          switch (answers['order']) {
            case orden.asc:
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
            case orden.des:
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
          choices: Object.values(orden),
        }).then((answers) => {
          switch (answers['order']) {
            case orden.asc:
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
            case orden.des:
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
      default:
        promptShowData(group);
        break;
    }
  });
}

function promptShowPleyList(group: Group) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'order',
    message: 'Orden?',
    choices: Object.values(orden),
  }).then((answers) => {
    switch (answers['order']) {
      case orden.asc:
        group.showPlayListAsociate();
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Opciones:',
          choices: ['Volver'],
        }).then((answers) => {
          promptShowData(group);
        });
        break;
      case orden.des:
        group.showPlayListAsociate();
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Opciones:',
          choices: ['Volver'],
        }).then((answers) => {
          promptShowData(group);
        });
        break;
      default:
        promptShowPleyList(group);
        break;
    }
  });
}
