import * as inquirer from 'inquirer';
import {promptGenres} from './GenresMenu';
import {promptPlaylists} from './PlaylistMenu';
import {promptArtists} from './ArtistsMenu';
import {promptGroups} from './GroupMenu';

// require('events').EventEmitter.defaultMaxListeners = 0;

enum Commands {
    MusicGenres = 'Géneros',
    Playlists = 'Playlists',
    Artist = 'Artistas',
    Groups = 'Grupos',
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
    if (answers['command'] == Commands.Quit) {
      promptUser();
    }
    switch (answers['command']) {
      case Commands.MusicGenres:
        promptGenres();
        break;
      case Commands.Playlists:
        promptPlaylists();
        break;
      case Commands.Artist:
        promptArtists();
        break;
      case Commands.Groups:
        promptGroups();
        break;
    }
  });
}
promptUser();