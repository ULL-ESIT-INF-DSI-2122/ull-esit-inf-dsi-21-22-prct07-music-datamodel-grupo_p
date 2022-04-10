import {SongInterface} from './SongInterface';
import {AlbumInterface} from './AlbumInterface';

export interface ArtistInterface {
  name: string;
  groups: string[];
  genres: string[];
  albums: AlbumInterface[];
  songs: SongInterface[];
}
