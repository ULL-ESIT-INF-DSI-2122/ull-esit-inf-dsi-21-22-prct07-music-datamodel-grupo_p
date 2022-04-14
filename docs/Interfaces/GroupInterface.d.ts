import { AlbumInterface } from './AlbumInterface';
import { ArtistInterface } from './ArtistInterface';
export interface GroupInterface {
    name: string;
    artists: ArtistInterface[];
    fundationYear: number;
    genres: string[];
    albums: AlbumInterface[];
}
