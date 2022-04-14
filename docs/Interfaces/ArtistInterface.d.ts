import { AlbumInterface } from './AlbumInterface';
import { SongInterface } from './SongInterface';
export interface ArtistInterface {
    name: string;
    groups: string[];
    genres: string[];
    albums: AlbumInterface[];
    songs: SongInterface[];
}
