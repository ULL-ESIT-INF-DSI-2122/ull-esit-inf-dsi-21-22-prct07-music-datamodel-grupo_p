import * as inquirer from 'inquirer';
import {Playlist} from '../Basics/Playlist';
import {Song} from '../Basics/Song';
import {PlaylistsManager} from '../Managers/PlaylistsManager';
import {SongsManager} from '../Managers/SongsManager';
import {promptUser} from './MainMenu';

export function promptPlaylists(): void {
  const manager: PlaylistsManager = PlaylistsManager.getPlaylistManager();
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

function promptPlaylist(playlist: Playlist): void {
  console.clear();
  playlist.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
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

function promptRemovePlaylist(playlist: Playlist) {
  const manager: PlaylistsManager = PlaylistsManager.getPlaylistManager();
  console.clear();
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
}

function promptAddPlaylist(): void {
  const manager: PlaylistsManager = PlaylistsManager.getPlaylistManager();
  // const songs: string[] = ['Imagine', 'Despacito'];
  const songs: string[] = SongsManager.getSongsManager().getList();
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
      songs.push(SongsManager.getSongsManager().getSongByName(element) as Song);
    });
    manager.addPlaylist(new Playlist(answers.name, songs));
    promptPlaylists();
  });
}

function promptEditPlaylist(playlist: Playlist): void {
  const manager: PlaylistsManager = PlaylistsManager.getPlaylistManager();
  // const songs: string[] = ['Imagine', 'Despacito'];
  const songs: string[] = SongsManager.getSongsManager().getList();
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
      default: playlist.getSongs(),
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
      songs.push(SongsManager.getSongsManager().getSongByName(element) as Song);
    });
    playlist.setSongs(songs);
    manager.storePlaylists();
    promptPlaylists();
  });
}