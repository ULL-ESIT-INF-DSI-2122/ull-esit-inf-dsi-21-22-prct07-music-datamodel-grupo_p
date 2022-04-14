import 'mocha';
import {expect} from 'chai';
import {SongManager} from '../../src/Managers/SongManager';
import {GenreManager} from '../../src/Managers/GenreManager';
import {Artist} from '../../src/Basics/Artist';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {Album} from '../../src/Basics/Album';


describe('Pruebas de la clase Artist', () => {
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

  it('Artist name', () => {
    expect(JhonnyCash.getName()).to.be.equal('Jhony Cash');
  });
  it('Groups to belong it the artist', () => {
    expect(JhonnyCash.getGroups()).to.be.eql([]);
  });
  it('Genres to belong it the artist', () => {
    expect(JhonnyCash.getGenres()).to.be.eql(['Country']);
  });
  it('Albums that the artist has', () => {
    expect(JhonnyCash.getAlbums()).to.be.eql([AmericanRecordings]);
  });
  it('Songs that the artist has', () => {
    expect(JhonnyCash.getSongs()).to.be.eql([DigoLoQuePienso, DriveOn]);
  });
  it('Edit name the artist', () => {
    LouisArmtrong.setName('Louis Armtrong');
    expect(LouisArmtrong.getName()).to.be.equal('Louis Armtrong');
  });
  it('Edit Groups to belong it the artist', () => {
    LouisArmtrong.setGroups(['Hot Five']);
    expect(LouisArmtrong.getGroups()).to.be.eql(['Hot Five']);
  });
  it('edit Genres to belong it the artist', () => {
    LouisArmtrong.setGenres(['Jazz']);
    expect(LouisArmtrong.getGenres()).to.be.eql(['Jazz']);
  });
  it('Edit Albums that the artist has', () => {
    LouisArmtrong.setAlbums([WhatAWorderfulWorld]);
    expect(LouisArmtrong.getAlbums()).to.be.eql([WhatAWorderfulWorld]);
  });
  it('Edit Songs that the artist has', () => {
    LouisArmtrong.setSongs([LaVieEnRose]);
    expect(LouisArmtrong.getSongs()).to.be.eql([LaVieEnRose]);
  });
  it('Add Genre to belong it artist', () => {
    JhonnyCash.addGenre(pop);
    expect(JhonnyCash.getGenres()).to.be.eql(['Country', 'Pop']);
  });
  it('Delete a Song from artist', () => {
    JhonnyCash.removeSong(DriveOn);
    expect(JhonnyCash.getSongs()).to.be.eql([DigoLoQuePienso]);
  });
  it('Add Song to artist', () => {
    JhonnyCash.addSong(DriveOn);
    expect(JhonnyCash.getSongs()).to.be.eql([DigoLoQuePienso, DriveOn]);
  });
  it('Add a new Album to artist', () => {
    JhonnyCash.addAlbum(WaterFromTheWellsOfHome);
    expect(JhonnyCash.getAlbums()).to.be.eql([AmericanRecordings, WaterFromTheWellsOfHome]);
  });
  it('Remove Album to artist', () => {
    JhonnyCash.removeAlbum(AmericanRecordings);
    expect(JhonnyCash.getAlbums()).to.be.eql([WaterFromTheWellsOfHome]);
  });
  it('Add a new group to which the artist belongs', () => {
    JhonnyCash.addGroup('Landsberg Barbarians');
    expect(JhonnyCash.getGroups()).to.be.eql(['Landsberg Barbarians']);
  });
  it('Delete group to which the artist belongs', () => {
    JhonnyCash.removeGroup('Landsberg Barbarians');
    expect(JhonnyCash.getGroups()).to.be.eql([]);
  });
});