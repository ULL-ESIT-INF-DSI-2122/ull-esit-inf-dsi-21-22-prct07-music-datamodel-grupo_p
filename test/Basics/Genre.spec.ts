import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/Basics/Genre';

describe('Pruebas de la clase Genre', () => {
  let rap: Genre;
  before(function() {
    rap = new Genre('Rap', ['Eminem'], ['Relapse'], ['Rap God']);
  });
  it('new Genre(\'Pop\', [\'Michael Jackson\'], [\'Thriller\'], [\'Billie Jean\']) is not equal null', () => {
    expect(new Genre('Pop', ['Michael Jackson'], ['Thriller'], ['Billie Jean'])).not.to.be.equal(null);
  });
  it('rap.getName() returns \'Rap\'', () => {
    expect(rap.getName()).to.be.equal('Rap');
  });
  it('rap.setName(\'rap\') sets the name to \'rap\'', () => {
    rap.setName('rap');
    expect(rap.getName()).to.be.equal('rap');
  });
  it('rap.getMusicians() returns [\'Eminem\']', () => {
    expect(rap.getMusicians()).to.be.eql(['Eminem']);
  });
  it('rap.setMusicians([\'Tupac\']) sets the musician array to [\'Tupac\']', () => {
    rap.setMusicians(['Tupac']);
    expect(rap.getMusicians()).to.be.eql(['Tupac']);
  });
  it('rap.addMusician(\'Eminem\') adds \'Eminem\' to the musician array', () => {
    rap.addMusician('Eminem');
    expect(rap.getMusicians()).to.be.eql(['Tupac', 'Eminem']);
  });
  it('rap.addMusician(\'Eminem\') not adds \'Eminem\' to the musician array', () => {
    rap.addMusician('Eminem');
    expect(rap.getMusicians()).to.be.eql(['Tupac', 'Eminem']);
  });
  it('rap.deleteMusician(\'Tupac\') deletes \'Tupac\' from the musician array', () => {
    rap.deleteMusician('Tupac');
    expect(rap.getMusicians()).to.be.eql(['Eminem']);
  });
  it('rap.getAlbums() returns [\'Relapse\']', () => {
    expect(rap.getAlbums()).to.be.eql(['Relapse']);
  });
  it('rap.setAlbums([\'Kamikaze\']) sets the album array to [\'Kamikaze\']', () => {
    rap.setAlbums(['Kamikaze']);
    expect(rap.getAlbums()).to.be.eql(['Kamikaze']);
  });
  it('rap.addAlbum(\'Relapse\') adds \'Relapse\' to the album array', () => {
    rap.addAlbum('Relapse');
    expect(rap.getAlbums()).to.be.eql(['Kamikaze', 'Relapse']);
  });
  it('rap.addAlbum(\'Relapse\') not adds \'Relapse\' to the album array', () => {
    rap.addAlbum('Relapse');
    expect(rap.getAlbums()).to.be.eql(['Kamikaze', 'Relapse']);
  });
  it('rap.deleteAlbum(\'Kamikaze\') deletes \'Kamikaze\' from the album array', () => {
    rap.deleteAlbum('Kamikaze');
    expect(rap.getAlbums()).to.be.eql(['Relapse']);
  });
  it('rap.getSongs() returns [\'Rap God\']', () => {
    expect(rap.getSongs()).to.be.eql(['Rap God']);
  });
  it('rap.setSongs([\'Venom\']) sets the song array to [\'Kamikaze\']', () => {
    rap.setSongs(['Venom']);
    expect(rap.getSongs()).to.be.eql(['Venom']);
  });
  it('rap.addSong(\'Rap God\') adds \'Rap God\' to the song array', () => {
    rap.addSong('Rap God');
    expect(rap.getSongs()).to.be.eql(['Venom', 'Rap God']);
  });
  it('rap.addSong(\'Rap God\') not adds \'Rap God\' to the song array', () => {
    rap.addSong('Rap God');
    expect(rap.getSongs()).to.be.eql(['Venom', 'Rap God']);
  });
  it('rap.deleteSong(\'Venom\') deletes \'Venom\' from the song array', () => {
    rap.deleteSong('Venom');
    expect(rap.getSongs()).to.be.eql(['Rap God']);
  });
  it('rap.showInfo()', () => {
    expect(rap.showInfo()).to.be.equal(`rap\n  -Grupos/Artistas: Eminem\n`+
    `  -Álbums: Relapse\n  -Canciones: Rap God`);
  });
});