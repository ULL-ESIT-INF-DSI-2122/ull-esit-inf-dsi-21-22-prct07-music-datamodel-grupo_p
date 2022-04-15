import 'mocha';
import {expect} from 'chai';
import {GenreManager} from '../../src/Managers/GenreManager';
import {Artist} from '../../src/Basics/Artist';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {Album} from '../../src/Basics/Album';
import {Group} from '../../src/Basics/Group';
import {Genre} from '../../src/Basics/Genre';
import {ArtistManager} from '../../src/Managers/ArtistManager';


describe('Pruebas de la clase Groups', () => {
  /*
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
  */
  let TheHotFive: Group;
  let artista: Artist;
  let artista2: Artist;
  let genero: string;
  let genero2: Genre;
  let album: Album;
  let album2: Album;
  let albumManager: AlbumManager;
  let artistManager: ArtistManager;
  let genreManager: GenreManager;
  before(function() {
    albumManager = AlbumManager.getAlbumManager();
    artistManager = ArtistManager.getArtistManager();
    artista = artistManager.searchByName('Louis Armstrong');
    console.log(artista);
    artista2 = artistManager.searchByName('Johnny Cash');
    console.log(artista2);
    genreManager = GenreManager.getGenreManager();
    genero2 = genreManager.searchByName('Rock');
    genero = 'Jazz';
    album = albumManager.searchByName('What A Worderful World');
    console.log(album);
    album2 = albumManager.searchByName('American Recordings');
    console.log(album2);
    TheHotFive = new Group('The Hot Five', [artista], 1925, [genero], [album]);
    console.log(TheHotFive);
  });
  it('Group name', () => {
    expect(TheHotFive.getName()).to.be.equal('The Hot Five');
  });
  it('Artists to belong it the group', () => {
    expect(TheHotFive.getArtists()).to.be.eql([artista]);
  });
  it('Groups start year ', () => {
    expect(TheHotFive.getFundationYear()).to.be.equal(1925);
  });
  it('Genres that the group has', () => {
    expect(TheHotFive.getGenres()).to.be.eql([genero]);
  });
  it('Albums that the group has', () => {
    expect(TheHotFive.getAlbums()).to.be.eql([album]);
  });
  it('Edit group name', () => {
    TheHotFive.setName('Tennessee Three');
    expect(TheHotFive.getName()).to.be.equal('Tennessee Three');
    TheHotFive.setName('The Hot Five');
  });
  it('Edit Artist to belong it the group', () => {
    TheHotFive.setArtists([artista2]);
    expect(TheHotFive.getArtists()).to.be.eql([artista2]);
    TheHotFive.setArtists([artista]);
  });
  it('Edit group start year', () => {
    TheHotFive.setYearCreation(1900);
    expect(TheHotFive.getFundationYear()).to.be.equal(1900);
  });
  it('Edit Genres that the group has', () => {
    TheHotFive.setGenres(['Country', 'rock and roll']);
    expect(TheHotFive.getGenres()).to.be.eql(['Country', 'rock and roll']);
    TheHotFive.setGenres([genero]);
  });
  it('Edit Albums that the group has', () => {
    TheHotFive.setAlbums([album2]);
    expect(TheHotFive.getAlbums()).to.be.eql([album2]);
    TheHotFive.setAlbums([album]);
  });
  it('Add Genre to belong it group', () => {
    TheHotFive.addGenre(genero2);
    expect(TheHotFive.getGenres()).to.be.eql(['Jazz', 'Rock']);
  });
  it('Delete Genre to belong it group', () => {
    TheHotFive.removeGenre(genero2.getName());
    expect(TheHotFive.getGenres()).to.be.eql(['Jazz']);
  });
  it('Add a new Album to group', () => {
    TheHotFive.addAlbums(album2);
    expect(TheHotFive.getAlbums().includes(album2)).to.be.equal(true);
  });
  it('Remove Album to artist', () => {
    TheHotFive.removeAlbum(album2);
    expect(TheHotFive.getAlbums().includes(album2)).to.be.equal(false);
  });
  it('ShowInfo', () => {
    expect(TheHotFive.showInfo()).to.be.equal(`GRUPO The Hot Five\n
    -Nombre: The Hot Five\n
    -Artistas: Louis Armstrong
    -Año creacion: 1900
    -Genero/s: Jazz\n
    -Albums:
      What A Worderful World`);
  });
  it('showAlbumYearOrder', () => {
    expect(TheHotFive.showAlbumYearOrder()).to.be.equal(`What A Worderful World`);
  });
  it('showSongsOrder', () => {
    expect(TheHotFive.showSongsOrder()).to.be.equal(`Drive On\n Why Me Lord`);
  });
  it('showAlbumOrder', () => {
    expect(TheHotFive.showAlbumOrder()).to.be.equal(`What A Worderful World`);
  });
  it('showSingles', () => {
    expect(TheHotFive.showSingles()).to.be.equal('');
  });
  it('showByReproductions', () => {
    expect(TheHotFive.showByReproductions()).to.be.equal(`Drive On\n  Why Me Lord`);
  });
  it('showPlayListAsociate', () => {
    expect(TheHotFive.showPlayListAsociate()).to.be.equal(``);
  });
});