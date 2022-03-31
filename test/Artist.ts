import {Group} from './Group';
import {Genre} from './Genre';
import {Album} from './Album';
import {Song} from './Song';

export class Artist {
  constructor(readonly name: string, private groups: Group,
      private genres: Genre[], private albums: Album[],
      private songs: Song[], private numberListeners: number) {
    this.numberListeners = 0;
  }
}
