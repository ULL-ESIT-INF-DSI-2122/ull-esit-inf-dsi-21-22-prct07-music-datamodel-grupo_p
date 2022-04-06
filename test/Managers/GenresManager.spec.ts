import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/Basics/Genre';
import {GenresManager} from '../../src/Managers/GenresManager';

describe('Pruebas de la clase GenresManager', () => {
  let manager: GenresManager;
  let reggeaton: Genre;
  let rock: Genre;
  before(function() {
    reggeaton = new Genre('Reggeaton', ['Bad Bunny'], ['Threaller'], ['Imagine']);
    rock = new Genre('Rock', ['Queen'], ['Threaller'], ['Imagine']);
    manager = GenresManager.getGenresManager();
  });
  it(`GenresManager.getGenresManager() is not equal null`, () => {
    expect(GenresManager.getGenresManager()).not.to.be.equal(null);
  });
  it(`manager.addGenre(rock) and manager.addGenre(reggeaton) adds rock and reggeaton to the genre collection`, () => {
    manager.addGenre(rock);
    manager.addGenre(reggeaton);
    expect(manager.getCollection()).to.be.eql(new Set<Genre>([rock, reggeaton]));
  });
  it(`manager.removeGenre(rock) removes pop from the genre collection`, () => {
    manager.removeGenre(rock);
    expect(manager.getCollection()).to.be.eql(new Set<Genre>([reggeaton]));
  });
  it(`manager.editGenre(reggeaton, 'Reggeaton', ['Bad Bunny', 'Ozuna'], ['Threaller'], ['Imagine'])`+
      ` edits reggeaton attributes`, () => {
    manager.editGenre(reggeaton, 'Reggeaton', ['Bad Bunny', 'Ozuna'], ['Threaller'], ['Imagine']);
    reggeaton = new Genre('Reggeaton', ['Bad Bunny', 'Ozuna'], ['Threaller'], ['Imagine']);
    expect(manager.getCollection()).to.be.eql(new Set<Genre>([reggeaton]));
  });
  it(`manager.updateMusician('Bad Bunny', ['Rock']) removes removes Bad Bunny from reggeaton and `+
      `adds it to rock`, () => {
    manager.addGenre(rock);
    manager.updateMusician('Bad Bunny', ['Rock']);
    reggeaton = new Genre('Reggeaton', ['Ozuna'], ['Threaller'], ['Imagine']);
    rock = new Genre('Rock', ['Queen', 'Bad Bunny'], ['Threaller'], ['Imagine']);
    expect(manager.getCollection()).to.be.eql(new Set<Genre>([reggeaton, rock]));
  });
  it(`manager.removeGenre() to removes test genres`, () => {
    manager.removeGenre(rock);
    manager.removeGenre(reggeaton);
  });
});