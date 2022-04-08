import {BasicData} from '../Interfaces/BasicData';
import {GroupInterface} from '../Interfaces/GroupInterface';
import {AlbumManager} from '../Managers/AlbumManager';
import {ArtistManager} from '../Managers/ArtistManager';
import {Album} from './Album';
import {Artist} from './Artist';
import {Genre} from './Genre';

export class Group implements BasicData {
  constructor(private name: string, private artists: Artist[],
      readonly fundationYear: number, private genres: string[],
      private albums: Album[]) {
  }

  getName(): string {
    return this.name;
  }
  setName(newName: string): void {
    this.name = newName;
  }
  public getArtists(): Artist[] {
    return this.artists;
  }
  public addArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }
  public removeArtist(artistDelete: Artist): void {
    this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
  }

  public getGenres(): string[] {
    return this.genres;
  }
  public removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre.getName());
    if (index !== -1) {
      this.genres.splice(index, 1);
    }
  }
  public addGenre(genre: Genre): void {
    if (this.genres.find((x) => x === genre.getName()) === undefined) {
      this.genres.push(genre.getName());
    }
  }

  public getAlbums(): Album[] {
    return this.albums;
  }
  public addAlbums(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }
  public removeAlbum(albumDelete: Album): void {
    this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
  }

  public static deserialize(group: GroupInterface): Group {
    let artists: Artist[] = [];
    let albums: Album[] = [];
    group.artists.forEach((a) =>
      artists.push(ArtistManager.getArtistManager().getArtistByName(a.name) as Artist),
    );
    group.albums.forEach((a) =>
      albums.push(AlbumManager.getAlbumManager().getAlbumByName(a.name) as Album),
    );
    return new Group(group.name, artists, group.fundationYear, group.genres, albums);
  }

  /*
  // suma de oyentes de las canciones de sus albunes
  public getNumberListenersMonthly(): number {
    let listeners:number = 0;
    this.getAlbums().forEach((album) => {
      album.songs.forEach((song) => {
        listeners += song.monthlyReproductions();
      });
    });
    return listeners;
  }*/
}
