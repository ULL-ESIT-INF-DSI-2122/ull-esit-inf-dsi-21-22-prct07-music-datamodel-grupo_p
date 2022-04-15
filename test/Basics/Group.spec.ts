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
    album = albumManager.searchByName('What A Wonderful World');
    album2 = albumManager.searchByName('American Recordings');
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
    expect(TheHotFive.showInfo()).to.be.equal(`GRUPO The Hot Five
    -Nombre: The Hot Five
    -Artistas: Louis Armstrong
    -Año creacion: 1900
    -Genero/s: Jazz
    -Albums:
      What A Wonderful World`);
  });
  it('showAlbumYearOrder', () => {
    expect(TheHotFive.showAlbumYearOrder()).to.be.equal(`  What A Wonderful World`);
    expect(TheHotFive.showAlbumYearOrder(false)).to.be.equal(`  What A Wonderful World`);
  });
  it('showSongsOrder', () => {
    expect(TheHotFive.showSongsOrder()).to.be.equal(`  Cabaret
  Give Me Your Kisses
  The Home Fire
  The Sunshine Of Love
  There Must Be A Way`);
    expect(TheHotFive.showSongsOrder(false)).to.be.equal(`  There Must Be A Way
  The Sunshine Of Love
  The Home Fire
  Give Me Your Kisses
  Cabaret`);
  });
  it('showAlbumOrder', () => {
    expect(TheHotFive.showAlbumOrder()).to.be.equal(`  What A Wonderful World`);
    expect(TheHotFive.showAlbumOrder(false)).to.be.equal(`  What A Wonderful World`);
  });
  it('showSingles', () => {
    expect(TheHotFive.showSingles()).to.be.equal('  ');
  });
  it('showByReproductions', () => {
    expect(TheHotFive.showByReproductions()).to.be.equal(`  The Sunshine Of Love - 620000
  The Home Fire - 820000
  Give Me Your Kisses - 2120000
  There Must Be A Way - 5420000
  Cabaret - 6420000`);
    expect(TheHotFive.showByReproductions(false)).to.be.equal(`  Cabaret - 6420000
  There Must Be A Way - 5420000
  Give Me Your Kisses - 2120000
  The Home Fire - 820000
  The Sunshine Of Love - 620000`);
  });
  it('showPlayListAsociate', () => {
    expect(TheHotFive.showPlayListAsociate()).to.be.equal(`  `);
  });
});