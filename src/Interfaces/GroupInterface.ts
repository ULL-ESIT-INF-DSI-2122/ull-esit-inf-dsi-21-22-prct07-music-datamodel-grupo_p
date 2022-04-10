import {ArtistInterface} from './ArtistInterface';
import {AlbumInterface} from './AlbumInterface';

export interface GroupInterface {
  name: string;
  artists: ArtistInterface[];
  yearCreation: number;
  genres: string[];
  albums: AlbumInterface[];
}