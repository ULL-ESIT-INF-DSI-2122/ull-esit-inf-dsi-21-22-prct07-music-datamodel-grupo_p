import 'mocha';
import {expect} from 'chai';
import {Album} from '../../src/Basics/Album';
import {SongManager} from '../../src/Managers/SongManager';
import {GenreManager} from '../../src/Managers/GenreManager';


describe('Pruebas de la clase Album', () => {
  let genre: GenreManager;
  let song1: SongManager;
  let song2: SongManager;
  let song3: SongManager;
  genre = GenreManager.getGenreManager();
  song1 = SongManager.getSongManager();
  song2 = SongManager.getSongManager();
  song3 = SongManager.getSongManager();
  let pop = genre.searchByName('Pop');
  let LaVueltaAlMundo = song1.searchByName('La Vuelta Al Mundo');
  let DigoLoQuePienso = song2.searchByName('Digo lo que pienso');
  let DriveOn = song3.searchByName('Drive On');
  const AmericanRecordings = new Album('American', 'No se sabe', 2001, ['Rap'], [DigoLoQuePienso]);
  const EntreLosQueQuieran = new Album('Entre los que quieran', 'Calle 13', 2010, ['Rap'], [LaVueltaAlMundo] );

  it('Name of the album "Entre los que quieran"', () => {
    expect(EntreLosQueQuieran.getName()).to.be.equal('Entre los que quieran');
  });
  it('Name of who publised "Entre los que quieran"', () => {
    expect(EntreLosQueQuieran.getPublisher()).to.be.equal('Calle 13');
  });
  it('Name of genres from "Entre los que quieran"', () => {
    expect(EntreLosQueQuieran.getGenres()).to.be.eql(['Rap']);
  });
  it('Return songs of Album "Entre los que quieran"', () => {
    expect(EntreLosQueQuieran.getSongs()).to.be.eql([LaVueltaAlMundo]);
  });
  it('Return songs of Album "Entre los que quieran"', () => {
    EntreLosQueQuieran.setSongs([LaVueltaAlMundo]);
    expect(EntreLosQueQuieran.getSongs()).to.be.eql([LaVueltaAlMundo]);
  });
  it('Edit name of album "American Recordings"', () => {
    AmericanRecordings.setName('American recordings');
    expect(AmericanRecordings.getName()).to.be.equal('American recordings');
  });
  it('Edit who publishes of album "American Recordings"', () => {
    AmericanRecordings.setPublisher('Jhonny Cash');
    expect(AmericanRecordings.getPublisher()).to.be.equal('Jhonny Cash');
  });
  it('Edit year publishes of album "American Recordings"', () => {
    AmericanRecordings.setYear(2000);
    expect(AmericanRecordings.getYear()).to.be.equal(2000);
  });
  it('Edit genres of album "American Recordings"', () => {
    AmericanRecordings.setGenres(['Country']);
    expect(AmericanRecordings.getGenres()).to.be.eql(['Country']);
  });
  it('Show info of album "American Recordings"', () => {
    expect(AmericanRecordings.showInfo()).to.be.equal(`ÁLBUM American recordings\n    -Publicado por: Jhonny Cash\n`+
    `    -Año de publicacion: 2000\n    -Genero: Country\n    -Canciones: \n      Digo lo que pienso`);
  });
  it('Add Song to the album "American Recordings"', () => {
    AmericanRecordings.addSong(DriveOn);
    expect(AmericanRecordings.getSongs().includes(DriveOn)).to.be.equal(true);
  });
  it('Not Add Song to the album "American Recordings"', () => {
    AmericanRecordings.addSong(DriveOn);
    expect(AmericanRecordings.getSongs().includes(DriveOn)).to.be.equal(true);
  });
  it('Remove Song to the album "American Recordings"', () => {
    AmericanRecordings.removeSong(DigoLoQuePienso);
    expect(AmericanRecordings.getSongs().includes(DigoLoQuePienso)).to.be.equal(false);
  });
  it('Add Genre to the album "American Recordings"', () => {
    AmericanRecordings.addGenre(pop);
    expect(AmericanRecordings.getGenres().includes('Pop')).to.be.equal(true);
  });
  it('Not add Genre to the album "American Recordings"', () => {
    AmericanRecordings.addGenre(pop);
    expect(AmericanRecordings.getGenres().includes('Pop')).to.be.equal(true);
  });
  it('Remove Genre to the album "American Recordings"', () => {
    AmericanRecordings.removeGenre(pop.getName());
    expect(AmericanRecordings.getGenres().includes('Pop')).to.be.equal(false);
  });
  it('Songs from the album "American Recordings"', () => {
    expect(AmericanRecordings.getSongsNames()).to.be.eql(['Drive On']);
  });
});