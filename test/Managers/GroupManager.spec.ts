/*
import 'mocha';
import {expect} from 'chai';
import {ArtistManager} from '../../src/Managers/ArtistManager';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {Artist} from '../../src/Basics/Artist';
import {Album} from '../../src/Basics/Album';
import {Group} from '../../src/Basics/Group';
import {GroupManager} from '../../src/Managers/GroupManager';

describe('Pruebas de la clase Artist Manager', () => {
  let Maroon5Edit: Group;
  let album1: Album;
  let artista: Artist;
  let genero: string;
  let albumManager: AlbumManager;
  let groupManager: GroupManager;
  let artistManager: ArtistManager;
  before(function() {
    albumManager = AlbumManager.getAlbumManager();
    artistManager = ArtistManager.getArtistManager();
    groupManager = GroupManager.getGroupManager();
    album1 = albumManager.searchByName('Overexposed');
    artista = artistManager.searchByName('Adam Levine');
    genero = 'Pop';
    Maroon5Edit = new Group('Maaron 5 edit', [artista], 2005, [genero], [album1]);
    albumManager.addAlbum(album1);
    artistManager.addArtist(artista);
    groupManager.addGroup(Maroon5Edit);
  });
  it(`Group.getGroupManager() is not equal null`, () => {
    expect(groupManager).not.to.be.equal(null);
  });
  it(`Add group to collection`, () => {
    expect(groupManager.getList().includes('Maroon 5 edit')).to.be.eql(true);
  });
  it(`Edit group`, () => {
    groupManager.editGroup(Maroon5Edit, 'testGrupo', [artista], 2010, [genero], [album1]);
    expect(groupManager.getList().includes('testGrupo')).to.be.eql(true);
    expect(groupManager.getList().includes('Mick Jagger E')).to.be.eql(false);
  });
  it(`Remove group to collection`, () => {
    groupManager.deleteGroup(Maroon5Edit);
    expect(groupManager.getList().includes('testGrupo')).to.be.eql(false);
  });
});
*/