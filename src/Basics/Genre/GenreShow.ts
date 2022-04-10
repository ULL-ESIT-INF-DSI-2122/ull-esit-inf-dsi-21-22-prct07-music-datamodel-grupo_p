import {ShowData} from '../../Interfaces/BasicData';
import {Genre} from './Genre';

export class GenreShow implements ShowData {
  constructor(private genre: Genre) {
  }

  showInfo(): string {
    const info: string = `${this.genre.getName()}\n  -Grupos/Artistas:\n    ${this.genre.getMusiciansNames().join('\n    ')}\n`+
    `  -Álbums:\n    ${this.genre.getAlbumsNames().join('\n    ')}\n  -Canciones:\n    ${this.genre.getSongsNames().join('\n    ')}\n`;
    console.log(info);
    return info;
  }
}