import * as inquirer from 'inquirer';
import {Artist} from '../Basics/Artist/Artist';
import {ArtistManager} from '../Managers/ArtistManager';
import {SongManager} from '../Managers/SongManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {GenreManager} from '../Managers/GenreManager';
import {promptUser} from './MainMenu';
import {GroupManager} from '../Managers/GroupManager';
import {ArtistShow} from '../Basics/Artist/ArtistShow';


enum options {
  Show = 'Show Data Base',
  Add = 'Add new artist+',
  Revove = 'Delete artist',
  Edit = 'Edit artista',
  Back = 'Back'
}

const manager = ArtistManager.getArtistManager();
const songs: string[] = SongManager.getSongManager().getList();
const albums: string[] = AlbumManager.getAlbumManager().getList();
const genres: string[] = GenreManager.getGenreManager().getList();
const groups: string[] = GroupManager.getGroupManager().getList();

export function promptArtists(): void {
  console.clear();

  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Escoja que quiere hacer:',
    choices: Object.values(options),
  }).then((answers) => {
    switch (answers['command']) {
      case options.Add:
        promptAddArtist();
        break;
      case options.Edit:
        promptEditArtist();
        break;
      case options.Revove:
        promptRemoveArtist();
        break;
      case options.Show:
        // manager.showData();
        prompShowData();
        promptArtists();
        break;
      case options.Back:
        promptUser();
        break;
      default:
        promptArtists();
        break;
    }
  });
}

function promptAddArtist(): void {
  console.clear();

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Artist name:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.exists(value)) {
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
      type: 'input',
      name: 'song',
      message: 'Song name:',
      validate(value: string) {
        let val: boolean | string = true;
        if (SongManager.getSongManager().exists(value)) {
          val = 'Error: ya existe una cancion con ese nombre.';
        }
        return val;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    const newArtist: Artist = new Artist(answers.name, answers.genre, answers.groups,
        answers.albums, [], answers.song);
    manager.addArtist(newArtist);
    promptArtists();
  });
}

function promptRemoveArtist(): void {
  console.clear();
  // ELEGIR ARTISTA A ELIMINAR
  inquirer.prompt({
    type: 'list',
    name: 'artistRemove',
    message: 'Escoja el artista que quiere eliminar:',
    choices: manager.getList(),
  }).then((answers) => {
    let artist: Artist = manager.searchByName(answers.artistRemove);
    manager.deleteArtist(artist);
  });
  promptArtists();
}

function promptEditArtist(): void {
  console.clear();

  let artistList: string[] = [];
  artistList.concat(manager.getList());

  // ELEGIR ARTISTA A EDITAR
  inquirer.prompt({
    type: 'list',
    name: 'artistEdit',
    message: 'Escoja el artista que quiere editar:',
    choices: manager.getList(),
  }).then((answers) => {
    let artist: Artist = manager.searchByName(answers.artistEdit);
    const questions = [
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
      {
        type: 'checkbox',
        message: 'Elige generos:',
        name: 'genre',
        choices: genres,
        default: artist.getGenres(),
      },
      {
        type: 'checkbox',
        message: 'Elige grupos:',
        name: 'groups',
        choices: groups,
        default: artist.getGroups(),
      },
      {
        type: 'checkbox',
        message: 'Elige álbums:',
        name: 'albums',
        choices: albums,
        default: artist.getAlbums(),
      },
      {
        type: 'checkbox',
        message: 'Elige canciones:',
        name: 'songs',
        choices: songs,
        default: artist.getSongs(),
      },
    ];
    inquirer.prompt(questions).then((answers) => {
      manager.editArtist(artist, answers.newName, answers.group, answers.genre, answers.albums, answers.songs);
      promptArtists();
    });
  });
}

enum visualizationMode {
  byTitle = 'Ver por titulo de cancion',
  byName = 'Ver por nombre de album',
  byPlaylist = 'Ver por pleylists asociadas',
}

function prompShowData() {
  console.clear();

  inquirer.prompt({
    type: 'list',
    name: 'artist',
    message: 'Escoja el artista que quiere ver:',
    choices: manager.getList(),
  }).then((answers) => {
    let artist: Artist = manager.searchByName(answers.artist);
    inquirer.prompt({
      type: 'list',
      name: 'visualization',
      message: 'Que quiere ver',
      choices: Object.values(visualizationMode),
    }).then((answers) => {
      let showArtist: ArtistShow = new ArtistShow(artist);
      switch (answers['visualization']) {
        case visualizationMode.byTitle:
          promptShowSongs(showArtist);
          break;
        case visualizationMode.byName:
          promptShowAlbums(showArtist);
          break;
        case visualizationMode.byPlaylist:
          promptShowPleyList(showArtist);
          break;
        default:
          promptArtists();
          break;
      }
    });
  });
}

enum modeShowSong {
  title = 'Mostrar canciones por titulo',
  repro = 'Mostrar por numero de reproducciones',
  single = 'Mostrar solo los singles'
}

function promptShowSongs(artist: ArtistShow) {
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
              artist.showSongsOrder();
              break;
            case 'Descendente':
              artist.showSongsOrder(false);
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
              artist.showByReproductions();
              break;
            case 'Descendente':
              artist.showByReproductions(false);
              break;
          }
        });
        break;
      case modeShowSong.single:
        artist.showSingles();
        break;
    }
  });
}

enum modeShowAlbum {
  name = 'Mostrar albunes por nombre',
  year = 'Mostrar por año de lanzamiento',
}

function promptShowAlbums(artist: ArtistShow) {
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
              artist.showAlbumOrder();
              break;
            case 'Descendente':
              artist.showAlbumOrder(false);
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
              artist.showAlbumYearOrder();
              break;
            case 'Descendente':
              artist.showAlbumYearOrder(false);
              break;
          }
        });
        break;
    }
  });
}

enum modeShowPleyList {
  name = 'Mostrar playlist por nombre',
}

function promptShowPleyList(artist: ArtistShow) {
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
              artist.showPlayListAsociate();
              break;
            case 'Descendente':
              artist.showPlayListAsociate();
              break;
          }
        });
        break;
    }
  });
}