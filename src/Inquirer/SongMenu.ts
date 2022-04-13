import * as inquirer from 'inquirer';
import {Duration, Song} from '../Basics/Song';
import {SongManager} from '../Managers/SongManager';
import {promptUser} from './MainMenu';
import {GenreManager} from '../Managers/GenreManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {GroupManager} from '../Managers/GroupManager';


const manager: SongManager = SongManager.getSongManager();
const genres: string[] = GenreManager.getGenreManager().getList();
const artists: string[] = ArtistManager.getArtistManager().getList();
const groups: string[] = GroupManager.getGroupManager().getList();

export function promptSongPrincipal(): void {
  const manager: SongManager = SongManager.getSongManager();
  let options: string[] = ['Nueva canción +'];
  options = options.concat(manager.getList());
  options.push('Volver');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Canciones',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Nueva canción +':
        promptAddSong();
        break;
      case 'Volver':
        promptUser();
        break;
      default:
        const song: Song = manager.searchByName(answers['command']);
        promptSong(song);
        break;
    }
  });
}

function promptSong(song: Song): void {
  console.clear();
  song.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Opciones',
    choices: ['Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Editar':
        promptEditSong(song);
        break;
      case 'Eliminar':
        promptRemoveSong(song);
        break;
      default:
        promptSongPrincipal();
        break;
    }
  },
  );
}

function promptRemoveSong(song: Song) {
  console.clear();
  inquirer.prompt([
    {
      name: 'eliminar',
      type: 'confirm',
      message: '¿Seguro que quieres eliminar esta canción?',
    },
  ]).then((answer) => {
    if (answer.eliminar) manager.removeSong(song);
    promptSongPrincipal();
  });
}

/**
 * prompt para agregar musica
 */
function promptAddSong(): void {
  let musicians: string[] = artists;
  musicians = musicians.concat(groups);
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre de la canción:',
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
      name: 'author',
      message: '¿Nombre del artista o grupo?:',
      choices: musicians,
    },
    {
      type: 'input',
      message: 'Duración de la canción:',
      name: 'duration',
      default: '0:00',
      validate(answer: string) {
        if (answer != null) {
          return true;
        }
        return 'debes introducir la duración';
      },
    },
    {
      type: 'checkbox',
      message: 'Elige un/unos de los géneros:',
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
      type: 'input',
      message: 'Fecha de publicación:',
      name: 'publication',
      default: '2000-03-20',
      validate(answer: string) {
        if (answer != null) {
          return true;
        }
        return 'Debes poner fecha.';
      },
    },
    {
      type: 'checkbox',
      message: '¿La canción es single?',
      name: 'single',
      choices: ['Sí', 'No'],
    },
    {
      type: 'number',
      message: 'Reproducciones de la canción',
      name: 'reproduction',
      default: '1000',
      validate(answer: string) {
        if (answer.length < 1) {
          return 'Al menos una fecha de reproducción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    // conviertiendo date
    let datePublication: Date = new Date(answers.publication);
    // Convirtiendo al tipo duracion
    let durationSongString: string = answers.duration;
    let durationSong: number[]= (durationSongString.split(':', durationSongString.length)).map((index) => {
      return +index;
    });
    let durationSongFinal: Duration = [durationSong[0], durationSong[1]];
    let isSingle: boolean;
    if (answers.single = 'Sí') {
      isSingle = true;
    } else {
      isSingle = false;
    }
    // inicializando canción
    const newSong: Song = new Song(answers.name, answers.author, durationSongFinal,
        answers.genre, datePublication, isSingle, answers.reproduction);
    manager.addSong(newSong);
    promptSongPrincipal();
  });
}


/**
 * Edita la canción especificada
 * @param song de tipo Song
 */
function promptEditSong(song: Song): void {
  let musicians: string[] = artists;
  musicians = musicians.concat(groups);
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nuevo nombre de la canción:',
      default: song.getName(),
    },
    {
      type: 'list',
      name: 'author',
      message: 'Nombre del author:',
      choices: musicians,
      default: song.getAuthorName(),
    },
    {
      type: 'input',
      message: 'Duración:',
      name: 'duration',
      default: song.getDuration(),
    },
    {
      type: 'checkbox',
      message: 'Elige los géneros:',
      name: 'genres',
      choices: genres,
      default: song.getGenres(),
    },
    {
      type: 'checkbox',
      message: '¿La canción es single?',
      name: 'single',
      choices: ['Sí', 'No'],
      default: (song.getIsSingle() ? 'Si' : 'No'),
    },
    {
      type: 'input',
      message: 'Reproducciones',
      name: 'reproductions',
      default: song.getReproductions(),
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    // conviertiendo date
    let datePublication: Date = new Date(answers.publication);
    // Convirtiendo al tipo duracion
    let durationSongString: string = answers.duration;
    let durationSong: number[]= (durationSongString.split(':', durationSongString.length)).map((index) => {
      return +index;
    });
    let durationSongFinal: Duration = [durationSong[0], durationSong[1]];
    let isSingle: boolean;
    if (answers.single = 'Sí') {
      isSingle = true;
    } else {
      isSingle = false;
    }
    manager.editSong(song, answers.name, answers.author, durationSongFinal, answers.genres,
        datePublication, isSingle, answers.reproductions);
    promptSongPrincipal();
  });
}
