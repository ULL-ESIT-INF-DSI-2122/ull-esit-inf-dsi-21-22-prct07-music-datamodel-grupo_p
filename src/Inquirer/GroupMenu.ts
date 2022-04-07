import * as inquirer from 'inquirer';
import {GroupsManager} from '../Managers/GroupsManager';
import {Group} from '../Basics/Group';
import {promptUser} from './MainMenu';

export function promptGroups(): void {
  const manager = GroupsManager.getGroupManager();
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
      case 'Add new group +':
        promptAddGroup();
        break;
      case 'Back':
        promptUser();
        break;
      default:
        let group: Group = manager.searchByName(answers['command']);
        promptGroups(group);
        break;
    }
  });
}

function promptGroup(group: Group): void {
  const manager = GroupsManager.getGroupManager();
  console.clear();
  group.showInfo();
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose option',
    choices: ['Edit', 'Remove', 'Back'],
  }).then((answers) => {
    switch (answers['command']) {
      case 'Edit':
        promptEditGroup(group);
        break;
      case 'Remove':
        manager.removeGroup(group);
        /*
        ArtistsManager.getArtistsManager().removeGenre(genre);
        GroupsManager.getGroupsManager().removeGenre(genre);
        AlbumsManager.getAlbumsManager().removeGenre(genre);
        SongsManager.getSongsManager().removeGenre(genre);
        */
        promptGroup();
        break;
      default:
        promptGroup();
        break;
    }
  },
  );
}

function promptAddGroup(): void {
  const manager = GroupsManager.getGroupManager();

  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Genre\'s name:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.exists(value)) {
          val = 'Error: ya existe un grupo con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige artistas:',
      name: 'artists',
      choices: artists,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un artista';
        }
        return true;
      },
    },
    {
      type: 'input',
      message: 'Introduzca el año de creacion: ',
      name: 'year',
      choices: year,
      validate(answer: number) {
        if (typeof answer != 'number') {
          return 'Debes introducir un año valido.';
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
      message: 'Elige generos:',
      name: 'genres',
      choices: genres,
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un genero.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    const newGroup: Group = new Group(answers.name, answers.artist, answers.year,
        answers.genre, answers.album);
    manager.addGroup(newGroup);
    /*
    ArtistsManager.getArtistsManager().updateGenre(newGenre, answers.musicians);
    GroupsManager.getGroupsManager().updateGenre(newGenre, answers.musicians);
    AlbumsManager.getAlbumsManager().updateGenre(newGenre, answers.albums);
    SongsManager.getSongsManager().updateGenre(newGenre, answers.songs);
    */
    promptGroup();
  });
}

function promptEditGroup(group: Group): void {
  const manager = GroupsManager.getGroupManager();
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
      message: 'Group name:',
      default: group.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        manager.getCollection().forEach((element) => {
          if (value === element.getName() && group !== element) {
            val = 'Error: ya existe un grupo con ese nombre.';
          }
        });
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige artistas:',
      name: 'artist',
      choices: artist,
      default: group.getArtists(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un artista.';
        }
        return true;
      },
    },
    {
      type: 'cinput',
      message: 'Introduzca el año de creacion:',
      name: 'year',
      choices: year,
      validate(answer: number) {
        if (typeof answer != 'number') {
          return 'Introduzca un año valido.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige generos:',
      name: 'genres',
      choices: genre,
      default: group.getGenres(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos una canción.';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige álbums:',
      name: 'albums',
      choices: albums,
      default: group.getAlbums(),
      validate(answer: string[]) {
        if (answer.length < 1) {
          return 'Debes elegir al menos un álbum.';
        }
        return true;
      },
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    group.setName(answers.name);
    group.setArtists(answers.musicians);
    group.setYearCreation(answers.year);
    group.setGenres(answers.genre);
    group.setAlbums(answers.albums);
    manager.storeGroups();
    /*
    ArtistsManager.getArtistsManager().updateGenre(newGenre, answers.musicians);
    GroupsManager.getGroupsManager().updateGenre(newGenre, answers.musicians);
    AlbumsManager.getAlbumsManager().updateGenre(newGenre, answers.albums);
    SongsManager.getSongsManager().updateGenre(newGenre, answers.songs);
    */
    promptGroup();
  });
}