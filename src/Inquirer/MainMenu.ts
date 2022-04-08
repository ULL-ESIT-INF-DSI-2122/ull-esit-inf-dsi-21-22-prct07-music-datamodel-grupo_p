/* eslint-disable no-unused-vars */
import * as inquirer from 'inquirer';
import {GenreManager} from '../Managers/GenreManager';
import {PlaylistManager} from '../Managers/PlaylistManager';
import {SongManager} from '../Managers/SongManager';
import {promptGenres} from './GenresMenu';
import {promptPlaylists} from './PlaylistsMenu';

// require('events').EventEmitter.defaultMaxListeners = 0;

enum Commands {
    Genres = 'Géneros',
    Songs = 'Canciones',
    Playlists = 'Playlists',
    Quit = 'Salir'
}
export function promptUser(): void {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Menú principal',
    choices: Object.values(Commands),
  }).then((answers) => {
    switch (answers['command']) {
      case Commands.Genres:
        promptGenres();
        break;
      case Commands.Playlists:
        promptPlaylists();
        break;
    }
  });
}

SongManager.getSongManager();
GenreManager.getGenreManager();
PlaylistManager.getPlaylistManager();
promptUser();