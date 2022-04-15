import 'mocha';
import {expect} from 'chai';
import {ArtistManager} from '../../src/Managers/ArtistManager';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {SongManager} from '../../src/Managers/SongManager';
import {Artist} from '../../src/Basics/Artist';
import {Song} from '../../src/Basics/Song';
import {Album} from '../../src/Basics/Album';

describe('Pruebas de la clase Artist Manager', () => {
  let MickJaggerEdit: Artist;
  let album1: Album;
  let grupo: string;
  let genero: string;
  let cancion1: Song;
  let cancion2: Song;
  let albumManager: AlbumManager;
  let songManager: SongManager;
  let artistManager: ArtistManager;
  before(function() {
    songManager = SongManager.getSongManager();
    albumManager = AlbumManager.getAlbumManager();
    artistManager = ArtistManager.getArtistManager();
    album1 = albumManager.searchByName('Goddess in the Doorway');
    cancion1 = songManager.searchByName('God gave me everything');
    cancion2 = songManager.searchByName('Visions of paradise');
    grupo = 'The Rolling Stones';
    genero = 'Rock';
    MickJaggerEdit = new Artist('Mick Jagger E', [grupo], [genero], [album1], [cancion1, cancion2]);
    songManager.addSong(cancion1);
    songManager.addSong(cancion2);
    albumManager.addAlbum(album1);
    artistManager.addArtist(MickJaggerEdit);
  });
  it(`Artist.getArtistManager() is not equal null`, () => {
    expect(artistManager).not.to.be.equal(null);
  });
  it(`Add artist to collection`, () => {
    artistManager.addArtist(MickJaggerEdit);
    expect(artistManager.getList().includes('Mick Jagger')).to.be.eql(true);
  });
  it(`Edit artist`, () => {
    artistManager.editArtist(MickJaggerEdit, 'test', [grupo], [genero], [album1], [cancion1]);
    expect(artistManager.getList().includes('test')).to.be.eql(true);
    expect(artistManager.getList().includes('Mick Jagger E')).to.be.eql(false);
  });
  it(`Remove artist to collection`, () => {
    artistManager.deleteArtist(MickJaggerEdit);
    expect(artistManager.getList().includes('Mick Jagger E')).to.be.eql(false);
  });
});
