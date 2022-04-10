import {BasicData} from '../Interfaces/BasicData';
import {SongInterface} from '../Interfaces/SongInterface';


export type Duration = [number, number];

export class Song implements BasicData {
  constructor(private name: string, private author: string,
      private duration: number, private genres: string[],
      private datePublication: Date, private single: boolean,
      private reproductions: number) {
  }

  public getDuration(): number {
    return this.duration;
  }

  public getName(): string {
    return this.name;
  }
  public setName(newName: string): void {
    this.name = newName;
  }


  public getNameAuthor(): string {
    return this.author;
  }

  public getReproduction(): number {
    return this.reproductions;
  }

  public getGenres():string[] {
    return this.genres;
  }

  public isSingle(): boolean {
    return this.single;
  }

  public monthlyReproductions(): number {
    const actualDate: Date = new Date(Date.now());
    const difference: number = actualDate.getTime() -
      this.datePublication.getTime();
    // pasa de milisegundos a meses
    const monthDifference: number = difference / (1000 * 3600 * 24 * 30);
    // media de reproducciones por mes
    return this.getReproduction() / monthDifference;
  }

  public showInfo(): void {
    console.log(`CANCION ${this.getName()}
    Autor: ${this.author}
    Duracion: ${this.duration}
    Genero/s: ${this.genres}
    Single: ${(this.single ? 'Si' : 'No')}
    Numero de reproducciones: ${this.reproductions}`);
  }

  public static deserialize(song: SongInterface): Song {
    return new Song(song.name, song.author, song.duration, song.genres, song.datePublication, song.isSingle, song.reproductions);
  }
}