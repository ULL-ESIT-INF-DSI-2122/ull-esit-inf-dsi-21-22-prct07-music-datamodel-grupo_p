import * as inquirer from 'inquirer';
import {Artist} from '../Basics/Artist';
import {ArtistManager} from '../Managers/ArtistManager';
import {promptUser} from './MainMenu';


/*
* AÑADIR - BORRAR - MODIFICAR
*/
enum options {
  Show = 'Show Data Base',
  Add = 'Add new artist+',
  Revove = 'Delete artist',
  Edit = 'Edit artista',
  Back = 'Back'
}
const manager = ArtistManager.getArtistsManager();

export function promptArtists(): void {
  console.clear();

  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Esscoja que quiere hacer:',
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
        manager.showData();
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

  let albums: string[] = ['Threaller', 'Abbey Road'];
  let songs: string[] = ['Imagine', 'Despacito'];
  let groups: string[] = ['gru1', 'gru2', 'gru3'];
  let genres: string[]= ['g1', 'g2', 'g3'];

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
      type: 'checkbox',
      message: 'Elige canciones:',
      name: 'songs',
      choices: songs,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una canción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    const newArtist: Artist = new Artist(answers.name, answers.genre, answers.groups,
        answers.albums, answers.songs);
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
    inquirer.prompt([
      {
        name: 'remove',
        type: 'confirm',
        message: '¿Seguro que quieres eliminar este género?',
      },
    ]).then((answer) => {
      if (answer.eliminar) {
        let artist: Artist = manager.searchByName(answers.artistRemove);
        manager.removeArtist(artist);
      }
      promptArtists();
    });
  });
}

function promptEditArtist(): void {
  console.clear();

  let albums: string[] = ['Threaller', 'Abbey Road'];
  let songs: string[] = ['Imagine', 'Despacito'];
  let genres: string[]= ['g1', 'g2', 'g3'];
  let groups: string[] = ['gru1', 'gru2', 'gru3'];

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

