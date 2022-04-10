import * as inquirer from 'inquirer';
import {exit} from 'process';
// import {promptGenres} from './GenresMenu';
// import {promptPlaylists} from './PlaylistMenu';
import {promptArtists} from './ArtistsMenu';
import {promptGroups} from './GroupMenu';
import {AlbumManager} from '../Managers/AlbumManager';
import {SongManager} from '../Managers/SongManager';
import {GroupManager} from '../Managers/GroupManager';
import {GenreManager} from '../Managers/GenreManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {PlaylistManager} from '../Managers/PlaylistManager';
// require('events').EventEmitter.defaultMaxListeners = 0;

enum Commands {
    MusicGenres = 'Géneros',
    Playlists = 'Playlists',
    Artist = 'Artistas',
    Groups = 'Grupos',
    Songs = 'Canciones',
    Albums = 'Albunes',
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
      exit();
    }
    switch (answers['command']) {
      case Commands.MusicGenres:
        // promptGenres();
        break;
      case Commands.Playlists:
        // promptPlaylists();
        break;
      case Commands.Artist:
        promptArtists();
        break;
      case Commands.Groups:
        promptGroups();
        break;
      case Commands.Songs:
        // promptSongs();
        break;
      case Commands.Albums:
        // promptAlbum();
    }
  });
}
promptUser();

export function run():void {
  SongManager.getSongManager();
  AlbumManager.getAlbumManager();
  ArtistManager.getArtistManager();
  GroupManager.getGroupManager();
  GenreManager.getGenreManager();
  PlaylistManager.getPlaylistManager();
  promptUser();
}

run();