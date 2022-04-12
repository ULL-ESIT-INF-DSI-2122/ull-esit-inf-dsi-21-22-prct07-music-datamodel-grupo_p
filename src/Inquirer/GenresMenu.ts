import * as inquirer from 'inquirer';
import {Album} from '../Basics/Album';
import {Artist} from '../Basics/Artist';
import {Genre} from '../Basics/Genre';
import {Group} from '../Basics/Group';
import {Song} from '../Basics/Song';
import {AlbumManager} from '../Managers/AlbumManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {GenreManager} from '../Managers/GenreManager';
import {GroupManager} from '../Managers/GroupManager';
import {SongManager} from '../Managers/SongManager';
import {promptUser} from './MainMenu';

/**
 * Despliega el menú de los géneros.
 */
export function promptGenres(): void {
  const manager: GenreManager = GenreManager.getGenreManager();
  let options: string[] = ['Nuevo género +'];
  options = options.concat(manager.getList());
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Géneros',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Nuevo género +':
        promptAddGenre();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        const genre: Genre = manager.searchByName(answers['command']);
        promptGenre(genre);
        break;
    }
  });
}

/**
 * Despliega el menú de un género en concreto.
 * @param genre Género del cuál se despliega el menú.
 */
export function promptGenre(genre: Genre): void {
  console.clear();
  genre.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Editar':
        promptEditGenre(genre);
        break;
      case 'Eliminar':
        promptRemoveGenre(genre);
        break;
      default:
        promptGenres();
        break;
    }
  },
  );
}

/**
 * Muestra una pregunta de confirmación para eliminar un género.
 * @param genre Género a eliminar.
 */
export function promptRemoveGenre(genre: Genre) {
  const manager: GenreManager = GenreManager.getGenreManager();
  console.clear();
  inquirer
      .prompt([
        {
          name: 'eliminar',
          type: 'confirm',
          message: '¿Seguro que quieres eliminar este género?',
        },
      ])
      .then((answer) => {
        if (answer.eliminar) {
          manager.deleteGenre(genre);
        }
        promptGenres();
      });
}

/**
 * Despliega el menú para crear un nuevo género.
 */
export function promptAddGenre(): void {
  const manager: GenreManager = GenreManager.getGenreManager();
  const artists: string[] = ArtistManager.getArtistManager().getList();
  const groups: string[] = GroupManager.getGroupManager().getList();
  const musicians = artists.concat(groups);
  const albums: string[] = AlbumManager.getAlbumManager().getList();
  const songs: string[] = SongManager.getSongManager().getList();
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre del género:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value)) {
          val = 'Error: ya existe un género con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige artistas/grupos:',
      name: 'musicians',
      choices: musicians,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un artista/grupo';
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
      name: 'songs',
      choices: songs,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una canción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    let musicians: (Group|Artist)[] = [];
    let albums: Album[] = [];
    let songs: Song[] = [];
    answers.musicians.forEach((m: string) => {
      if (artists.indexOf(m) !== -1) {
        musicians.push(ArtistManager.getArtistManager().searchByName(m));
      } else {
        musicians.push(GroupManager.getGroupManager().searchByName(m));
      }
    });
    answers.albums.forEach((a: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(a));
    });
    answers.songs.forEach((s: string) => {
      songs.push(SongManager.getSongManager().searchByName(s));
    });
    const newGenre: Genre = new Genre(answers.name, musicians, albums, songs);
    manager.store();
    manager.addGenre(newGenre);
    promptGenres();
  });
}

/**
 * Despliega el menú para editar un género.
 * @param genre Género a editar.
 */
export function promptEditGenre(genre: Genre): void {
  const manager: GenreManager = GenreManager.getGenreManager();
  const artists: string[] = ArtistManager.getArtistManager().getList();
  const groups: string[] = GroupManager.getGroupManager().getList();
  const musicians = artists.concat(groups);
  const albums: string[] = AlbumManager.getAlbumManager().getList();
  const songs: string[] = SongManager.getSongManager().getList();
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre del género:',
      default: genre.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.anotherOneWithThatName(value, genre)) {
          val = 'Error: ya existe un género con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige artistas/grupos:',
      name: 'musicians',
      choices: musicians,
      default: genre.getMusiciansNames(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un artista/grupo';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige álbums:',
      name: 'albums',
      choices: albums,
      default: genre.getAlbumsNames(),
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
      name: 'songs',
      choices: songs,
      default: genre.getSongsNames(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una canción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    let musicians: (Group|Artist)[] = [];
    let albums: Album[] = [];
    let songs: Song[] = [];
    answers.musicians.forEach((m: string) => {
      if (artists.indexOf(m) !== -1) {
        musicians.push(ArtistManager.getArtistManager().searchByName(m));
      } else {
        musicians.push(GroupManager.getGroupManager().searchByName(m));
      }
    });
    answers.albums.forEach((a: string) => {
      albums.push(AlbumManager.getAlbumManager().searchByName(a));
    });
    answers.songs.forEach((s: string) => {
      songs.push(SongManager.getSongManager().searchByName(s));
    });
    /*
    genre.setName(answers.name);
    genre.setMusicians(musicians);
    genre.setAlbums(albums);
    genre.setSongs(songs);
    manager.store();*/

    // manager.updateGenre(genre, answers.songs, answers.albums, answers.musicians, answers.musicians);
    promptGenres();
  });
}