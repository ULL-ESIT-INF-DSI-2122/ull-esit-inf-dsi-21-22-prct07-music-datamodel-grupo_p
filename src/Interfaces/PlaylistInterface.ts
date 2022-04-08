import {SongInterface} from './SongInterface';

export interface PlaylistInterface {
    name: string, songs: SongInterface[], systemPlaylist: boolean
}