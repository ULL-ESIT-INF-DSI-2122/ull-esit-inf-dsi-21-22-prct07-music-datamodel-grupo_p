import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../../src/Basics/Playlist';

describe('Pruebas de la clase MusicGenre', () => {
  before(function() {
  });
  it('Playlist(\'The king of pop\', [\'Michael Jackson\'], [0, 2], [pop]) is not equal null', () => {
    expect(new Playlist('The king of pop', [])).not.to.be.equal(null);
  });
});