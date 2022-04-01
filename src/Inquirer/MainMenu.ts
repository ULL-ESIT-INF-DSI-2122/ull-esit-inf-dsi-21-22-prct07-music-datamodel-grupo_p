/* eslint-disable no-unused-vars */
import * as inquirer from 'inquirer';
import {MusicGenre} from '../Basics/MusicGenre';
import {MusicGenresManager} from '../Managers/MusicGenresManager';
import {promptMusicGenres} from './MusicGenresMenu';

// require('events').EventEmitter.defaultMaxListeners = 0;

enum Commands {
    MusicGenres = 'Music Genres',
    Quit = 'Quit'
}
export function promptUser(): void {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose option',
    choices: ['Music Genres', 'Quit'],
  }).then((answers) => {
    switch (answers['command']) {
      case Commands.MusicGenres:
        promptMusicGenres();
        break;
    }
  });
}

promptUser();