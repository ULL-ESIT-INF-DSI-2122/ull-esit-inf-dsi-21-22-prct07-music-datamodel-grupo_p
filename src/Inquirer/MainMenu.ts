/* eslint-disable no-unused-vars */
import * as inquirer from 'inquirer';
import {AlbumManager} from '../Managers/AlbumManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {GenreManager} from '../Managers/GenreManager';
import {GroupManager} from '../Managers/GroupManager';
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
AlbumManager.getAlbumManager();
ArtistManager.getArtistManager();
GroupManager.getGroupManager();
GenreManager.getGenreManager();
PlaylistManager.getPlaylistManager();
promptUser();