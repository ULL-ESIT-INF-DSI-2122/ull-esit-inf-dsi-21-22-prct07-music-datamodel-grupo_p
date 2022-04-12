/* eslint-disable no-unused-vars */
import * as inquirer from 'inquirer';
import {AlbumManager} from '../Managers/AlbumManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {GenreManager} from '../Managers/GenreManager';
import {GroupManager} from '../Managers/GroupManager';
import {PlaylistManager} from '../Managers/PlaylistManager';
import {SongManager} from '../Managers/SongManager';
import {promptAlbumPrincipal} from './AlbumMenu';
import {promptArtists} from './ArtistMenu';
import {promptGenres} from './GenresMenu';
import {promptGroups} from './GroupsMenu';
import {promptPlaylists} from './PlaylistsMenu';
import {promptSongPrincipal} from './SongMenu';

/**
 * Enumeración de las opciones del menú principal.
 */
export enum Commands {
    Genres = 'Géneros',
    Groups = 'Grupos',
    Artists = 'Artistas',
    Albums = 'Álbumes',
    Songs = 'Canciones',
    Playlists = 'Playlists',
    Quit = 'Salir'
}
/**
 * Despliega el menú principal.
 */
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
      case Commands.Artists:
        promptArtists();
        break;
      case Commands.Groups:
        promptGroups();
        break;
      case Commands.Songs:
        promptSongPrincipal();
        break;
      case Commands.Playlists:
        promptPlaylists();
        break;
      case Commands.Albums:
        promptAlbumPrincipal();
        break;
    }
  });
}
/**
 * Inicia el programa.
 */
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