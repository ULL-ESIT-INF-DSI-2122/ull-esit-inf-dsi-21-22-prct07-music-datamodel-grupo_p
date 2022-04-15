import 'mocha';
import {expect} from 'chai';
import {SongManager} from '../../src/Managers/SongManager';
import {Artist} from '../../src/Basics/Artist';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {Album} from '../../src/Basics/Album';
import {Song} from '../../src/Basics/Song';
import {GenreManager} from '../../src/Managers/GenreManager';
import {Genre} from '../../src/Basics/Genre';


describe('Pruebas de la clase Artist', () => {
  let JhonnyCash: Artist;
  let grupo: string;
  let grupo2: string;
  let grupo3: string;
  let album: Album;
  let album2: Album;
  let genero: string;
  let genero2: Genre;
  let cancion1: Song;
  let cancion2: Song;
  let cancion3: Song;
  let genreManager: GenreManager;
  let albumManager: AlbumManager;
  let songManager: SongManager;
  before(function() {
    genero = 'Country';
    grupo = '-';
    grupo2 = 'set';
    grupo3 = 'grupo3';
    albumManager = AlbumManager.getAlbumManager();
    songManager = SongManager.getSongManager();
    genreManager = GenreManager.getGenreManager();
    genero2 = genreManager.searchByName('Pop');
    album = albumManager.searchByName('American Recordings');
    album2 = albumManager.searchByName('Overexposed');
    cancion1 = songManager.searchByName('Digo lo que pienso');
    cancion2 = songManager.searchByName('Drive On');
    cancion3 = songManager.searchByName('Why Me Lord');
    JhonnyCash = new Artist('Johnny Cash', [grupo], [genero], [album], [cancion1, cancion2]);
  });


  it('Artist name', () => {
    expect(JhonnyCash.getName()).to.be.equal('Johnny Cash');
  });
  it('Groups to belong it the artist', () => {
    expect(JhonnyCash.getGroups()).to.be.eql([grupo]);
  });
  it('Genres to belong it the artist', () => {
    expect(JhonnyCash.getGenres()).to.be.eql([genero]);
  });
  it('Albums that the artist has', () => {
    expect(JhonnyCash.getAlbums()).to.be.eql([album]);
  });
  it('Songs that the artist has', () => {
    expect(JhonnyCash.getSongs()).to.be.eql([cancion1, cancion2]);
  });
  it('Edit name the artist', () => {
    JhonnyCash.setName('Johnny Cash set');
    expect(JhonnyCash.getName()).to.be.equal('Johnny Cash set');
    JhonnyCash.setName('Johnny Cash');
  });
  it('Edit Groups to belong it the artist', () => {
    JhonnyCash.setGroups([grupo2]);
    expect(JhonnyCash.getGroups()).to.be.eql([grupo2]);
    JhonnyCash.setGroups([grupo]);
  });
  it('edit Genres to belong it the artist', () => {
    JhonnyCash.setGenres(['Jazz']);
    expect(JhonnyCash.getGenres()).to.be.eql(['Jazz']);
    JhonnyCash.setGenres([genero]);
  });
  it('Edit Albums that the artist has', () => {
    JhonnyCash.setAlbums([album2]);
    expect(JhonnyCash.getAlbums()).to.be.eql([album2]);
    JhonnyCash.setAlbums([album]);
  });
  it('Edit Songs that the artist has', () => {
    JhonnyCash.setSongs([cancion3]);
    expect(JhonnyCash.getSongs()).to.be.eql([cancion3]);
    JhonnyCash.setSongs([cancion1, cancion2]);
  });
  it('Add Genre to belong it artist', () => {
    JhonnyCash.addGenre(genero2);
    expect(JhonnyCash.getGenres()).to.be.eql(['Country', 'Pop']);
  });
  it('Add Genre to belong it artist', () => {
    JhonnyCash.addGenre(genero2);
    expect(JhonnyCash.getGenres()).to.be.eql(['Country', 'Pop']);
  });
  it('Remove Genre to belong it artist', () => {
    JhonnyCash.removeGenre(genero2.getName());
    expect(JhonnyCash.getGenres()).to.be.eql(['Country']);
  });
  it('Delete a Song from artist', () => {
    JhonnyCash.removeSong(cancion2);
    expect(JhonnyCash.getSongs()).to.be.eql([cancion1]);
  });
  it('Add Song to artist', () => {
    JhonnyCash.addSong(cancion2);
    expect(JhonnyCash.getSongs()).to.be.eql([cancion1, cancion2]);
  });
  it('Add Song to artist', () => {
    JhonnyCash.addSong(cancion2);
    expect(JhonnyCash.getSongs()).to.be.eql([cancion1, cancion2]);
  });
  it('Add a new Album to artist', () => {
    JhonnyCash.addAlbum(album2);
    expect(JhonnyCash.getAlbums()).to.be.eql([album, album2]);
  });
  it('Add a new Album to artist', () => {
    JhonnyCash.addAlbum(album2);
    expect(JhonnyCash.getAlbums()).to.be.eql([album, album2]);
  });
  it('Remove Album to artist', () => {
    JhonnyCash.removeAlbum(album2);
    expect(JhonnyCash.getAlbums()).to.be.eql([album]);
  });
  it('Add a new group to which the artist belongs', () => {
    JhonnyCash.addGroup(grupo2);
    expect(JhonnyCash.getGroups()).to.be.eql([grupo2]);
    JhonnyCash.addGroup(grupo3);
    expect(JhonnyCash.getGroups()).to.be.eql([grupo2, grupo3]);
  });
  it('Delete group to which the artist belongs', () => {
    JhonnyCash.removeGroup(grupo2);
    expect(JhonnyCash.getGroups()).to.be.eql([grupo3]);
    JhonnyCash.removeGroup(grupo3);
    expect(JhonnyCash.getGroups()).to.be.eql([grupo]);
  });
  it('Delete group to which the artist belongs', () => {
    JhonnyCash.removeGroup(grupo3);
    expect(JhonnyCash.getGroups()).to.be.eql([grupo]);
  });
  it('ShowInfo', () => {
    expect(JhonnyCash.showInfo()).to.be.equal(`ARTISTA Johnny Cash
    -Nombre: Johnny Cash
    -Grupos: -
    -Genero/s: Country
    -Albums:
      American Recordings
    -Canciones:
      Digo lo que pienso
      Drive On`);
  });
  it('showSongsOrder', () => {
    expect(JhonnyCash.showSongsOrder()).to.be.equal(`Digo lo que pienso\n  Drive On`);
    expect(JhonnyCash.showSongsOrder(false)).to.be.equal(`Drive On\n  Digo lo que pienso`);
  });
  it('showAlbumOrder', () => {
    expect(JhonnyCash.showAlbumOrder()).to.be.equal(`American Recordings`);
    expect(JhonnyCash.showAlbumOrder(false)).to.be.equal(`American Recordings`);
  });
  it('showAlbumYearOrder', () => {
    JhonnyCash.addAlbum(album2);
    expect(JhonnyCash.showAlbumYearOrder()).to.be.equal(`American Recordings\n  Overexposed`);
    expect(JhonnyCash.showAlbumYearOrder(false)).to.be.equal(`Overexposed\n  American Recordings`);
  });
  it('showSingles', () => {
    expect(JhonnyCash.showSingles()).to.be.equal('Digo lo que pienso');
  });
  it('showByReproductions', () => {
    expect(JhonnyCash.showByReproductions()).to.be.equal(`Drive On\n  Digo lo que pienso`);
    expect(JhonnyCash.showByReproductions(false)).to.be.equal(`Digo lo que pienso\n  Drive On`);
  });
  it('showByReproductions', () => {
    expect(JhonnyCash.showByReproductions(false)).to.be.equal(`Digo lo que pienso\n  Drive On`);
  });
  it('showPlayListAsociate', () => {
    expect(JhonnyCash.showPlayListAsociate()).to.be.equal(``);
  });
});