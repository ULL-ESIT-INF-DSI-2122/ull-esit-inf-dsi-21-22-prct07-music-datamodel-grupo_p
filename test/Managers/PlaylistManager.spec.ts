import 'mocha';
import {expect} from 'chai';
import {PlaylistManager} from '../../src/Managers/PlaylistManager';
import {Playlist} from '../../src/Basics/Playlist';

describe('Pruebas de la clase PlaylistManager', () => {
  let list: Playlist;
  let playlistManager: PlaylistManager = PlaylistManager.getPlaylistManager();
  before(function() {
    list = playlistManager.searchByName('MyPlaylist');
  });
  it(`PlaylistManager.getPlaylistManager() is not equal null`, () => {
    expect(PlaylistManager.getPlaylistManager()).not.to.be.equal(null);
  });
  it(`playlistManager.removePlaylist(list) removes list from the genre collection`, () => {
    playlistManager.remove(list);
    expect(playlistManager.searchByName('MyPlaylist')).to.be.equal(undefined);
  });
  it(`playlistManager.addPlaylist(list) adds list to the genre collection`, () => {
    playlistManager.add(list);
    expect(playlistManager.searchByName('MyPlaylist')).to.be.equal(list);
  });
  it(`playlistManager.getPlaylistByName('MyPlaylist') returns list`, () => {
    expect(playlistManager.searchByName('MyPlaylist')).to.be.equal(list);
    playlistManager.updateGenre();
  });
});