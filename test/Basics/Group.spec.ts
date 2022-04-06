import 'mocha';
import {expect} from 'chai';
import {Group} from '../../src/clasesBase/Group';

describe('Test clase base artista', () => {
  it('Se comprueba que se crea un objeto artista correctamente', () => {
    expect(group instanceof Group).to.be.true;
  });
  it('Se comprueban metodos getter de los atributos', () => {
    expect(group.getName()).to.be.eq('Imagin Dragon');
    expect(group.getGenres()).to.be.eq(['pop rock']);
    expect(group.getAlbums()).to.be.eq(['Evolve', 'Origins']);
    expect(group.getArtists()).to.be.eq(['Dan Reynolds', 'Ben McKee']);
    expect(group.getYearCreation()).to.be.eq(2008);
  });
});
