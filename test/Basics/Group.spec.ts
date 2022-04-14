import 'mocha';
import {expect} from 'chai';
import {SongManager} from '../../src/Managers/SongManager';
import {GenreManager} from '../../src/Managers/GenreManager';
import {Artist} from '../../src/Basics/Artist';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {Album} from '../../src/Basics/Album';
import {Group} from '../../src/Basics/Group';


describe('Pruebas de la clase Groups', () => {
  let album2: AlbumManager;
  let album3: AlbumManager;
  let genre: GenreManager;
  let song2: SongManager;
  let song3: SongManager;
  album2 = AlbumManager.getAlbumManager();
  album3 = AlbumManager.getAlbumManager();
  genre = GenreManager.getGenreManager();
  song2 = SongManager.getSongManager();
  song3 = SongManager.getSongManager();
  let WhatAWorderfulWorld = album2.searchByName('What a wonderful world');
  let WaterFromTheWellsOfHome = album3.searchByName('Water From The Wells Of Home');
  let pop = genre.searchByName('Pop');
  let DigoLoQuePienso = song2.searchByName('Digo lo que pienso');
  let DriveOn = song3.searchByName('Drive On');
  const AmericanRecordings = new Album('American', 'No se sabe', 2001, ['Rap'], [DigoLoQuePienso]);
  const JhonnyCash = new Artist('Jhony Cash', [], ['Country'], [AmericanRecordings], [DigoLoQuePienso, DriveOn]);
  const LouisArmtrong = new Artist('Erróneo', [], ['Rap'], [AmericanRecordings], [DriveOn] );
  const TheHotFive = new Group('The Hot Five', [LouisArmtrong], 1925, ['Jazz'], [WhatAWorderfulWorld]);
  // Grupo a modificar
  const TennesseeThree = new Group('Tennessee', [LouisArmtrong], 1925, [], [WhatAWorderfulWorld]);
  it('Group name', () => {
    expect(TheHotFive.getName()).to.be.equal('The Hot Five');
  });
  it('Artists to belong it the group', () => {
    expect(TheHotFive.getArtists()).to.be.eql([LouisArmtrong]);
  });
  it('Groups start year ', () => {
    expect(TheHotFive.getFundationYear()).to.be.equal(1925);
  });
  it('Genres that the group has', () => {
    expect(TheHotFive.getGenres()).to.be.eql(['Jazz']);
  });
  it('Albums that the group has', () => {
    expect(TheHotFive.getAlbums()).to.be.eql([WhatAWorderfulWorld]);
  });
  it('Edit group name', () => {
    TennesseeThree.setName('Tennessee Three');
    expect(TennesseeThree.getName()).to.be.equal('Tennessee Three');
  });
  it('Edit Artist to belong it the group', () => {
    TennesseeThree.setArtists([JhonnyCash]);
    expect(TennesseeThree.getArtists()).to.be.eql([JhonnyCash]);
  });
  it('Edit group start year', () => {
    TennesseeThree.setYearCreation(1900);
    expect(TennesseeThree.getFundationYear()).to.be.equal(1900);
  });
  it('Edit Genres that the group has', () => {
    TennesseeThree.setGenres(['Country', 'rock and roll']);
    expect(TennesseeThree.getGenres()).to.be.eql(['Country', 'rock and roll']);
  });
  it('Edit Albums that the group has', () => {
    TennesseeThree.setAlbums([AmericanRecordings]);
    expect(TennesseeThree.getAlbums()).to.be.eql([AmericanRecordings]);
  });
  it('Add Genre to belong it group', () => {
    TennesseeThree.addGenre(pop);
    expect(TennesseeThree.getGenres()).to.be.eql(['Country', 'rock and roll', 'Pop']);
  });
  it('Delete Genre to belong it group', () => {
    TennesseeThree.removeGenre(pop.getName());
    expect(TennesseeThree.getGenres()).to.be.eql(['Country', 'rock and roll']);
  });
  it('Add a new Album to group', () => {
    TennesseeThree.addAlbums(WaterFromTheWellsOfHome);
    expect(TennesseeThree.getAlbums().includes(WaterFromTheWellsOfHome)).to.be.equal(true);
  });
  it('Remove Album to artist', () => {
    TennesseeThree.removeAlbum(WhatAWorderfulWorld);
    expect(TennesseeThree.getAlbums().includes(WhatAWorderfulWorld)).to.be.equal(false);
  });
});