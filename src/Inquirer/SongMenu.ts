import * as inquirer from 'inquirer';
import {Genre} from '../Basics/Genre';
import {Duration, Song} from '../Basics/Song';
import {GenresManager} from '../Managers/GenresManager';
import {SongManager} from '../Managers/SongsManager';
import {promptUser} from './MainMenu';
import {Reproduccion} from '../Basics/Reproduccion';

export function promptSongPrincipal(): void {
  const manager: SongManager = SongManager.getSongManager();
  let options: string[] = ['Nueva canción'];
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
      case 'Nueva canción':
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
  song.print();
  inquirer.prompt({
    type: 'rawlist',
    name: 'command',
    message: 'Opciones',
    choices: ['Editar', 'Eliminar', 'Volver'],
  }).then((answers) => {
    switch (answers['command']) {
      // case 'Editar':
      //   promptEditSong(song);
      //   break;
      case 'Eliminar':
        promptRemoveSong(song);
        /*
        ArtistsManager.getArtistsManager().removeGenre(genre);
        GroupsManager.getGroupsManager().removeGenre(genre);
        AlbumsManager.getAlbumsManager().removeGenre(genre);
        SongsManager.getSongsManager().removeGenre(genre);
        PlaylistsManager.getPlaylistsManager().updateGenre();
        */
        break;
      default:
        promptSongPrincipal();
        break;
    }
  },
  );
}

function promptRemoveSong(song: Song) {
  const manager: SongManager = SongManager.getSongManager();
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
        if (answer.eliminar) manager.removeSong(song);
        promptSongPrincipal();
      });
}

/**
 * prompt para agregar musica
 */
function promptAddSong(): void {
  const manager: SongManager = SongManager.getSongManager();
  const musicians: string[] = ['Rolling Stones', 'Michael Jackson'];
  const genres: GenresManager = GenresManager.getGenresManager();
  /*
  let musicians: string[] = ArtistsManager.getArtistsManager().getList();
  musicians = musicians.concat(GroupsManager.getGroupsManager().getList());
  const songs: string[] = SongsManager.getSongsManager().getList();
  */
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre de la canción:',
      validate(answer: string) {
        if (answer === null) {
          return 'Debes elegir al menos un género.';
        }
        return true;
      },
    },
    {
      type: 'input',
      message: '¿Nombre del artista o grupo?:',
      name: 'musician',
      validate(answer: string) {
        if (answer === null) {
          return 'Debes introducir el nombre del artisto o grupo.';
        }
        return true;
      },
    },
    {
      type: 'input',
      message: 'Duración de la canción:',
      name: 'duration',
      default: '2:05',
      validate(answer: string) {
        if (answer != null) {
        return true;
        }
        return 'debes introducir la duración';
      },
    },
    {
      type: 'input',
      message: 'Fecha de publicación:',
      name: 'publication',
      default: '01-01-2000',
      validate(answer: string) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un género.';
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
      type: 'list',
      message: '¿La canción es single?',
      name: 'single',
      choices: [true, false],
    },
    {
      type: 'input',
      message: 'Reproduccioines de la canción',
      name: 'reproduction',
      default: '01-01-2000, 01-02-2000, 01-02-2000',
      validate(answer: string) {
        if (answer.length < 1) {
          return 'Al menos una fecha de reproducción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    // Conviertiendo al tipo Date
    let datePublication: Date = new Date(answers.publication);
    // Convirtiendo al tipo duracion
    let durationSongString: string = answers.duration;
    let durationSong: number[]= (durationSongString.split(':', durationSongString.length)).map((index) => {
        return +index;
    });
    let durationSongFinal: Duration = [durationSong[0], durationSong[1]];
    // Convirtiendo array de reproduccions al tipo reproducción
    let reproductionSongString: string = answers.reproduction;
    let reproductions: Reproduccion[] = (reproductionSongString.split(',', reproductionSongString.length)).map(function(index) {
      return new Reproduccion(new Date(index));
  });
    // inicializando canción
    const newSong: Song = new Song(answers.name, answers.musician, durationSongFinal,
        answers.genre, datePublication, answers.single, reproductions);
    manager.addSong(newSong);
    promptSongPrincipal();
  });
}

// function promptEditSong(genre: Genre): void {
//   const manager: GenresManager = GenresManager.getGenresManager();
//   const musicians: string[] = ['Rolling Stones', 'Michael Jackson'];
//   const albums: string[] = ['Threaller', 'Abbey Road'];
//   const songs: string[] = ['Imagine', 'Despacito'];
//   /*
//   let musicians: string[] = ArtistsManager.getArtistsManager().getList();
//   musicians = musicians.concat(GroupsManager.getGroupsManager().getList());
//   const albums: string[] = AlbumsManager.getAlbumsManager().getList();
//   const songs: string[] = SongsManager.getSongsManager().getList();
//   */
//   console.clear();
//   const questions = [
//     {
//       type: 'input',
//       name: 'name',
//       message: 'Nombre del género:',
//       default: genre.getName(),
//       validate(value: string) {
//         let val: boolean | string = true;
//         if (manager.anotherOneWithThatName(value, genre)) {
//           val = 'Error: ya existe un género con ese nombre.';
//         }
//         return val;
//       },
//     },
//     {
//       type: 'checkbox',
//       message: 'Elige artistas/grupos:',
//       name: 'musicians',
//       choices: musicians,
//       default: genre.getMusicians(),
//       validate(answer: string[]) {
//         if (answer.length < 1) {
//           return 'Debes elegir al menos un artista/grupo';
//         }
//         return true;
//       },
//     },
//     {
//       type: 'checkbox',
//       message: 'Elige álbums:',
//       name: 'albums',
//       choices: albums,
//       default: genre.getAlbums(),
//       validate(answer: string[]) {
//         if (answer.length < 1) {
//           return 'Debes elegir al menos un álbum.';
//         }
//         return true;
//       },
//     },
//     {
//       type: 'checkbox',
//       message: 'Elige canciones:',
//       name: 'songs',
//       choices: songs,
//       default: genre.getSongs(),
//       validate(answer: string[]) {
//         if (answer.length < 1) {
//           return 'Debes elegir al menos una canción.';
//         }
//         return true;
//       },
//     },
//   ];
//   inquirer.prompt(questions).then((answers) => {
//     genre.setName(answers.name);
//     genre.setMusicians(answers.musicians);
//     genre.setAlbums(answers.albums);
//     genre.setSongs(answers.songs);
//     manager.storeGenres();
//     /*
//     ArtistsManager.getArtistsManager().updateGenre(newGenre, answers.musicians);
//     GroupsManager.getGroupsManager().updateGenre(newGenre, answers.musicians);
//     AlbumsManager.getAlbumsManager().updateGenre(newGenre, answers.albums);
//     SongsManager.getSongsManager().updateGenre(newGenre, answers.songs);
//     PlaylistsManager.getPlaylistsManager().updateGenre();
//     */
//     promptGenres();
//   });
// }
