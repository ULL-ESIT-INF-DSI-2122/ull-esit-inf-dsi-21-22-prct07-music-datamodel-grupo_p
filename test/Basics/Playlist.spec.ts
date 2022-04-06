import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../../src/clasesBase/Playlist';
import * as prueba from '../../src/exportPruebas/exportPruebas';

describe('Pruebas de la clase MusicGenre', () => {
  // let pop: MusicGenre;
  // before(function() {
  //   pop = new MusicGenre('Pop', ['Michael Jackson'], ['Thriller'], ['Billie Jean']);
  // });
  it('Playlist(\'The king of pop\', [\'Michael Jackson\'], [0, 2], [pop]) is not equal null', () => {
    expect(new Playlist('The king of pop', [prueba.song1, prueba.song2], [prueba.genrerData])).not.to.be.equal(null);
  });
});