import * as inquirer from 'inquirer';
import {Genre} from '../Basics/Genre';
import {Song} from '../Basics/Song';
import {GenreManager} from '../Managers/GenreManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {Album} from '../Basics/Album';
import {promptUser} from './MainMenu';
import {SongManager} from '../Managers/SongManager';
import {Playlist} from '../Basics/Playlist';
import {promptSelectOrder} from './PlaylistsMenu';

export function promptAlbumPrincipal(): void {
  const manager: AlbumManager = AlbumManager.getAlbumManager();
  let options: string[] = ['Nuevo Album'];
  options = options.concat(manager.getList());
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Albunes',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Nuevo Album':
        promptAddAlbum();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        const album: Album = manager.searchByName(answers['command']);
        promptAlbum(album);
        break;
    }
  });
}

function promptAlbum(album: Album): void {
  let p: Playlist;
  console.clear();
  album.print();
  inquirer.prompt({
    type: 'rawlist',
    name: 'command',
    message: 'Opciones',
    choices: ['Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Editar':
        promptEditAlbum(album);
        break;
      case 'Eliminar':
        promptRemoveSong(album);
        /*
        ArtistsManager.getArtistsManager().removeGenre(genre);
        GroupsManager.getGroupsManager().removeGenre(genre);
        AlbumsManager.getAlbumsManager().removeGenre(genre);
        SongsManager.getSongsManager().removeGenre(genre);
        PlaylistsManager.getPlaylistsManager().updateGenre();
        */
        break;
      default:
        promptAlbumPrincipal();
        break;
    }
  },
  );
}

function promptRemoveSong(album: Album) {
  const manager: AlbumManager = AlbumManager.getAlbumManager();
  console.clear();
  inquirer
      .prompt([
        {
          name: 'eliminar',
          type: 'confirm',
          message: '¿Seguro que quieres eliminar este album?',
        },
      ])
      .then((answer) => {
        if (answer.eliminar) manager.removeAlbum(album);
        promptAlbumPrincipal();
      });
}

function promptAddAlbum(): void {
  let d: Date = new Date;
  const manager: AlbumManager = AlbumManager.getAlbumManager();
  const musicians: string[] = ['Rolling Stones', 'Michael Jackson'];
  const song: SongManager = SongManager.getSongManager();
  const genres: GenreManager = GenreManager.getGenreManager();
  // const genre: string[] = GenresManager.getGenresManager().getList();
  /*
  let musicians: string[] = ArtistsManager.getArtistsManager().getList();
  musicians = musicians.concat(GroupsManager.getGroupsManager().getList());
  const albums: string[] = AlbumsManager.getAlbumsManager().getList();
  const songs: string[] = SongsManager.getSongsManager().getList();
  */
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre del album:',
      validate(answer: string) {
        if (answer.length === null) {
          return 'Debes elegir al menos un género.';
        }
        return true;
      },
      // validate(value: string) {
      //   let val: boolean | string = true;
      //   if (manager.exists(value)) {
      //     val = 'Error: ya existe un género con ese nombre.';
      //   }
      //   return val;
      // },
    },
    {
      type: 'list',
      message: '¿Nombre del artista o grupo?:',
      name: 'musicians',
      choices: musicians,
      validate(answer: string) {
        if (answer.length < 1) {
          return 'Debes introducir el nombre del artisto o grupo.';
        }
        return true;
      },
    },
    {
      type: 'number',
      message: 'Año de publicación:',
      name: 'publication',
      validate(answer: number) {
        if (answer === null) {
          return 'Debes introducir el año de publicación';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige un/unos de los géneros:',
      name: 'genre',
      choices: genres.getList(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un género.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: '¿Selecciona las canciones?',
      name: 'songs',
      choices: song.getList(),
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    const newAlbum: Album = new Album(answers.name, answers.musicians, answers.publication, answers.genre, answers.songs);
    manager.addAlbum(newAlbum);
    /*
    ArtistsManager.getArtistsManager().updateGenre(newGenre, answers.musicians);
    GroupsManager.getGroupsManager().updateGenre(newGenre, answers.musicians);
    AlbumsManager.getAlbumsManager().updateGenre(newGenre, answers.albums);
    SongsManager.getSongsManager().updateGenre(newGenre, answers.songs);
    PlaylistsManager.getPlaylistsManager().updateGenre();
    */
    promptAlbumPrincipal();
  });
}

function promptEditAlbum(album: Album): void {
  const manager: AlbumManager = AlbumManager.getAlbumManager();
  const musicians: string[] = ['Rolling Stones', 'Michael Jackson'];
  // const songs: string[] = ['Imagine', 'Despacito'];
  let genreList: string[] = GenreManager.getGenreManager().getList();
  let songs: string[] = SongManager.getSongManager().getList();
  /*
  let musicians: string[] = ArtistsManager.getArtistsManager().getList();
  musicians = musicians.concat(GroupsManager.getGroupsManager().getList());
  const albums: string[] = AlbumsManager.getAlbumsManager().getList();
  const songs: string[] = SongsManager.getSongsManager().getList();
  */
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nuevo nombre del álbum:',
      default: album.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value)) {
          val = 'Error: ya existe un álbum con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige artistas/grupos:',
      name: 'musicians',
      choices: musicians,
      default: 'musicians',
    },
    {
      type: 'input',
      message: 'Nuevo año de publicación:',
      name: 'publication',
      default: album.getYear(),
    },
    {
      type: 'checkbox',
      message: 'Elige el o los nuevos géneros:',
      name: 'genre',
      choices: genreList,
      default: album.getGenres(),
    },
    {
      type: 'checkbox',
      message: 'Elige las canciones que quieres añadir:',
      name: 'songs',
      choices: songs,
      default: album.getSongs(),
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    album.setName(answers.name);
    album.setPublisher(answers.musicians);
    album.setYear(answers.publication);
    album.setGenres(answers.genre);
    manager.store();
    promptAlbumPrincipal();
  });
}