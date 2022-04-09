import * as inquirer from 'inquirer';
import {Order, Playlist} from '../Basics/Playlist';
import {Song} from '../Basics/Song';
import {PlaylistManager} from '../Managers/PlaylistManager';
import {SongManager} from '../Managers/SongManager';
import {promptUser} from './MainMenu';

export function promptPlaylists(): void {
  const manager: PlaylistManager = PlaylistManager.getPlaylistManager();
  let options: string[] = ['Nueva playlist +'];
  options = options.concat(manager.getList());
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Playlists',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Nueva playlist +':
        promptAddPlaylist();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        let playlist: Playlist = manager.searchByName(answers['command']);
        promptPlaylist(playlist);
        break;
    }
  });
}

function promptPlaylist(playlist: Playlist, order: Order = 0): void {
  console.clear();
  playlist.showInfo(order);
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Ordenar canciones', 'Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Ordenar canciones':
        promptSelectOrder(playlist);
        break;
      case 'Editar':
        promptEditPlaylist(playlist);
        break;
      case 'Eliminar':
        promptRemovePlaylist(playlist);
        break;
      default:
        promptPlaylists();
        break;
    }
  },
  );
}

export function promptSelectOrder(playlist: Playlist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: [
      'Alfabéticamente por título ascendente',
      'Alfabéticamente por título descendente',
      'Alfabéticamente por nombre del grupo/artista ascendente',
      'Alfabéticamente por nombre del grupo/artista descendente',
      'Por fecha de lanzamiento ascendente',
      'Por fecha de lanzamiento descendente',
      'Por duración ascendente',
      'Por duración descendente',
      'Alfabéticamente por género músical principal ascendente',
      'Alfabéticamente por género músical principal descendente',
      'Por número de reproducciones ascendente',
      'Por número de reproducciones descendente',
      'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Alfabéticamente por título ascendente':
        promptPlaylist(playlist, 0);
        break;
      case 'Alfabéticamente por título descendente':
        promptPlaylist(playlist, 1);
        break;
      case 'Alfabéticamente por nombre del grupo/artista ascendente':
        promptPlaylist(playlist, 2);
        break;
      case 'Alfabéticamente por nombre del grupo/artista descendente':
        promptPlaylist(playlist, 3);
        break;
      case 'Por fecha de lanzamiento ascendente':
        promptPlaylist(playlist, 4);
        break;
      case 'Por fecha de lanzamiento descendente':
        promptPlaylist(playlist, 5);
        break;
      case 'Por duración ascendente':
        promptPlaylist(playlist, 6);
        break;
      case 'Por duración descendente':
        promptPlaylist(playlist, 7);
        break;
      case 'Alfabéticamente por género músical principal ascendente':
        promptPlaylist(playlist, 8);
        break;
      case 'Alfabéticamente por género músical principal descendente':
        promptPlaylist(playlist, 9);
        break;
      case 'Por número de reproducciones ascendente':
        promptPlaylist(playlist, 10);
        break;
      case 'Por número de reproducciones descendente':
        promptPlaylist(playlist, 11);
        break;
      default:
        promptPlaylist(playlist);
        break;
    }
  },
  );
}

function promptRemovePlaylist(playlist: Playlist) {
  const manager: PlaylistManager = PlaylistManager.getPlaylistManager();
  console.clear();
  if (!playlist.getSystemPlaylist()) {
    inquirer
        .prompt([
          {
            name: 'eliminar',
            type: 'confirm',
            message: '¿Seguro que quieres eliminar esta playlist?',
          },
        ])
        .then((answer) => {
          if (answer.eliminar) manager.removePlaylist(playlist);
          promptPlaylists();
        });
  } else {
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Error: no se pueden eliminar playlists creadas por el sistema',
      choices: ['Volver'],
    }).then((answers) => {
      promptPlaylist(playlist);
    },
    );
  }
}

function promptAddPlaylist(): void {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Desde 0', 'A partir de una playlist pre-existente', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Desde 0':
        promptAddNewPlaylist();
        break;
      case 'A partir de una playlist pre-existente':
        promptSelectPreexistingPlaylist();
        break;
      default:
        promptPlaylists();
        break;
    }
  },
  );
}


function promptSelectPreexistingPlaylist(): void {
  const manager: PlaylistManager = PlaylistManager.getPlaylistManager();
  let options: string[] = manager.getList();
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Playlists',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Volver':
        promptAddPlaylist();
        break;
      default:
        let playlist: Playlist = manager.searchByName(answers['command']);
        promptAddPlaylistFromPreexisting(playlist);
        break;
    }
  });
}

function promptAddPlaylistFromPreexisting(playlist: Playlist) {
  const manager: PlaylistManager = PlaylistManager.getPlaylistManager();
  const songs: string[] = SongManager.getSongManager().getList();
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre de la playlist:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value)) {
          val = 'Error: ya existe un género con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige canciones:',
      name: 'songs',
      choices: songs,
      default: playlist.getSongsNames(),
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
    answers.songs.forEach((element: string) => {
      songs.push(SongManager.getSongManager().getSongByName(element) as Song);
    });
    manager.addPlaylist(new Playlist(answers.name, songs));
    manager.storePlaylists();
    promptPlaylists();
  });
}


function promptAddNewPlaylist(): void {
  const manager: PlaylistManager = PlaylistManager.getPlaylistManager();
  const songs: string[] = SongManager.getSongManager().getList();
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre de la playlist:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value)) {
          val = 'Error: ya existe una playlist con ese nombre.';
        }
        return val;
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
    let songs: Song[] = [];
    answers.songs.forEach((element: string) => {
      songs.push(SongManager.getSongManager().getSongByName(element) as Song);
    });
    manager.addPlaylist(new Playlist(answers.name, songs));
    promptPlaylists();
  });
}

function promptEditPlaylist(playlist: Playlist): void {
  const manager: PlaylistManager = PlaylistManager.getPlaylistManager();
  const songs: string[] = SongManager.getSongManager().getList();
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre de la playlist:',
      default: playlist.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value, playlist)) {
          val = 'Error: ya existe un género con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige canciones:',
      name: 'songs',
      choices: songs,
      default: playlist.getSongsNames(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una canción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    playlist.setName(answers.name);
    let songs: Song[] = [];
    answers.songs.forEach((element: string) => {
      songs.push(SongManager.getSongManager().getSongByName(element) as Song);
    });
    playlist.setSongs(songs);
    manager.storePlaylists();
    promptPlaylists();
  });
}