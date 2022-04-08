import {Duration} from '../Basics/Song';

export interface SongInterface {
    name: string,
    author: string,
    duration: Duration,
    genres: string[],
    publicationDate: Date,
    isSingle: boolean,
    reproductions: number
  }