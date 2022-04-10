/* eslint-disable no-unused-vars */
import * as inquirer from 'inquirer';
import {Genre} from '../Basics/Genre';
import {GenresManager} from '../Managers/GenresManager';
import {promptAlbumPrincipal} from './AlbumMenu';
import {promptGenres} from './GenresMenu';
import {promptPlaylists} from './PlaylistsMenu';
import {promptSongPrincipal} from './SongMenu';


// require('events').EventEmitter.defaultMaxListeners = 0;

enum Commands {
    MusicGenres = 'Music Genres',
    Song = 'Songs',
    Albums = 'Albums',
    Playlists = 'Playlists',
    Quit = 'Quit'
}
export function promptUser(): void {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose option',
    choices: ['Music Genres', 'Songs', 'Albums', 'Playlists', 'Quit'],
  }).then((answers) => {
    switch (answers['command']) {
      case Commands.MusicGenres:
        promptGenres();
        break;
      case Commands.Albums:
        promptAlbumPrincipal();
        break;
      case Commands.Playlists:
        promptPlaylists();
        break;
      case Commands.Song:
        promptSongPrincipal();
      break;
    }
  });
}

promptUser();