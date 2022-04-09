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
    pop = genreManager.getGenreByName('Pop') as Genre;
    rock = genreManager.getGenreByName('Rock') as Genre;
  });
  it(`GenreManager.getGenreManager() is not equal null`, () => {
    expect(GenreManager.getGenreManager()).not.to.be.equal(null);
  });
  it(`genreManager.removeGenre(rock) removes rock from the genre collection`, () => {
    genreManager.removeGenre(rock);
    expect(genreManager.getCollection()).to.be.eql(new Set<Genre>([pop]));
  });
  it(`genreManager.addGenre(rock) adds rock to the genre collection`, () => {
    genreManager.addGenre(rock);
    expect(genreManager.getCollection()).to.be.eql(new Set<Genre>([pop, rock]));
  });
  it(`genreManager.getGenreByName('Rock') returns rock`, () => {
    expect(genreManager.getGenreByName('Rock')).to.be.equal(rock);
  });
});