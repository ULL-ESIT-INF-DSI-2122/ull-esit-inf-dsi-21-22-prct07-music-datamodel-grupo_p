import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/Basics/Genre';
import {GenreManager} from '../../src/Managers/GenreManager';

describe('Pruebas de la clase GenreManager', () => {
  let genreManager: GenreManager;
  let pop: Genre;
  let rock: Genre;
  before(function() {
    genreManager = GenreManager.getGenreManager();
    pop = genreManager.searchByName('Pop');
    rock = genreManager.searchByName('Rock');
  });
  it(`GenreManager.getGenreManager() is not equal null`, () => {
    expect(GenreManager.getGenreManager()).not.to.be.equal(null);
  });
  it(`genreManager.removeGenre(rock) removes rock from the genre collection`, () => {
    genreManager.remove(rock);
    expect(genreManager.getList().includes('Rock')).to.be.equal(false);
  });
  it(`genreManager.addGenre(rock) adds rock to the genre collection`, () => {
    genreManager.add(pop);
    expect(genreManager.searchByName('Pop')).to.be.equal(pop);
  });
  it(`genreManager.getGenreByName('Rock') returns rock`, () => {
    expect(genreManager.searchByName('Rock')).to.be.equal(rock);
  });
});