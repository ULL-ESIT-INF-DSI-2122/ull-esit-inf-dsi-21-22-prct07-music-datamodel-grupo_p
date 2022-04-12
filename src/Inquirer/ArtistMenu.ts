/* eslint-disable no-unused-vars */
import * as inquirer from 'inquirer';
import {Artist} from '../Basics/Artist';
import {Album} from '../Basics/Album';
import {Song} from '../Basics/Song';
import {ArtistManager} from '../Managers/ArtistManager';
import {SongManager} from '../Managers/SongManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {GenreManager} from '../Managers/GenreManager';
import {promptUser} from './MainMenu';
import {GroupManager} from '../Managers/GroupManager';
const promptStop = require('prompt-sync')();

const manager = ArtistManager.getArtistManager();
const songs: string[] = SongManager.getSongManager().getList();
const albums: string[] = AlbumManager.getAlbumManager().getList();
const genres: string[] = GenreManager.getGenreManager().getList();
const groups: string[] = GroupManager.getGroupManager().getList();


export function promptArtists(): void {
  let options: string[] = ['Nuevo artista +'];
  options = options.concat(manager.getList());
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Artistas',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Nuevo artista +':
        promptAddArtist();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        const artist: Artist = manager.searchByName(answers['command']);
        promptArtist(artist);
        break;
    }
  });
}

enum options {
  Show = 'Mostrar información',
  Revove = 'Eliminar',
  Edit = 'Editar',
  Back = 'Volver'
}

export function promptArtist(artist: Artist): void {
  console.clear();
  artist.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: Object.values(options),
  }).then((answers) => {
    switch (answers['command']) {
      case options.Show:
        promptShowData(artist);
        break;
      case options.Edit:
        promptEditArtist(artist);
        break;
      case options.Revove:
        promptRemoveArtist(artist);
        break;
      default:
        promptArtists();
        break;
    }
  },
  );
}

function promptAddArtist(): void {
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Artist name:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value)) {
          val = 'Error: ya existe un artista con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      name: 'genre',
      message: 'Choice genre:',
      choices: genres,
      validate(value: string[]) {
        if (value.length < 1) {
          return 'Debes elegir al menos un genero';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige grupos:',
      name: 'groups',
      choices: groups,
      validate(value: string[]) {
        if (value.length < 1) {
          return 'Debes elegir al menos un grupo';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige álbums:',
      name: 'albums',
      choices: albums,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un álbum.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige canciones:',
      name: 'song',
      choices: songs,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una cancion.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    const albumsObj: Album[] = answers.albums.map((albumName: string) => AlbumManager.getAlbumManager().searchByName(albumName));
    const songsObj: Song[] = answers.song.map((songName: string) => SongManager.getSongManager().searchByName(songName));
    const newArtist: Artist = new Artist(answers.name, answers.groups, answers.genre, albumsObj, songsObj);
    manager.addArtist(newArtist);
    promptArtists();
  });
}

export function promptRemoveArtist(artist: Artist) {
  console.clear();
  inquirer.prompt([
    {
      name: 'eliminar',
      type: 'confirm',
      message: '¿Seguro que quieres eliminar este artista?',
    },
  ]).then((answer) => {
    if (answer.eliminar) {
      manager.deleteArtist(artist);
    }
    promptArtists();
  });
}

function promptEditArtist(artist: Artist): void {
  console.clear();
  const albumsNames: string[] = artist.getAlbums().map((album) => album.getName());
  const songsNames: string[] = artist.getSongs().map((song) => song.getName());

  const questions = [
    {
      type: 'input',
      name: 'newName',
      message: 'Artist new name:',
      default: artist.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        manager.getCollection().forEach((element) => {
          if (value === element.getName() && artist !== element) {
            val = 'Error: ya existe un artista con ese nombre.';
          }
        });
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige generos:',
      name: 'genre',
      choices: genres,
      default: artist.getGenres(),
    },
    {
      type: 'checkbox',
      message: 'Elige grupos:',
      name: 'groups',
      choices: groups,
      default: artist.getGroups(),
    },
    {
      type: 'checkbox',
      message: 'Elige álbums:',
      name: 'albums',
      choices: albums,
      default: albumsNames,
    },
    {
      type: 'checkbox',
      message: 'Elige canciones:',
      name: 'song',
      choices: songs,
      default: songsNames,
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    const albumsObj: Album[] = answers.albums.map((albumName: string) => AlbumManager.getAlbumManager().searchByName(albumName));
    const songsObj: Song[] = answers.song.map((songName: string) => SongManager.getSongManager().searchByName(songName));

    let newArtist: Artist = new Artist(answers.newName, answers.groups, answers.genre, albumsObj, songsObj);
    manager.editArtist(artist, newArtist);
    promptArtists();
  });
}

enum visualizationMode {
  byTitle = 'Canciones',
  byName = 'Álbumes',
  byPlaylist = 'Playlists asociadas',
  back = 'Volver'
}

function promptShowData(artist: Artist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'visualization',
    message: 'Que quiere ver',
    choices: Object.values(visualizationMode),
  }).then((answers) => {
    switch (answers['visualization']) {
      case visualizationMode.byTitle:
        promptShowSongs(artist);
        break;
      case visualizationMode.byName:
        promptShowAlbums(artist);
        break;
      case visualizationMode.byPlaylist:
        promptShowPlayList(artist);
        break;
      default:
        promptArtist(artist);
        break;
    }
  });
}

enum modeShowSong {
  title = 'Por titulo',
  repro = 'Por numero de reproducciones',
  single = 'Mostrar solo los singles',
  back = 'volver'
}

enum orden {
  asc = 'Ascendente',
  des = 'Descendente',
  back = 'Volver'
}

function promptShowSongs(artist: Artist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'mode',
    message: 'Como quiere ver los datos?',
    choices: Object.values(modeShowSong),
  }).then((answers) => {
    switch (answers['mode']) {
      case modeShowSong.title:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: Object.values(orden),
        }).then((answers) => {
          switch (answers['order']) {
            case orden.asc:
              artist.showSongsOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(artist);
              });
              break;
            case orden.des:
              artist.showSongsOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(artist);
              });
              break;
            default:
              promptShowSongs(artist);
              break;
          }
        });
        break;
      case modeShowSong.repro:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: Object.values(orden),
        }).then((answers) => {
          switch (answers['order']) {
            case orden.asc:
              artist.showByReproductions();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(artist);
              });
              break;
            case orden.des:
              artist.showByReproductions(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowSongs(artist);
              });
              break;
            default:
              promptShowSongs(artist);
              break;
          }
        });
        break;
      case modeShowSong.single:
        artist.showSingles();
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Opciones:',
          choices: ['Volver'],
        }).then((answers) => {
          promptShowSongs(artist);
        });
        break;
      default:
        promptShowData(artist);
        break;
    }
  });
}

enum modeShowAlbum {
  name = 'Por nombre',
  year = 'Por año de lanzamiento',
  back = 'Volver'
}

function promptShowAlbums(artist: Artist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'mode',
    message: 'Como quiere ver los datos?',
    choices: Object.values(modeShowAlbum),
  }).then((answers) => {
    switch (answers['mode']) {
      case modeShowAlbum.name:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: Object.values(orden),
        }).then((answers) => {
          switch (answers['order']) {
            case orden.asc:
              artist.showAlbumOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(artist);
              });
              break;
            case orden.des:
              artist.showAlbumOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(artist);
              });
              break;
            default:
              promptShowAlbums(artist);
              break;
          }
        });
        break;
      case modeShowAlbum.year:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: Object.values(orden),
        }).then((answers) => {
          switch (answers['order']) {
            case orden.asc:
              artist.showAlbumYearOrder();
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(artist);
              });
              break;
            case orden.des:
              artist.showAlbumYearOrder(false);
              inquirer.prompt({
                type: 'list',
                name: 'order',
                message: 'Opciones:',
                choices: ['Volver'],
              }).then((answers) => {
                promptShowAlbums(artist);
              });
              break;
            default:
              promptShowAlbums(artist);
              break;
          }
        });
        break;
      default:
        promptShowData(artist);
        break;
    }
  });
}


function promptShowPlayList(artist: Artist) {
  promptStop('Pulse para continuar');
  console.clear();

  inquirer.prompt({
    type: 'list',
    name: 'order',
    message: 'Orden?',
    choices: Object.values(orden),
  }).then((answers) => {
    switch (answers['order']) {
      case orden.asc:
        artist.showPlayListAsociate();
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Opciones:',
          choices: ['Volver'],
        }).then((answers) => {
          promptShowPlayList(artist);
        });
        break;
      case orden.des:
        artist.showPlayListAsociate();
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Opciones:',
          choices: ['Volver'],
        }).then((answers) => {
          promptShowPlayList(artist);
        });
        break;
      default:
        promptShowData(artist);
        break;
    }
  });
}