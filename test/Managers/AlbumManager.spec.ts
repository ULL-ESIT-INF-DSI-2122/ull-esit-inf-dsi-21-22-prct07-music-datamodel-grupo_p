import 'mocha';
import {expect} from 'chai';
import {Album} from '../../src/Basics/Album';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {SongManager} from '../../src/Managers/SongManager';

describe('Pruebas de la clase AlbumManager', () => {
  let albumManager: AlbumManager;
  let song = SongManager.getSongManager();
  albumManager = AlbumManager.getAlbumManager();
  let DigoLoQuePienso = song.searchByName('Digo lo que pienso');
  const AmericanRecordings = new Album('American', 'No se sabe', 2001, ['Rap'], [DigoLoQuePienso]);
  it(`Add  "American" album to the collection`, () => {
    albumManager.add(AmericanRecordings);
    expect(albumManager.searchByName('American')).to.be.equal(AmericanRecordings);
  });
  it(`Removes "American" album from the collection`, () => {
    albumManager.remove(AmericanRecordings);
    expect(albumManager.getList().includes('American')).to.be.equal(false);
  });
});