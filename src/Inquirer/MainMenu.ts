/* eslint-disable no-unused-vars */
import inquirer from 'inquirer';
import {promptArtists} from './ArtistsMenu';
import {promptMusicGenres} from './MusicGenresMenu';

// require('events').EventEmitter.defaultMaxListeners = 0;

enum Commands {
    MusicGenres = 'Music Genres',
    Artist = 'Artist',
    Group = 'Group',
    Quit = 'Quit'
}
export function promptUser(): void {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose option',
    choices: ['Music Genres', 'Artist', 'Group', 'Quit'],
  }).then((answers) => {
    switch (answers['command']) {
      case Commands.MusicGenres:
        promptMusicGenres();
        break;
      case Commands.Artist:
        promptArtists();
        break;
      case Commands.Group:
        // promptGroup();
        break;
    }
  });
}

promptUser();