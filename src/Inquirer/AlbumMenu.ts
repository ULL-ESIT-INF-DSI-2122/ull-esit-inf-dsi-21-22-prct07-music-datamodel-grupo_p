import * as inquirer from 'inquirer';
import {GenreManager} from '../Managers/GenreManager';
import {AlbumManager} from '../Managers/AlbumManager';
import {Album} from '../Basics/Album';
import {promptUser} from './MainMenu';
import {SongManager} from '../Managers/SongManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {GroupManager} from '../Managers/GroupManager';
import {Song} from '../Basics/Song';


const manager: AlbumManager = AlbumManager.getAlbumManager();
const songs: string[] = SongManager.getSongManager().getList();
const genres: string[] = GenreManager.getGenreManager().getList();
const artists: string[] = ArtistManager.getArtistManager().getList();
const groups: string[] = GroupManager.getGroupManager().getList();


export function promptAlbumPrincipal(): void {
  let options: string[] = ['Nuevo Album +'];
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
      case 'Nuevo Album +':
        promptAddAlbum();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        const album: Album = manager.searchByName(answers['command']);
        album.showInfo();
        promptAlbum(album);
        break;
    }
  });
}

function promptAlbum(album: Album): void {
  console.clear();
  album.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Editar':
        promptEditAlbum(album);
        break;
      case 'Eliminar':
        promptRemoveAlbum(album);
        break;
      default:
        promptAlbumPrincipal();
        break;
    }
  },
  );
}

function promptRemoveAlbum(album: Album) {
  console.clear();
  inquirer.prompt([
    {
      name: 'eliminar',
      type: 'confirm',
      message: '¿Seguro que quieres eliminar este album?',
    },
  ]).then((answer) => {
    if (answer.eliminar) manager.deleteAlbum(album);
    promptAlbumPrincipal();
  });
}

function promptAddAlbum(): void {
  let musicians: string[] = artists;
  musicians = musicians.concat(groups);
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre del album:',
      validate(answer: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(answer)) {
          val = 'Ya existe una canción con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'list',
      message: '¿Nombre del artista o grupo que lo publica?:',
      name: 'musicians',
      choices: musicians,
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
      message: 'Elige los géneros:',
      name: 'genre',
      choices: genres,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un género.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Selecciona las canciones',
      name: 'songs',
      choices: songs,
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    let songs: Song[] = [];
    answers.songs.forEach((song: string) => {
      songs.push(SongManager.getSongManager().searchByName(song));
    });
    const newAlbum: Album = new Album(answers.name, answers.musicians, answers.publication, answers.genre, songs);
    manager.addAlbum(newAlbum);
    promptAlbumPrincipal();
  });
}

function promptEditAlbum(album: Album): void {
  let musicians: string[] = artists;
  musicians = musicians.concat(groups);
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nuevo nombre del álbum:',
      default: album.getName(),
    },
    {
      type: 'list',
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
      choices: genres,
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
    let songs: Song[] = [];
    answers.songs.forEach((song: string) => {
      songs.push(SongManager.getSongManager().searchByName(song));
    });
    const newAlbum: Album = new Album(answers.name, answers.musicians, answers.publication, answers.genre, songs);
    manager.editAlbum(album, newAlbum);
    promptAlbumPrincipal();
  });
}