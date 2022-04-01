import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../../src/Clases base/Playlist';
import {MusicGenre} from '../../src/Clases base/MusicGenre';

describe('Pruebas de la clase MusicGenre', () => {
  let pop: MusicGenre;
  before(function() {
    pop = new MusicGenre('Pop', ['Michael Jackson'], ['Thriller'], ['Billie Jean']);
  });
  it('Playlist(\'The king of pop\', [\'Michael Jackson\'], [0, 2], [pop]) is not equal null', () => {
    expect(new Playlist('The king of pop', ['Michael Jackson'], [pop])).not.to.be.equal(null);
  });
});