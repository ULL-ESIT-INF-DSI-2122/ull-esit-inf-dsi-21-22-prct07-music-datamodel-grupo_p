import {AlbumInterface} from './AlbumInterface';
import {ArtistInterface} from './ArtistInterface';

export abstract class GroupInterface {
    abstract name: string;
    abstract artists: ArtistInterface[];
    abstract yearCreation: number;
    abstract genres: string[];
    abstract albums: AlbumInterface[];
}