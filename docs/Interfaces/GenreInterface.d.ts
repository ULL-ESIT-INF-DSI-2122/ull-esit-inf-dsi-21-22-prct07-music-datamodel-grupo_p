import { AlbumInterface } from './AlbumInterface';
import { ArtistInterface } from './ArtistInterface';
import { GroupInterface } from './GroupInterface';
import { SongInterface } from './SongInterface';
export interface GenreInterface {
    name: string;
    musicians: (GroupInterface | ArtistInterface)[];
    albums: AlbumInterface[];
    songs: SongInterface[];
}
