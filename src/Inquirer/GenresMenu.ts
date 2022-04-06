import * as inquirer from 'inquirer';
import {Genre} from '../Basics/Genre';
import {GenresManager} from '../Managers/GenresManager';
import {promptUser} from './MainMenu';

export function promptGenres(): void {
  const manager: GenresManager = GenresManager.getGenresManager();
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

function promptGenre(genre: Genre): void {
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
        /*
        ArtistsManager.getArtistsManager().removeGenre(genre);
        GroupsManager.getGroupsManager().removeGenre(genre);
        AlbumsManager.getAlbumsManager().removeGenre(genre);
        SongsManager.getSongsManager().removeGenre(genre);
        PlaylistsManager.getPlaylistsManager().updateGenre();
        */
        break;
      default:
        promptGenres();
        break;
    }
  },
  );
}

function promptRemoveGenre(genre: Genre) {
  const manager: GenresManager = GenresManager.getGenresManager();
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
        if (answer.eliminar) manager.removeGenre(genre);
        promptGenres();
      });
}

function promptAddGenre(): void {
  const manager: GenresManager = GenresManager.getGenresManager();
  const musicians: string[] = ['Rolling Stones', 'Michael Jackson'];
  const albums: string[] = ['Threaller', 'Abbey Road'];
  const songs: string[] = ['Imagine', 'Despacito'];
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
    const newGenre: Genre = new Genre(answers.name, answers.musicians,
        answers.albums, answers.songs);
    manager.addGenre(newGenre);
    /*
    ArtistsManager.getArtistsManager().updateGenre(newGenre, answers.musicians);
    GroupsManager.getGroupsManager().updateGenre(newGenre, answers.musicians);
    AlbumsManager.getAlbumsManager().updateGenre(newGenre, answers.albums);
    SongsManager.getSongsManager().updateGenre(newGenre, answers.songs);
    PlaylistsManager.getPlaylistsManager().updateGenre();
    */
    promptGenres();
  });
}

function promptEditGenre(genre: Genre): void {
  const manager: GenresManager = GenresManager.getGenresManager();
  const musicians: string[] = ['Rolling Stones', 'Michael Jackson'];
  const albums: string[] = ['Threaller', 'Abbey Road'];
  const songs: string[] = ['Imagine', 'Despacito'];
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
      default: genre.getMusicians(),
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
      default: genre.getAlbums(),
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
      default: genre.getSongs(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una canción.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    genre.setName(answers.name);
    genre.setMusicians(answers.musicians);
    genre.setAlbums(answers.albums);
    genre.setSongs(answers.songs);
    manager.storeGenres();
    /*
    ArtistsManager.getArtistsManager().updateGenre(newGenre, answers.musicians);
    GroupsManager.getGroupsManager().updateGenre(newGenre, answers.musicians);
    AlbumsManager.getAlbumsManager().updateGenre(newGenre, answers.albums);
    SongsManager.getSongsManager().updateGenre(newGenre, answers.songs);
    PlaylistsManager.getPlaylistsManager().updateGenre();
    */
    promptGenres();
  });
}