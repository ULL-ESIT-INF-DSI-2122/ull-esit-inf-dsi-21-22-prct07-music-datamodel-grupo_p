import 'mocha';
import {expect} from 'chai';
import {Song, Duration} from '../../src/Basics/Song';


describe('Pruebas de la clase Song', () => {
  let MarshallMatter: Song;
  let LaVieEnRose: Song;
  before( function() {
    const dateMarshall = new Date('2000-05-23');
    const durationMarshall: Duration = [3, 53];
    MarshallMatter = new Song('Marhall Matter', 'Eminen', durationMarshall, ['Rap'], dateMarshall, false, 1500 );
    LaVieEnRose = new Song('Erróneo', 'No se sabe', durationMarshall, ['Rap'], dateMarshall, false, 1500 );
  });
  it('Name of the "Marhall Matter"', () => {
    expect(MarshallMatter.getName()).to.be.equal('Marhall Matter');
  });
  it('Author of the Song "Eminen"', () => {
    expect(MarshallMatter.getAuthorName()).to.be.equal('Eminen');
  });
  it('Time of the Song Marshall', () => {
    expect(MarshallMatter.getDuration()).to.be.eql([3, 53]);
  });
  it('Genre to belong it the song Marshall', () => {
    expect(MarshallMatter.getGenres()).to.be.eql(['Rap']);
  });
  it('Publication date of Song Marshall', () => {
    let resultDate: Date = new Date('2000-5-23');
    expect(MarshallMatter.getPublicationDate()).to.be.eql(resultDate);
  });
  it('¿Song released as single? Answer is FALSE', () => {
    expect(MarshallMatter.getIsSingle()).to.be.equal(false);
  });
  it('Number reproductions of the song Marshall Matter', () => {
    expect(MarshallMatter.getReproductions()).to.be.equal(1500);
  });
  it(`Edit Name of La vie en Rose'`, () => {
    LaVieEnRose.setName('La vie en rose');
    expect(LaVieEnRose.getName()).to.be.equal('La vie en rose');
  });
  it(`Edit name author of the song La vie en rose. From "No se sabe" to "Louis Armstrong"'`, () => {
    LaVieEnRose.setAuthorName('Louis Armstrong');
    expect(LaVieEnRose.getAuthorName()).to.be.equal('Louis Armstrong');
  });
  it(`Edit duration of the song La vie en rose. From "[3,53]" to "[2,55]"'`, () => {
    const durationLaVieEnRose: Duration = [2, 55];
    LaVieEnRose.setDuration(durationLaVieEnRose);
    expect(LaVieEnRose.getDuration()).to.be.eql([2, 55]);
  });
  it(`Edit genre of the song La vie en rose. From "Rap" to "Jazz"'`, () => {
    LaVieEnRose.setGenres(['Jazz']);
    expect(LaVieEnRose.getGenres()).to.be.eql(['Jazz']);
  });
  it(`Edit date publication of the song La vie en rose.`, () => {
    const dateLaVieEnRose = new Date('1950-06-20');
    LaVieEnRose.setDatePublication(dateLaVieEnRose);
    expect(LaVieEnRose.getPublicationDate()).to.be.equal(dateLaVieEnRose);
  });
  it(`Edit single of the song La vie en rose.`, () => {
    LaVieEnRose.setIsSingle(true);
    expect(LaVieEnRose.getIsSingle()).to.be.equal(true);
  });
  it(`Edit reproductions of the song La vie en rose.`, () => {
    LaVieEnRose.setReproductions(50000);
    expect(LaVieEnRose.getReproductions()).to.be.equal(50000);
  });
  it(`Show info of the song La vie en rose.`, () => {
    expect(LaVieEnRose.showInfo()).to.be.equal(`CANCIÓN La vie en rose\n    -Autor: Louis Armstrong\n    -Duración: 2min 55s\n`+
    `    -Género/s: Jazz\n    -Single: Si\n    -Numero de reproducciones: 50000`);
  });
});