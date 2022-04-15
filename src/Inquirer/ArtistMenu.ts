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


/**
 * Album manager.
 */
const manager = ArtistManager.getArtistManager();

/**
 * Despliega el menú de los artistas.
 */
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
/**
 * Despliega el menú de un artista en concreto.
 * @param artist Artista del cuál se despliega el menú.
 */
export function promptArtist(artist: Artist): void {
  console.clear();
  artist.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Mostrar información', 'Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Mostrar información':
        promptShowData(artist);
        break;
      case 'Editar':
        promptEditArtist(artist);
        break;
      case 'Eliminar':
        promptRemoveArtist(artist);
        break;
      default:
        promptArtists();
        break;
    }
  },
  );
}

/**
 * Despliega el menú para crear un nuevo artista.
 */
function promptAddArtist(): void {
  console.clear();
  const songs: string[] = SongManager.getSongManager().getList();
  const albums: string[] = AlbumManager.getAlbumManager().getList();
  const genres: string[] = GenreManager.getGenreManager().getList();
  const groups: string[] = GroupManager.getGroupManager().getList();
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
    let albums: Album[] = [];
    answers.albums.forEach((a: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(a));
    });
    let songs: Song[] = [];
    answers.song.forEach((s: string) => {
      songs.push(SongManager.getSongManager().searchByName(s));
    });
    const newArtist: Artist = new Artist(answers.name, answers.groups, answers.genre,
        albums, songs);
    manager.addArtist(newArtist);
    promptArtists();
  });
}
/**
 * Muestra una pregunta de confirmación para eliminar un artista.
 * @param artist Artista a eliminar.
 */
export function promptRemoveArtist(artist: Artist) {
  console.clear();
  inquirer
      .prompt([
        {
          name: 'eliminar',
          type: 'confirm',
          message: '¿Seguro que quieres eliminar este artista?',
        },
      ])
      .then((answer) => {
        if (answer.eliminar) {
          manager.deleteArtist(artist);
        }
        promptArtists();
      });
}

/**
 * Despliega el menú para editar un artista.
 * @param artist Artista a editar.
 */
function promptEditArtist(artist: Artist): void {
  console.clear();
  const songs: string[] = SongManager.getSongManager().getList();
  const albums: string[] = AlbumManager.getAlbumManager().getList();
  const genres: string[] = GenreManager.getGenreManager().getList();
  const groups: string[] = GroupManager.getGroupManager().getList();
  const albumsNames: string[] = [];
  artist.getAlbums().forEach((album) => {
    albumsNames.push(album.getName());
  });
  const songsNames: string[] = [];
  artist.getSongs().forEach((song) => {
    songsNames.push(song.getName());
  });
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
      name: 'genres',
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
      name: 'songs',
      choices: songs,
      default: songsNames,
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    let albums: Album[] = [];
    answers.albums.forEach((a: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(a));
    });
    let songs: Song[] = [];
    answers.songs.forEach((s: string) => {
      songs.push(SongManager.getSongManager().searchByName(s));
    });
    manager.editArtist(artist, answers.newName, answers.groups, answers.genres, albums, songs);
    promptArtists();
  });
}
/**
 * Opciones del menú de visualizacion.
 */
enum visualizationMode {
  byTitle = 'Canciones',
  byName = 'Álbumes',
  byPlaylist = 'Playlists asociadas',
  back = 'Volver'
}
/**
 * Despliega el menú de visualización de un artista.
 * @param artist Artista del que se va a visualizar información.
 */
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

/**
 * Opciones del menú de visualización de canciones del artista.
 */
enum modeShowSong {
  title = 'Por titulo',
  repro = 'Por numero de reproducciones',
  single = 'Mostrar solo los singles',
  back = 'Volver'
}

/**
 * Despliega el menú de visualización de canciones un artista.
 * @param artist Artista del que se van a visualizar las canciones.
 */
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
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
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
            case 'Descendente':
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
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
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
            case 'Descendente':
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

/**
 * Opciones del menú de visualización de álbumes del artista.
 */
enum modeShowAlbum {
  name = 'Por nombre',
  year = 'Por año de lanzamiento',
  back = 'Volver'
}

/**
 * Despliega el menú de visualización de álbumes un artista.
 * @param artist Artista del que se van a visualizar los álbumes.
 */
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
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
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
            case 'Descendente':
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
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
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
            case 'Descendente':
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
      case modeShowAlbum.back:
        promptShowData(artist);
        break;
    }
  });
}

/**
 * Opciones del menú de visualización de playlist asociadas al artista.
 */
enum modeShowPlayList {
  name = 'Mostrar playlist asociadas',
  back = 'Volver'
}
/**
 * Despliega el menú de visualización de playlists asociadas a un artista.
 * @param artist Artista del que se van a visualizar las playlists asociadas.
 */
function promptShowPlayList(artist: Artist) {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'mode',
    message: 'Como quiere ver los datos?',
    choices: Object.values(modeShowPlayList),
  }).then((answers) => {
    switch (answers['mode']) {
      case modeShowPlayList.name:
        inquirer.prompt({
          type: 'list',
          name: 'order',
          message: 'Orden?',
          choices: ['Ascendente', 'Descendente', 'Volver'],
        }).then((answers) => {
          switch (answers['order']) {
            case 'Ascendente':
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
            case 'Descendente':
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
              promptShowPlayList(artist);
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