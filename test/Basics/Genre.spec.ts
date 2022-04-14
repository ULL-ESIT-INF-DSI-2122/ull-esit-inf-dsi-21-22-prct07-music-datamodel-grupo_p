import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/Basics/Genre';
import {ArtistManager} from '../../src/Managers/ArtistManager';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {SongManager} from '../../src/Managers/SongManager';
import {Artist} from '../../src/Basics/Artist';
import {GroupManager} from '../../src/Managers/GroupManager';
import {Song} from '../../src/Basics/Song';
import {Group} from '../../src/Basics/Group';
import {Album} from '../../src/Basics/Album';

describe('Pruebas de la clase Genre', () => {
  let testGenre: Genre;
  let levine: Artist;
  let rolling: Group;
  let overexposed: Album;
  let heads: Album;
  let lost: Song;
  let satisfaction: Song;
  let artistManager: ArtistManager;
  let groupManager: GroupManager;
  let albumManager: AlbumManager;
  let songManager: SongManager;
  before(function() {
    artistManager = ArtistManager.getArtistManager();
    groupManager = GroupManager.getGroupManager();
    albumManager = AlbumManager.getAlbumManager();
    songManager = SongManager.getSongManager();
    levine = artistManager.searchByName('Adam Levine');
    rolling = groupManager.searchByName('The Rolling Stones');
    overexposed = albumManager.searchByName('Overexposed');
    heads = albumManager.searchByName('Out Of Our Heads');
    lost = songManager.searchByName('Lost Stars');
    satisfaction = songManager.searchByName('Satisfaction');
    testGenre = new Genre('Test Genre', [levine], [overexposed], [lost]);
  });
  it(`new Genre('Test Genre', [levine], [overexposed], [lost]) is not equal null`, () => {
    expect(new Genre('Test Genre', [levine], [overexposed], [lost])).not.to.be.equal(null);
  });
  it(`testGenre.getName() returns 'Test Genre'`, () => {
    expect(testGenre.getName()).to.be.equal('Test Genre');
  });
  it(`testGenre.setName('GenreForTest') sets the name to 'GenreForTest'`, () => {
    testGenre.setName('GenreForTest');
    expect(testGenre.getName()).to.be.equal('GenreForTest');
  });
  it('testGenre.getMusicians() returns levine', () => {
    expect(testGenre.getMusicians()).to.be.eql([levine]);
  });
  it('testGenre.setMusicians([rolling]) sets the musician array to [rolling]', () => {
    testGenre.setMusicians([rolling]);
    expect(testGenre.getMusicians()).to.be.eql([rolling]);
  });
  it('testGenre.addMusician(levine) adds levine to the musician array', () => {
    testGenre.addMusician(levine);
    expect(testGenre.getMusicians()).to.be.eql([rolling, levine]);
  });
  it('testGenre.addMusician(levine) not adds levine to the musician array', () => {
    testGenre.addMusician(levine);
    expect(testGenre.getMusicians()).to.be.eql([rolling, levine]);
  });
  it('testGenre.deleteMusician(rolling) deletes rolling from the musician array', () => {
    testGenre.deleteMusician(rolling);
    expect(testGenre.getMusicians()).to.be.eql([levine]);
  });
  it(`testGenre.deleteMusician(rolling) doesn't deletes any musician from the musician array`, () => {
    testGenre.deleteMusician(rolling);
    expect(testGenre.getMusicians()).to.be.eql([levine]);
  });
  it('testGenre.getAlbums() returns [overexposed]', () => {
    expect(testGenre.getAlbums()).to.be.eql([overexposed]);
  });
  it('testGenre.setAlbums([heads]) sets the album array to [heads]', () => {
    testGenre.setAlbums([heads]);
    expect(testGenre.getAlbums()).to.be.eql([heads]);
  });
  it('testGenre.addAlbum(overexposed) adds overexposed to the album array', () => {
    testGenre.addAlbum(overexposed);
    expect(testGenre.getAlbums()).to.be.eql([heads, overexposed]);
  });
  it('testGenre.addAlbum(overexposed) not adds overexposed to the album array', () => {
    testGenre.addAlbum(overexposed);
    expect(testGenre.getAlbums()).to.be.eql([heads, overexposed]);
  });
  it('testGenre.deleteAlbum(heads) deletes heads from the album array', () => {
    testGenre.deleteAlbum(heads);
    expect(testGenre.getAlbums()).to.be.eql([overexposed]);
  });
  it(`testGenre.deleteAlbum(heads) does'nt deletes any album from the album array`, () => {
    testGenre.deleteAlbum(heads);
    expect(testGenre.getAlbums()).to.be.eql([overexposed]);
  });
  it('testGenre.getSongs() returns [lost]', () => {
    expect(testGenre.getSongs()).to.be.eql([lost]);
  });
  it('testGenre.setSongs([satisfaction]) sets the song array to [satisfaction]', () => {
    testGenre.setSongs([satisfaction]);
    expect(testGenre.getSongs()).to.be.eql([satisfaction]);
  });
  it('testGenre.addSong(lost) adds lost to the song array', () => {
    testGenre.addSong(lost);
    expect(testGenre.getSongs()).to.be.eql([satisfaction, lost]);
  });
  it('testGenre.addSong(lost) not adds lost to the song array', () => {
    testGenre.addSong(lost);
    expect(testGenre.getSongs()).to.be.eql([satisfaction, lost]);
  });
  it('testGenre.deleteSong(satisfaction) deletes satisfaction from the song array', () => {
    testGenre.deleteSong(satisfaction);
    expect(testGenre.getSongs()).to.be.eql([lost]);
  });
  it(`testGenre.deleteSong(satisfaction) doesn't deletes any song from the song array`, () => {
    testGenre.deleteSong(satisfaction);
    expect(testGenre.getSongs()).to.be.eql([lost]);
  });
  it('testGenre.showInfo()', () => {
    expect(testGenre.showInfo()).to.be.equal(`GÉNERO GenreForTest
    -Grupos/Artistas:
      Adam Levine
    -Álbums:
      Overexposed
    -Canciones:
      Lost Stars`);
  });
});