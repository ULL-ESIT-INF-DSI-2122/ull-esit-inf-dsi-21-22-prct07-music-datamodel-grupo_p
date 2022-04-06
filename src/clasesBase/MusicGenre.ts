import {Group} from './Group';
import {Artist} from './Artist';
import {Album} from './Album';
import {Song} from './Song';
// import {Rock} from '../interfacesGenrer/interfaceRock';

export enum genrer { rock = 'rock', jazz = 'jazz', pop = 'pop', bachata = 'bachata', reg = 'reg', rap = 'rap', blues = 'blues'};

export class MusicGenre {
  constructor(private name: genrer, private musicians: (Group|Artist)[],
              private albums: string[], private songs: string[]) {
  }
  getName(): string {
    return this.name;
  }
  getMusicians(): (Group|Artist)[] {
    return this.musicians;
  }
  getAlbums(): string[] {
    return this.albums;
  }
  getSongs(): string[] {
    return this.songs;
  }
  // setName(newName: string): void {
  //   this.name = newName;
  // }
  setMusicians(musicians: (Group|Artist)[]): void {
    this.musicians = musicians;
  }
  addMusician(newMusician: Group|Artist) {
    if (this.musicians.find((m) => m === newMusician) === undefined) {
      this.musicians.push(newMusician);
    }
  }
  removeMusician(musician: Group|Artist) {
    const index = this.musicians.indexOf(musician);
    this.musicians.splice(index, 1);
  }
  setAlbums(albums: string[]): void {
    this.albums = albums;
  }
  setSongs(songs: string[]): void {
    this.songs = songs;
  }
  showInfo() {
    console.log(`${this.name}\n  -Groups/Artists: ${this.musicians}\n`+
                `  -Albums: ${this.albums}\n  -Songs: ${this.songs}`);
  }
}

// import {Group} from './Group';
// import {Artist} from './Artist';
// import {Album} from './Album';
// import {Song} from './Song';

// export class MusicGenre {
//   constructor(private name: string, private musicians: (Group|Artist)[],
//               private albums: Album[], private songs: Song[]) {
//   }
//   getName(): string {
//     return this.name;
//   }
//   getMusicians(): (Group|Artist)[] {
//     return this.musicians;
//   }
//   getAlbums(): Album[] {
//     return this.albums;
//   }
//   getSongs(): Song[] {
//     return this.songs;
//   }
//   setName(newName: string): void {
//     this.name = newName;
//   }
//   setMusicians(musicians: (Group|Artist)[]): void {
//     this.musicians = musicians;
//   }
//   addMusician(newMusician: Group|Artist) {
//     if (this.musicians.find((m) => m === newMusician) === undefined) {
//       this.musicians.push(newMusician);
//     }
//   }
//   removeMusician(musician: Group|Artist) {
//     const index = this.musicians.indexOf(musician);
//     this.musicians.splice(index, 1);
//   }
//   setAlbums(albums: Album[]): void {
//     this.albums = albums;
//   }
//   setSongs(songs: Song[]): void {
//     this.songs = songs;
//   }
//   showInfo() {
//     console.log(`${this.name}\n  -Groups/Artists: ${this.musicians}\n`+
//                 `  -Albums: ${this.albums}\n  -Songs: ${this.songs}`);
//   }
// }