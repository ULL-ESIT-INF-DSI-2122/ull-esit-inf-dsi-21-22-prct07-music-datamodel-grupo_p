import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/Basics/Genre';
import {GenreManager} from '../../src/Managers/GenreManager';

describe('Pruebas de la clase GenreManager', () => {
  let genreManager: GenreManager;
  let rock: Genre;
  before(function() {
    genreManager = GenreManager.getGenreManager();
    rock = genreManager.searchByName('Rock');
  });
  it(`GenreManager.getGenreManager() is not equal null`, () => {
    expect(GenreManager.getGenreManager()).not.to.be.equal(null);
  });
  it(`genreManager.removeGenre(rock) removes rock from the genre collection`, () => {
    genreManager.remove(rock);
    expect(genreManager.searchByName('Rock')).to.be.equal(undefined);
  });
  it(`genreManager.addGenre(rock) adds rock to the genre collection`, () => {
    genreManager.add(rock);
    expect(genreManager.searchByName('Rock')).to.be.equal(rock);
  });
  it(`genreManager.getGenreByName('Rock') returns rock`, () => {
    expect(genreManager.searchByName('Rock')).to.be.equal(rock);
  });
});