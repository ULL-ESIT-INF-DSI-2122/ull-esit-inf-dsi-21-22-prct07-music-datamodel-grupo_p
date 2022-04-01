import 'mocha';
import {expect} from 'chai';
import {MusicGenre} from '../../src/Basics/MusicGenre';

describe('Pruebas de la clase MusicGenre', () => {
  it('new MusicGenre(\'Pop\', [\'Michael Jackson\'], [\'Thriller\'], [\'Billie Jean\']) is not equal null', () => {
    expect(new MusicGenre('Pop', ['Michael Jackson'], ['Thriller'], ['Billie Jean'])).not.to.be.equal(null);
  });
});