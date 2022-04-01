import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../../src/Basics/Playlist';
import {MusicGenre} from '../../src/Basics/MusicGenre';

describe('Pruebas de la clase MusicGenre', () => {
  let pop: MusicGenre;
  before(function() {
    pop = new MusicGenre('Pop', ['Michael Jackson'], ['Thriller'], ['Billie Jean']);
  });
  it('Playlist(\'The king of pop\', [\'Michael Jackson\'], [0, 2], [pop]) is not equal null', () => {
    expect(new Playlist('The king of pop', ['Michael Jackson'], [0, 2], [pop])).not.to.be.equal(null);
  });
});