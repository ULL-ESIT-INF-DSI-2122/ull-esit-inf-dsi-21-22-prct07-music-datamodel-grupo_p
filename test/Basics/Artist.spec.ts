import 'mocha';
import {expect} from 'chai';
import {Artist} from '../../src/clasesBase/Artist';

describe('Test clase base artista', () => {
  it('Se comprueba que se crea un objeto artista correctamente', () => {
    expect(artista instanceof Artist).to.be.true;
  });
  it('Se comprueban metodos getter de los atributos', () => {
    expect(artista.getName()).to.be.eq('EdSheran');
    expect(artista.getGenres()).to.be.eq(['pop', 'dance']);
    expect(artista.getAlbums()).to.be.eq(['album1']);
    expect(artista.getSongs()).to.be.eq(['Shivers', 'shape of you']);
    expect(artista.getGroups()).to.be.eq(['Band']);
  });
  it('Se comprueban metodos setter de los atributos', () => {
    artista.setName('ed sheran');
    expect(artista.getName()).to.be.eq('ed sheran');

    artista.setGenres(['rock', 'classic']);
    expect(artista.getGenres()).to.be.eq(['rock', 'classic']);

    artista.setAlbums(['alb1', 'alb2', 'alb3']);
    expect(artista.getAlbums()).to.be.eq(['alb1', 'alb2', 'alb3']);

    artista.setSongs(['son1']);
    expect(artista.getSongs()).to.be.eq(['son1']);

    artista.setGroups('ed sheran');
    expect(artista.getGroups()).to.be.eq(['Band']);
  });
});
