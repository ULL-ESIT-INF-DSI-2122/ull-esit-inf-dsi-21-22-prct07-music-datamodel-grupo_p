import * as inquirer from 'inquirer';
import {Artist} from '../clasesBase/Artist';
import {ArtistManager} from '../Managers/ArtistManager';
import {promptUser} from './MainMenu';


/*
* AÑADIR - BORRAR - MODIFICAR
*/
export function promptArtists(): void {
  const manager = ArtistManager.getArtistsManager();
  let options: string[] = ['Add new artist +'];
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
      case 'Add new artist +':
        promptAddArtist();
        break;
      case 'Edit':
        let artistE: Artist = manager.searchByName(answers['command']);
        artistE.showInfo();
        // promptEditArtist(artistE);
        break;
      case 'Remove':
        let artistR: Artist = manager.searchByName(answers['command']);
        artistR.showInfo();
        manager.removeArtist(artistR);
        // GroupsManager.getGroupManager().removeArtist(artist);
        // AlbumsManager.getAlbumsManager().removeGenre(genre);
        // SongsManager.getSongsManager().removeGenre(genre);
        promptArtists();
        break;
      case 'Back':
        promptUser();
        break;
      default:
        // let artist: Artist = manager.searchByName(answers['command']);
        // promptArtist(artist);
        break;
    }
  });
}

/* Artista tiene:
* nombre
* grupos
* generos
* albums
* canciones
*/
function promptAddArtist(): void {
  const manager = ArtistManager.getArtistsManager();

  let albums: string[] = ['Threaller', 'Abbey Road'];
  let songs: string[] = ['Imagine', 'Despacito'];
  let groups: string[] = ['gru1', 'gru2', 'gru3'];
  let genre: string[]= ['g1', 'g2', 'g3'];

  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Artist name:',
      validate(value: string) {
        let val: boolean | string = true;
        if (manager.exists(value)) {
          val = 'Error: ya existe un artista con ese nombre.';
        }
        return val;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige generos:',
      name: 'genre',
      choices: genre,
      validate(value: string[]) {
        if (value.length < 1) {
          return 'Debes elegir al menos una cancion';
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
    const newArtist: Artist = new Artist(answers.name, answers.genre, answers.groups,
        answers.albums, answers.songs);
    manager.addArtist(newArtist);
    /*
    ArtistsManager.getArtistsManager().updateGenre(newGenre, answers.musicians);
    GroupsManager.getGroupsManager().updateGenre(newGenre, answers.musicians);
    AlbumsManager.getAlbumsManager().updateGenre(newGenre, answers.albums);
    SongsManager.getSongsManager().updateGenre(newGenre, answers.songs);
    */
    promptArtists();
  });
}

/* Artista tiene:
* nombre
* grupos
* generos
* albums
* canciones
*/
/*
function promptEditArtist(artist: Artist): void {
  const manager = ArtistManager.getArtistsManager();
  let artista: string[] = ['Rolling Stones', 'Michael Jackson'];
  let albums: string[] = ['Threaller', 'Abbey Road'];
  let songs: string[] = ['Imagine', 'Despacito'];

  console.clear();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Artist name:',
      default: artist.getName(),
      validate(value: string) {
        let val: boolean | string = true;
        manager.getCollection().forEach((element) => {
          if (value === element.getName()) {
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
      choices: genre,
      default: artista.getGenre(),
      validate(value: string[]) {
        if (value.length < 1) {
          return 'Debes elegir al menos una cancion';
        }
        return true;
      },
    },
    {
      type: 'checkbox',
      message: 'Elige artistas/grupos:',
      name: 'musicians',
      choices: artista,
      default: artista.getMusicians(),
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

    promptArtists();
  });
}
*/
