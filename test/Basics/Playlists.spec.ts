import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../../src/Basics/Playlist';
import {Song} from '../../src/Basics/Song';
import {Genre} from '../../src/Basics/Genre';
import {GenresManager} from '../../src/Managers/GenresManager';

describe('Pruebas de la clase Playlist', () => {
  let lista: Playlist;
  let rapgod: Song;
  let slimshady: Song;
  let rap: Genre;
  let pop: Genre;
  before(function() {
    rap = new Genre('Rap', ['Rolling Stones'], ['Threaller'], ['Imagine']);
    pop = new Genre('Pop', ['Michael Jackson'], ['Threaller'], ['Imagine']);
    rapgod = new Song('Rap God', 'Eminem', [4, 45], ['Pop', 'Pop'], new Date('2000-05-16'), true, 2000000);
    slimshady = new Song('The Real Slim Shady', 'Eminem', [3, 24], ['Rap', 'Rap'], new Date('2013-10-15'), false, 1500000);
    GenresManager.getGenresManager().addGenre(rap);
    GenresManager.getGenresManager().addGenre(pop);
    lista = new Playlist('MyPlaylist', [rapgod]);
  });
  it(`new Playlist('MyPlaylist', [rapgod]); is not equal null`, () => {
    expect(new Playlist('MyPlaylist', [rapgod])).not.to.be.equal(null);
  });
  it(`lista.getName() returns 'MyPlaylist'`, () => {
    expect(lista.getName()).to.be.equal('MyPlaylist');
  });
  it(`lista.setName() sets name to 'MiLista'`, () => {
    lista.setName('MiLista');
    expect(lista.getName()).to.be.equal('MiLista');
  });
  it(`lista.getSongs() returns [rapgod]`, () => {
    expect(lista.getSongs()).to.be.eql([rapgod]);
  });
  it(`lista.setSongs([slimshady]) sets the song array to [slimshady]`, () => {
    lista.setSongs([slimshady]);
    expect(lista.getSongs()).to.be.eql([slimshady]);
  });
  it(`lista.getDuration() returns [0, 4]`, () => {
    expect(lista.getDuration()).to.be.eql([0, 3]);
  });
  it(`lista.getGenres() returns [rap]`, () => {
    expect(lista.getGenres()).to.be.eql([rap]);
  });
  it(`lista.getSongs() returns [rapgod]`, () => {
    expect(lista.getSystemPlaylist()).to.be.equal(false);
  });
  it(`lista.addSong(rapgod) adds rapgod to the song array`, () => {
    lista.addSong(rapgod);
    expect(lista.getSongs()).to.be.eql([slimshady, rapgod]);
  });
  it(`lista.addSong(rapgod) not adds rapgod to the song array`, () => {
    lista.addSong(rapgod);
    expect(lista.getSongs()).to.be.eql([slimshady, rapgod]);
  });
  it(`lista.deleteSong(slimshady) deletes slimshady from the song array`, () => {
    lista.deleteSong(slimshady);
    expect(lista.getSongs()).to.be.eql([rapgod]);
  });
  it('lista.showInfo()', () => {
    expect(lista.showInfo()).to.be.equal(`MiLista\n  -Géneros: Pop\n  -Canciones: Rap God\n`+
    `  -Playlist original: No\n  -Duración: 0h 4min\n`);
  });
  it(`lista.setSystemPlaylist(true) sets systemPlaylist to true`, () => {
    lista.setSystemPlaylist(true);
    expect(lista.getSystemPlaylist()).to.be.eql(true);
  });
  it('lista.showInfo()', () => {
    expect(lista.showInfo()).to.be.equal(`MiLista\n  -Géneros: Pop\n  -Canciones: Rap God\n`+
    `  -Playlist original: Sí\n  -Duración: 0h 4min\n`);
    GenresManager.getGenresManager().removeGenre(pop);
    GenresManager.getGenresManager().removeGenre(rap);
  });
});