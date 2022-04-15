/*
import 'mocha';
import {expect} from 'chai';
import {SongManager} from '../../src/Managers/SongManager';
import {Song, Duration} from '../../src/Basics/Song';

describe('Pruebas de la clase Song Manager', () => {
  let songManager: SongManager;
  let LaVieEnRose: Song;
  songManager = SongManager.getSongManager();
  const dateLaVieEnRose = new Date('2000-05-23');
  const durationLaVieEnRose: Duration = [3, 53];
  LaVieEnRose = new Song('La vie en rose', 'Louis Armstrong', durationLaVieEnRose, ['Rap'], dateLaVieEnRose, false, 150000 );
  it(`SongManager.getSongManager() is not equal null`, () => {
    expect(SongManager.getSongManager()).not.to.be.equal(null);
  });
  it(`Add "La Vie En Rose" to collection`, () => {
    songManager.add(LaVieEnRose);
    expect(songManager.searchByName('La vie en rose')).to.be.eql(LaVieEnRose);
  });
  it(`Remove "La Vie En Rose" to collection`, () => {
    songManager.remove(LaVieEnRose);
    expect(songManager.getList().includes('La vie en rose')).to.be.eql(false);
  });
});
*/