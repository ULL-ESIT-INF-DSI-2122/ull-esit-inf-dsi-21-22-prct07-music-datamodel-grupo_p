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
  it(`playlistManager.update() deletes empty playlists`, () => {
    playlistManager.add(new Playlist('EmptyPlaylist', []));
    playlistManager.update();
    expect(playlistManager.searchByName('EmptyPlaylist')).to.be.equal(undefined);
  });
  it(`playlistManager.getPlaylistByName('MyPlaylist') returns list`, () => {
    expect(playlistManager.searchByName('MyPlaylist')).to.be.equal(list);
    playlistManager.update();
  });
});