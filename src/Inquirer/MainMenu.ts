/* eslint-disable no-unused-vars */
var inquirer = require('inquirer');
import {promptGenres} from './GenresMenu';
import {promptPlaylists} from './PlaylistsMenu';

// require('events').EventEmitter.defaultMaxListeners = 0;

enum Commands {
    MusicGenres = 'Géneros',
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
      case Commands.MusicGenres:
        promptGenres();
        break;
      case Commands.Playlists:
        promptPlaylists();
        break;
    }
  });
}

promptUser();