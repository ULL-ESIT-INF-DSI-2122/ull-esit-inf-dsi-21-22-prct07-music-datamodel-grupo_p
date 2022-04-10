type Duration = [number, number];


export interface SongInterface {
  name: string;
  author: string;
  duration: Duration;
  genres: string[];
  datePublication: Date;
  isSingle: boolean;
  reproductions: number;
}
