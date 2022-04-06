import 'mocha';
import {expect, should, assert} from 'chai';
import * as prueba from '../../src/exportPruebas/exportPruebas';


describe('Pruebas de la clase Song', () => {
  it('géneros a los que pertenece la cancion', () => {
    assert.typeOf( prueba.album1.getWhoPublishes(), 'object');
  });
  it('nombre quien publica: "the beatles"', () => {
    expect(prueba.album1.getWhoPublishesName()).to.be.equal('the beatles');
  });
  it('datos del album 1: "ALBUM Hey jude\n    Artista o grupo que lo publico: the beatles\n    Año de publicacion: 1960\n    Generos que contiene este album: rock\n    Canciones de este genero:  dont let me down, dos"', () => {
    expect(prueba.album1.print()).to.be.eql('ALBUM Hey jude\n    Artista o grupo que lo publico: the beatles\n    Año de publicacion: 1960\n    Generos que contiene este album: rock\n    Canciones de este genero:  dont let me down, dos');
  });
});