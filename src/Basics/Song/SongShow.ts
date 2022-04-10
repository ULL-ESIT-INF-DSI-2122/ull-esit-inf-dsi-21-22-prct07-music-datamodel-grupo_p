import {ShowData} from '../../Interfaces/BasicData';
import {Song} from './Song';

export class SongShow implements ShowData {
  constructor(private song: Song) {
  }

  public showInfo(): void {
    console.log(`CANCION ${this.song.getName()}
    Autor: ${this.song.getAuthor()}
    Duracion: ${this.song.getDuration()}
    Genero/s: ${this.song.getGenres()}
    Single: ${(this.song.isSingle() ? 'Si' : 'No')}
    Numero de reproducciones: ${this.song.getReproductions()}`);
  }
}