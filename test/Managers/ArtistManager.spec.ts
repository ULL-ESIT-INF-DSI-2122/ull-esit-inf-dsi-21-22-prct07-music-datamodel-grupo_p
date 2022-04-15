import 'mocha';
import {expect} from 'chai';
import {ArtistManager} from '../../src/Managers/ArtistManager';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {SongManager} from '../../src/Managers/SongManager';
import {Artist} from '../../src/Basics/Artist';
import {Song} from '../../src/Basics/Song';

describe('Pruebas de la clase Artist Manager', () => {
  let LaVieEnRose: Song;
  let artistManager: ArtistManager;
  let songManager = SongManager.getSongManager();
  let albumManager = AlbumManager.getAlbumManager();
  let WhatAWorderfulWorld = albumManager.searchByName('What A Wonderful World');
  artistManager = ArtistManager.getArtistManager();
  LaVieEnRose = songManager.searchByName('La vie en rose');
  const testArtist = new Artist('TestArtist', ['Hot Five'], ['Jazz'], [WhatAWorderfulWorld], [LaVieEnRose] );
  it(`GenreManager.getGenreManager() is not equal null`, () => {
    expect(artistManager).not.to.be.equal(null);
  });
  it(`Add "Louis armstrong" to collection`, () => {
    artistManager.add(testArtist);
    expect(artistManager.getList().includes('TestArtist')).to.be.eql(true);
  });
  it(`Remove "Louis Armstrong" to collection`, () => {
    artistManager.remove(testArtist);
    expect(artistManager.getList().includes('TestArtist')).to.be.eql(false);
  });
});