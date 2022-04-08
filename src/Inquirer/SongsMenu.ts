import * as inquirer from 'inquirer';
import {Song} from '../Basics/Song';
import {SongManager} from '../Managers/SongManager';
import {promptUser} from './MainMenu';

export function promptSongs(): void {
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
      case 'Nuevo género +':
        // promptAddSong();
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
        // promptEditSong(genre);
        break;
      case 'Eliminar':
        // promptRemoveSong(genre);
        break;
      default:
        promptSongs();
        break;
    }
  },
  );
}