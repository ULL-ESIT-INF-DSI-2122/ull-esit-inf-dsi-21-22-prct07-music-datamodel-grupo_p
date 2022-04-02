import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/Basics/Genre';

describe('Pruebas de la clase Genre', () => {
  it('new Genre(\'Pop\', [\'Michael Jackson\'], [\'Thriller\'], [\'Billie Jean\']) is not equal null', () => {
    expect(new Genre('Pop', [], [], [])).not.to.be.equal(null);
  });
});