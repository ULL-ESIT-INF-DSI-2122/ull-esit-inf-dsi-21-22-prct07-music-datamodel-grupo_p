import 'mocha';
import {expect} from 'chai';
import {genrer, MusicGenre} from '../../src/clasesBase/MusicGenre';
import * as prueba from '../../src/exportPruebas/exportPruebas';

describe('Pruebas de la clase MusicGenre', () => {
  const gpop = genrer.pop;
  it('new MusicGenre(\'Pop\', [\'Michael Jackson\'], [\'Thriller\'], [\'Billie Jean\']) is not equal null', () => {
    expect(prueba.genrerData).not.to.be.equal(null);
  });
});