import * as inquirer from 'inquirer';
import {MusicGenre} from '../Clases base/MusicGenre';
import {MusicGenresManager} from '../Managers/MusicGenresManager';
import {promptUser} from './MainMenu';

export function promptMusicGenres(): void {
  const manager = MusicGenresManager.getMusicGenresManager();
  let options: string[] = ['Add new genre +'];
  // options.concat(manager.getList());
  manager.getCollection().forEach((element) => {
    options.push(element.getName());
  });
  options.push('Back');
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose option',
    choices: options,
  }).then((answers) => {
    switch (answers['command']) {
      case 'Add new genre +':
        promptAddGenre();
        break;
      case 'Back':
        promptUser();
        break;
      default:
        let genre: MusicGenre = manager.searchByName(answers['command']);
        promptGenre(genre);
        break;
    }
  });
}

function promptGenre(genre: MusicGenre): void {
  const manager = MusicGenresManager.getMusicGenresManager();
  console.clear();
  genre.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose option',
    choices: ['Edit', 'Remove', 'Back'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Edit':
        promptEditGenre(genre);
        break;
      case 'Remove':
        manager.removeMusicGenre(genre);
        /*
        ArtistsManager.getArtistsManager().removeGenre(genre);
        GroupsManager.getGroupsManager().removeGenre(genre);
        AlbumsManager.getAlbumsManager().removeGenre(genre);
        SongsManager.getSongsManager().removeGenre(genre);
        */
        promptMusicGenres();
        break;
      default:
        promptMusicGenres();
        break;
    }
  },
  );
}

function promptAddGenre(): void {
  const manager = MusicGenresManager.getMusicGenresManager();
  let musicians: string[] = ['Rolling Stones', 'Michael Jackson'];
  let albums: string[] = ['Threaller', 'Abbey Road'];
  let songs: string[] = ['Imagine', 'Despacito'];
  /*
  let musicians: string[] = ArtistsManager.getArtistsManager().getList();
  musicians.concat(GroupsManager.getGroupsManager().getList());
  let albums: string[] = AlbumsManager.getAlbumsManager().getList();
  let songs: string[] = SongsManager.getSongsManager().getList();
  */
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Genre\'s name:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.exists(value)) {
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
    const newGenre: MusicGenre = new MusicGenre(answers.name, answers.musicians,
        answers.albums, answers.songs);
    manager.addMusicGenre(newGenre);
    /*
    ArtistsManager.getArtistsManager().updateGenre(newGenre, answers.musicians);
    GroupsManager.getGroupsManager().updateGenre(newGenre, answers.musicians);
    AlbumsManager.getAlbumsManager().updateGenre(newGenre, answers.albums);
    SongsManager.getSongsManager().updateGenre(newGenre, answers.songs);
    */
    promptMusicGenres();
  });
}

function promptEditGenre(genre: MusicGenre): void {
  const manager = MusicGenresManager.getMusicGenresManager();
  let musicians: string[] = ['Rolling Stones', 'Michael Jackson'];
  let albums: string[] = ['Threaller', 'Abbey Road'];
  let songs: string[] = ['Imagine', 'Despacito'];
  /*
  let musicians: string[] = ArtistsManager.getArtistsManager().getList();
  musicians.concat(GroupsManager.getGroupsManager().getList());
  let albums: string[] = AlbumsManager.getAlbumsManager().getList();
  let songs: string[] = SongsManager.getSongsManager().getList();
  */
  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Genre\'s name:',
      default: genre.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        manager.getCollection().forEach((element) => {
          if (value === element.getName() && genre !== element) {
            val = 'Error: ya existe un género con ese nombre.';
          }
        });
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
    */
    promptMusicGenres();
  });
}