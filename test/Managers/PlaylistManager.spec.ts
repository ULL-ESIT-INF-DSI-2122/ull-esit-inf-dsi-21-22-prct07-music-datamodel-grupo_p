import 'mocha';
import {expect} from 'chai';
import {PlaylistManager} from '../../src/Managers/PlaylistManager';
import {Playlist} from '../../src/Basics/Playlist';

describe('Pruebas de la clase PlaylistManager', () => {
  let list: Playlist;
  let lista: Playlist;
  let playlistManager: PlaylistManager = PlaylistManager.getPlaylistManager();
  before(function() {
    list = playlistManager.searchByName('MyPlaylist');
    lista = playlistManager.searchByName('MiLista');
  });
  it(`PlaylistManager.getPlaylistManager() is not equal null`, () => {
    expect(PlaylistManager.getPlaylistManager()).not.to.be.equal(null);
  });
  it(`playlistManager.removePlaylist(list) removes list from the genre collection`, () => {
    playlistManager.remove(list);
    expect(playlistManager.getCollection()).to.be.eql(new Set<Playlist>([lista]));
  });
  it(`playlistManager.addPlaylist(list) adds list to the genre collection`, () => {
    playlistManager.add(list);
    expect(playlistManager.getCollection()).to.be.eql(new Set<Playlist>([lista, list]));
  });
  it(`playlistManager.getPlaylistByName('MyPlaylist') returns list`, () => {
    expect(playlistManager.searchByName('MyPlaylist')).to.be.equal(list);
    playlistManager.update();
  });
});