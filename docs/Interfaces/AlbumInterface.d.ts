import { SongInterface } from './SongInterface';
export interface AlbumInterface {
    name: string;
    whoPublishes: string;
    publicationYear: number;
    genres: string[];
    songs: SongInterface[];
}
