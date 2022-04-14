/* import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/Basics/Genre';
import {GenreManager} from '../../src/Managers/GenreManager';
import {Group} from '../../src/Basics/Group';
import {Album} from '../../src/Basics/Album';
import {GroupManager} from '../../src/Managers/GroupManager';
import {AlbumManager} from '../../src/Managers/AlbumManager';
import {SongManager} from '../../src/Managers/SongManager';
import {ArtistManager} from '../../src/Managers/ArtistManager';
import {Song} from '../../src/Basics/Song';
import {Artist} from '../../src/Basics/Artist';

describe('Pruebas de la clase GenreManager', () => {
  let genreManager: GenreManager;
  let testGenre: Genre;
  let testGenre2: Genre;
  let testGenre3: Genre;
  let testGenre4: Genre;
  let editedGenre: Genre;
  let editedGenre2: Genre;
  let testSong: Song;
  let testSong2: Song;
  let testSong3: Song;
  let testSong4: Song;
  let testSong5: Song;
  let testSong6: Song;
  let testAlbum: Album;
  let testAlbum2: Album;
  let testAlbum3: Album;
  let testAlbum4: Album;
  let testArtist: Artist;
  let testArtist2: Artist;
  let testArtist3: Artist;
  let testArtist4: Artist;
  let testGroup: Group;
  let testGroup2: Group;
  let rolling: Group;
  let heads: Album;
  let levine: Artist;
  let satisfaction: Song;
  let groupManager: GroupManager;
  let albumManager: AlbumManager;
  let songManager: SongManager;
  let artistManager: ArtistManager;
  before(function() {
    artistManager = ArtistManager.getArtistManager();
    genreManager = GenreManager.getGenreManager();
    groupManager = GroupManager.getGroupManager();
    albumManager = AlbumManager.getAlbumManager();
    songManager = SongManager.getSongManager();
    levine = artistManager.searchByName('Adam Levine');
    rolling = groupManager.searchByName('The Rolling Stones');
    heads = albumManager.searchByName('Out Of Our Heads');
    satisfaction = songManager.searchByName('Satisfaction');
    // TESTS OBJECTS FOR DELETEGENRE
    // TestSongs
    testSong = new Song('TestSong', 'TetsArtist', [0, 0], ['TestGenre'], new Date('2002-11-22'), true, 0);
    testSong2 = new Song('TestSong2', 'TetsArtist2', [0, 0], ['TestGenre2'], new Date('2002-11-22'), true, 0);
    testSong3 = new Song('TestSong3', 'TetsGroup', [0, 0], ['TestGenre2'], new Date('2002-11-22'), true, 0);
    // TestAlbums
    testAlbum = new Album('TestAlbum', 'TestGroup', 2022, ['TestGenre'], [testSong2]);
    testAlbum2 = new Album('TestAlbum2', 'TestGroup', 2022, ['TestGenre2'], [testSong3]);
    // TestArtists
    testArtist = new Artist('TetsArtist', ['TestGroup'], ['TestGenre'], [testAlbum2], [testSong3]);
    testArtist2 = new Artist('TetsArtist2', ['TestGroup'], ['TestGenre2'], [testAlbum2], [testSong3]);
    // TestGroups
    testGroup = new Group('TestGroup', [testArtist2], 2022, ['TestGenre'], [testAlbum2]);
    // TestGenres
    testGenre = new Genre('TestGenre', [rolling], [heads], [satisfaction]);
    testGenre2 = new Genre('TestGenre2', [rolling, levine], [heads], [satisfaction]);
    // TEST OBJECTS FOR EDITGENRE
    // TestSongs
    testSong4 = new Song('TestSong4', 'TetsArtist3', [0, 0], ['TestGenre3'], new Date('2002-11-22'), true, 0);
    testSong5 = new Song('TestSong5', 'TetsArtist4', [0, 0], ['TestGenre4'], new Date('2002-11-22'), true, 0);
    testSong6 = new Song('TestSong6', 'TetsGroup2', [0, 0], ['TestGenre4'], new Date('2002-11-22'), true, 0);
    // TestAlbums
    testAlbum3 = new Album('TestAlbum3', 'TestGroup2', 2022, ['TestGenre3'], [testSong5]);
    testAlbum4 = new Album('TestAlbum4', 'TestGroup2', 2022, ['TestGenre4'], [testSong6]);
    // TestArtists
    testArtist3 = new Artist('TetsArtist3', ['TestGroup2'], ['TestGenre3'], [testAlbum4], [testSong6]);
    testArtist4 = new Artist('TetsArtist4', ['TestGroup2'], ['TestGenre4'], [testAlbum4], [testSong6]);
    // TestGroups
    testGroup2 = new Group('TestGroup2', [testArtist4], 2022, ['TestGenre3'], [testAlbum4]);
    // TestGenres
    testGenre3 = new Genre('TestGenre3', [testArtist3, testGroup2], [testAlbum3], [testSong4]);
    testGenre4 = new Genre('TestGenre4', [rolling, levine], [heads], [satisfaction]);
    genreManager.addGenre(testGenre3);
    genreManager.addGenre(testGenre4);
    groupManager.addGroup(testGroup2);
    artistManager.addArtist(testArtist3);
    artistManager.addArtist(testArtist4);
    albumManager.addAlbum(testAlbum3);
    albumManager.addAlbum(testAlbum4);
    songManager.addSong(testSong4);
    songManager.addSong(testSong5);
    songManager.addSong(testSong6);
  });
  it(`GenreManager.getGenreManager() is not equal null`, () => {
    expect(GenreManager.getGenreManager()).not.to.be.equal(null);
  });
  it(`genreManager.addGenre(testGenre) adds tesGenre to the genre collection`, () => {
    genreManager.addGenre(testGenre);
    genreManager.addGenre(testGenre2);
    groupManager.addGroup(testGroup);
    artistManager.addArtist(testArtist);
    artistManager.addArtist(testArtist2);
    albumManager.addAlbum(testAlbum);
    albumManager.addAlbum(testAlbum2);
    songManager.addSong(testSong);
    songManager.addSong(testSong2);
    songManager.addSong(testSong3);
    expect(genreManager.searchByName('TestGenre')).to.be.equal(testGenre);
  });
  it(`genreManager.editGenre(testGenre, 'EditedGenre', [levine], [overexposed], [lost])
   edits testGenre`, () => {
    genreManager.editGenre(testGenre, 'EditedGenre', [testArtist, testGroup], [testAlbum], [testSong]);
    editedGenre = genreManager.searchByName('EditedGenre');
    expect(genreManager.searchByName('EditedGenre')).to.be.equal(editedGenre);
  });
  it(`genreManager.editGenre(testGenre3, 'EditedGenre2', [rolling, levine], [heads], [satisfaction])
   edits testGenre3`, () => {
    genreManager.editGenre(testGenre3, 'EditedGenre2', [rolling, levine], [heads], [satisfaction]);
    editedGenre2 = genreManager.searchByName('EditedGenre2');
    expect(genreManager.searchByName('EditedGenre2')).to.be.equal(editedGenre2);
  });
  it(`genreManager.deleteGenre(editedGenre) removes editedGenre from the genre collection`, () => {
    editedGenre = genreManager.searchByName('EditedGenre');
    editedGenre2 = genreManager.searchByName('EditedGenre2');
    genreManager.deleteGenre(editedGenre);
    genreManager.deleteGenre(testGenre2);
    genreManager.deleteGenre(editedGenre2);
    genreManager.deleteGenre(testGenre4);
    expect(genreManager.searchByName('EditedGenre')).to.be.equal(undefined);
  });
});*/