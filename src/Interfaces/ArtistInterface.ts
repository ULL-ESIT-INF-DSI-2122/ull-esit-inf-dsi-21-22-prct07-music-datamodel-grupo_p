import {AlbumInterface} from './AlbumInterface';
import {SongInterface} from './SongInterface';

export abstract class ArtistInterface {
    abstract name: string;
    abstract groups: string[];
    abstract genres: string[];
    abstract albums: AlbumInterface[];
    abstract songs: SongInterface[];
}