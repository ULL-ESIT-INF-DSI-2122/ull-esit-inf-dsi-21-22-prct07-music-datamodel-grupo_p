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
  /*
  let album2: AlbumManager;
  let album3: AlbumManager;
  let genre: GenreManager;
  let song1: SongManager;
  let song2: SongManager;
  let song3: SongManager;
  // let album1 = AlbumManager.getAlbumManager();
  album2 = AlbumManager.getAlbumManager();
  album3 = AlbumManager.getAlbumManager();
  genre = GenreManager.getGenreManager();
  song1 = SongManager.getSongManager();
  song2 = SongManager.getSongManager();
  song3 = SongManager.getSongManager();
  // AmericanRecordings = album1.searchByName('American Recordings');
  let WhatAWorderfulWorld = album2.searchByName('What a wonderful world');
  let WaterFromTheWellsOfHome = album3.searchByName('Water From The Wells Of Home');
  let pop = genre.searchByName('Pop');
  let LaVieEnRose = song1.searchByName('La Vie En Rose');
  let DigoLoQuePienso = song2.searchByName('Digo lo que pienso');
  let DriveOn = song3.searchByName('Drive On');
  const AmericanRecordings = new Album('American', 'No se sabe', 2001, ['Rap'], [DigoLoQuePienso]);
  const JhonnyCash = new Artist('Jhony Cash', [], ['Country'], [AmericanRecordings], [DigoLoQuePienso, DriveOn]);
  const LouisArmtrong = new Artist('Erróneo', [], ['Rap'], [AmericanRecordings], [DriveOn] );
  */
  let JhonnyCash: Artist;
  let grupo: string;
  let grupo2: string;
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
    albumManager = AlbumManager.getAlbumManager();
    songManager = SongManager.getSongManager();
    genreManager = GenreManager.getGenreManager();
    genero2 = genreManager.searchByName('Pop');
    album = albumManager.searchByName('American Recordings');
    album2 = albumManager.searchByName('Overexposed');
    cancion1 = songManager.searchByName('Digo Lo Que Pienso');
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
  it('Add a new Album to artist', () => {
    JhonnyCash.addAlbum(album2);
    expect(JhonnyCash.getAlbums()).to.be.eql([album, album2]);
  });
  it('Remove Album to artist', () => {
    JhonnyCash.removeAlbum(album2);
    expect(JhonnyCash.getAlbums()).to.be.eql([album]);
  });
  it('Add a new group to which the artist belongs', () => {
    JhonnyCash.addGroup('Landsberg Barbarians');
    expect(JhonnyCash.getGroups()).to.be.eql(['Landsberg Barbarians']);
  });
  it('Delete group to which the artist belongs', () => {
    JhonnyCash.removeGroup('Landsberg Barbarians');
    expect(JhonnyCash.getGroups()).to.be.eql([]);
  });
  it('ShowInfo', () => {
    expect(JhonnyCash.showInfo()).to.be.equal(`ARTISTA Jhonny Cash\n
    -Nombre: Johnny Cash
    -Grupos: -
    -Genero/s: Country
    -Albums:
      American Recordings
    -Canciones:
      Drive On
      Why Me Lord`);
  });
  it('showSongsOrder', () => {
    expect(JhonnyCash.showSongsOrder()).to.be.equal(`Drive On\n Why Me Lord`);
  });
  it('showAlbumOrder', () => {
    expect(JhonnyCash.showAlbumOrder()).to.be.equal(`American Recordings`);
  });
  it('showAlbumYearOrder', () => {
    expect(JhonnyCash.showAlbumYearOrder()).to.be.equal(`American Recordings`);
  });
  it('showSingles', () => {
    expect(JhonnyCash.showSingles()).to.be.equal('');
  });
  it('showByReproductions', () => {
    expect(JhonnyCash.showByReproductions()).to.be.equal(`Drive On\n  Why Me Lord`);
  });
  it('showPlayListAsociate', () => {
    expect(JhonnyCash.showPlayListAsociate()).to.be.equal(``);
  });
});