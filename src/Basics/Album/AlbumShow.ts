import {ShowData} from '../../Interfaces/BasicData';
import {Album} from './Album';

export class AlbumShow implements ShowData {
  constructor(private album: Album) {
  }

  public showInfo(): void {
    console.log(`ALBUM ${this.album.getName()}
    Artista o grupo que lo publico: ${this.album.getPublisher()}
    Año de publicacion: ${this.album.getYear()}
    Generos que contiene este album: ${this.album.getGenres()}
    Canciones de este genero: ${this.album.getSongs()}`);
  }
}
