import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../../src/Basics/Playlist';
import {Song} from '../../src/Basics/Song';
import {SongManager} from '../../src/Managers/SongManager';
import {GenreManager} from '../../src/Managers/GenreManager';
import {Genre} from '../../src/Basics/Genre';

describe('Pruebas de la clase Playlist', () => {
  let lista: Playlist;
  let satisfaction: Song;
  let lost: Song;
  let payphone: Song;
  let god: Song;
  let paradise: Song;
  let pop: Genre;
  let songManager: SongManager = SongManager.getSongManager();
  let genreManager: GenreManager = GenreManager.getGenreManager();
  before(function() {
    satisfaction = songManager.searchByName('Satisfaction');
    lost = songManager.searchByName('Lost Stars');
    payphone = songManager.searchByName('Payphone');
    god = songManager.searchByName('God gave me everything');
    paradise = songManager.searchByName('Visions of paradise');
    pop = genreManager.searchByName('Pop') as Genre;
    lista = new Playlist('MyPlaylist', [satisfaction]);
  });
  it(`new Playlist('MyPlaylist', [satisfaction]); is not equal null`, () => {
    expect(new Playlist('MyPlaylist', [satisfaction])).not.to.be.equal(null);
  });
  it(`lista.getName() returns 'MyPlaylist'`, () => {
    expect(lista.getName()).to.be.equal('MyPlaylist');
  });
  it(`lista.setName() sets name to 'MiLista'`, () => {
    lista.setName('MiLista');
    expect(lista.getName()).to.be.equal('MiLista');
  });
  it(`lista.getSongs() returns [rapgod]`, () => {
    expect(lista.getSongs()).to.be.eql([satisfaction]);
  });
  it(`lista.setSongs([lost]) sets the song array to [lost]`, () => {
    lista.setSongs([lost]);
    expect(lista.getSongs()).to.be.eql([lost]);
  });
  it(`lista.getSongsNames() returns the array ['Lost Stars]`, () => {
    expect(lista.getSongsNames()).to.be.eql(['Lost Stars']);
  });
  it(`lista.getDuration() returns [0, 3]`, () => {
    expect(lista.getDuration()).to.be.eql([0, 3]);
  });
  it(`lista.getGenres() returns [pop]`, () => {
    expect(lista.getGenres()).to.be.eql([pop]);
  });
  it(`lista.getSystemPlaylist() returns false`, () => {
    expect(lista.getSystemPlaylist()).to.be.equal(false);
  });
  it(`lista.addSong(satisfaction) adds satisfaction to the song array`, () => {
    lista.addSong(satisfaction);
    expect(lista.getSongs()).to.be.eql([lost, satisfaction]);
  });
  it(`lista.addSong(satisfaction) not adds satisfaction to the song array`, () => {
    lista.addSong(satisfaction);
    expect(lista.getSongs()).to.be.eql([lost, satisfaction]);
  });
  it(`lista.deleteSong(lost) deletes lost from the song array`, () => {
    lista.deleteSong(lost);
    expect(lista.getSongs()).to.be.eql([satisfaction]);
  });
  it(`lista.getMusicians() returns ['The Rolling Stones']`, () => {
    expect(lista.getMusicians()).to.be.eql(['The Rolling Stones']);
  });
  it('lista.showInfo()', () => {
    expect(lista.showInfo()).to.be.equal(`PLAYLIST MiLista
    -G??neros: Rock
    -Playlist original: No
    -Duraci??n: 0h 3min
    -Canciones:
      Satisfaction`);
  });
  it(`lista.setSystemPlaylist(true) sets systemPlaylist to true`, () => {
    lista.setSystemPlaylist(true);
    expect(lista.getSystemPlaylist()).to.be.eql(true);
  });
  it('lista.showInfo(0)', () => {
    lista.addSong(payphone);
    lista.addSong(god);
    lista.addSong(lost);
    expect(lista.showInfo(0)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Rock,Pop
    -Playlist original: S??
    -Duraci??n: 0h 14min
    -Canciones:
      God gave me everything
      Lost Stars
      Payphone
      Satisfaction`);
  });
  it('lista.showInfo(1)', () => {
    lista.deleteSong(god);
    lista.addSong(god);
    expect(lista.showInfo(1)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Pop,Rock
    -Playlist original: S??
    -Duraci??n: 0h 14min
    -Canciones:
      Satisfaction
      Payphone
      Lost Stars
      God gave me everything`);
  });
  it('lista.showInfo(2)', () => {
    lista.addSong(paradise);
    expect(lista.showInfo(2)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Rock,Pop
    -Playlist original: S??
    -Duraci??n: 0h 18min
    -Canciones:
      Lost Stars
      Payphone
      God gave me everything
      Visions of paradise
      Satisfaction`);
  });
  it('lista.showInfo(3)', () => {
    lista.deleteSong(god);
    lista.addSong(god);
    expect(lista.showInfo(3)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Pop,Rock
    -Playlist original: S??
    -Duraci??n: 0h 18min
    -Canciones:
      Satisfaction
      Visions of paradise
      God gave me everything
      Payphone
      Lost Stars`);
  });
  it('lista.showInfo(4)', () => {
    lista.deleteSong(god);
    lista.addSong(god);
    expect(lista.showInfo(4)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Rock,Pop
    -Playlist original: S??
    -Duraci??n: 0h 18min
    -Canciones:
      Satisfaction
      Visions of paradise
      God gave me everything
      Payphone
      Lost Stars`);
  });
  it('lista.showInfo(5)', () => {
    lista.deleteSong(god);
    lista.addSong(god);
    expect(lista.showInfo(5)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Rock,Pop
    -Playlist original: S??
    -Duraci??n: 0h 18min
    -Canciones:
      Lost Stars
      Payphone
      Visions of paradise
      God gave me everything
      Satisfaction`);
  });
  it('lista.showInfo(6)', () => {
    lista.deleteSong(paradise);
    expect(lista.showInfo(6)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Pop,Rock
    -Playlist original: S??
    -Duraci??n: 0h 14min
    -Canciones:
      Lost Stars
      God gave me everything
      Payphone
      Satisfaction`);
  });
  it('lista.showInfo(7)', () => {
    lista.deleteSong(god);
    lista.addSong(god);
    expect(lista.showInfo(7)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Pop,Rock
    -Playlist original: S??
    -Duraci??n: 0h 14min
    -Canciones:
      Payphone
      Satisfaction
      God gave me everything
      Lost Stars`);
  });
  it('lista.showInfo(8)', () => {
    expect(lista.showInfo(8)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Pop,Rock
    -Playlist original: S??
    -Duraci??n: 0h 14min
    -Canciones:
      Payphone
      Lost Stars
      Satisfaction
      God gave me everything`);
  });
  it('lista.showInfo(9)', () => {
    lista.deleteSong(lost);
    lista.addSong(lost);
    expect(lista.showInfo(9)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Pop,Rock
    -Playlist original: S??
    -Duraci??n: 0h 14min
    -Canciones:
      Satisfaction
      God gave me everything
      Payphone
      Lost Stars`);
  });
  it('lista.showInfo(10)', () => {
    lista.deleteSong(payphone);
    lista.addSong(payphone);
    expect(lista.showInfo(10)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Rock,Pop
    -Playlist original: S??
    -Duraci??n: 0h 14min
    -Canciones:
      Lost Stars
      God gave me everything
      Payphone
      Satisfaction`);
  });
  it('lista.showInfo(11)', () => {
    lista.deleteSong(payphone);
    lista.addSong(payphone);
    expect(lista.showInfo(11)).to.be.equal(`PLAYLIST MiLista
    -G??neros: Pop,Rock
    -Playlist original: S??
    -Duraci??n: 0h 14min
    -Canciones:
      Satisfaction
      God gave me everything
      Payphone
      Lost Stars`);
  });
});