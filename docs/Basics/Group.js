"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const BasicData_1 = require("./BasicData");
const AlbumManager_1 = require("../Managers/AlbumManager");
const ArtistManager_1 = require("../Managers/ArtistManager");
const PlaylistManager_1 = require("../Managers/PlaylistManager");
/**
 * Clase que representa a un grupo
 * @param name nombre del grupo
 * @param artist artistas que coanforman el grupo
 * @param fundationYear año de incio dle grupo
 * @param genres géneros a los que pertenece el grupo
 * @param albums álbumes que tiene el grupo
 */
class Group extends BasicData_1.BasicData {
    constructor(name, artists, fundationYear, genres, albums) {
        super(name);
        this.artists = artists;
        this.fundationYear = fundationYear;
        this.genres = genres;
        this.albums = albums;
    }
    /**
     * Getter para 'fundationYear'
     * @returns año de creación del grupo
     */
    getFundationYear() {
        return this.fundationYear;
    }
    /**
     * Getter para 'artists'
     * @returns los artitas del grupo
     */
    getArtists() {
        return this.artists;
    }
    /**
     * Agrega un artista al grupo
     * @param newArtist nuevo artista que será añadido al grupo
     */
    addArtist(newArtist) {
        this.artists.push(newArtist);
    }
    /**
     * Elimina a un artista del grupo
     * @param artistDelete artista a eliminar
     */
    removeArtist(artistDelete) {
        this.artists = this.artists.filter((elemento) => elemento !== artistDelete);
    }
    /**
     * Getter para 'songs'
     * @returns las canciones que tiene el grupo
     */
    getSongs() {
        let listAcumulated = [];
        return this.getAlbums().reduce((accList, album) => accList.concat(album.getSongs()), listAcumulated);
    }
    /**
     * Getter para 'genres'
     * @returns los géneros del grupo
     */
    getGenres() {
        return this.genres;
    }
    /**
     * Elimina un género del grupo
     * @param genre género a eliminar del grupo
     */
    removeGenre(genre) {
        const index = this.genres.indexOf(genre.getName());
        if (index !== -1) {
            this.genres.splice(index, 1);
        }
    }
    /**
     * Agrega un género al grupo
     * @param genre género a agregar
     */
    addGenre(genre) {
        if (this.genres.find((x) => x === genre.getName()) === undefined) {
            this.genres.push(genre.getName());
        }
    }
    /**
     * Getter para 'albums'
     * @returns devuelve los álbumes
     */
    getAlbums() {
        return this.albums;
    }
    /**
     * Agrega un álbum al grupo
     * @param newAlbum nuevo álbum
     */
    addAlbums(newAlbum) {
        this.albums.push(newAlbum);
    }
    /**
     * Elimina un álbum del grupo
     * @param albumDelete álbum a eliminar
     */
    removeAlbum(albumDelete) {
        this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
    }
    /**
     * Setter para 'name'
     * @param newName nuevo nombre
     */
    setName(newName) {
        this.name = newName;
    }
    /**
     * Setter para 'yearCreation'
     * @param newYear nuevo año
     */
    setYearCreation(newYear) {
        this.fundationYear = newYear;
    }
    /**
     * Setter para 'artists'
     * @param newArtists nuevos asrtistas
     */
    setArtists(newArtists) {
        this.artists = newArtists;
    }
    /**
     * Setter para 'genres'
     * @param newGenres nuevos géneros
     */
    setGenres(newGenres) {
        this.genres = newGenres;
    }
    /**
     * Setter para 'albums'
     * @param newAlbums nuevos álbumes
     */
    setAlbums(newAlbums) {
        this.albums = newAlbums;
    }
    /**
     * Método que deserealiza un objeto
     * @param group objeto de tipo 'GroupInterface'
     * @returns Devuelve un nuevo Group
     */
    static deserialize(group) {
        let artists = [];
        let albums = [];
        group.artists.forEach((a) => artists.push(ArtistManager_1.ArtistManager.getArtistManager().searchByName(a.name)));
        group.albums.forEach((a) => albums.push(AlbumManager_1.AlbumManager.getAlbumManager().searchByName(a.name)));
        return new Group(group.name, artists, group.fundationYear, group.genres, albums);
    }
    /**
     * Muestra la canciones que fueron lanzadas como single
     */
    showSingles() {
        let songsGroup = this.getSongs();
        let singles = songsGroup.filter((song) => song.getIsSingle());
        console.log('  ' + singles.map((song) => song.getName()).join('\n  '));
    }
    /**
     * Ordena por número de reproducciones
     * @param ascending orden ascendiente si es true
     */
    showByReproductions(ascending = true) {
        let songsGroup = this.getSongs();
        songsGroup = songsGroup.sort((songA, songB) => songA.getReproductions() - songB.getReproductions());
        songsGroup = ascending ? songsGroup : songsGroup.reverse();
        console.log('  ' + songsGroup.map((song) => `${song.getName()} - ${song.getReproductions()}`).join('\n  '));
    }
    /**
     * Muestra las playlist asociadas al grupo.
     */
    showPlayListAsociate() {
        const playLists = [...PlaylistManager_1.PlaylistManager.getPlaylistManager().getCollection().values()];
        const playListsWithAuthor = Array.from(playLists).filter((playList) => playList.getMusicians().includes(this.getName()));
        const asociatePlaylists = playListsWithAuthor.map((playlist) => {
            return playlist.getName();
        });
        console.log('  ' + asociatePlaylists.join('\n  '));
    }
    /**
     * Ordena las canciones
     * @param ascending true para ordenar de forma ascendente
     */
    showSongsOrder(ascending = true) {
        let nameList = this.getSongs().map((song) => {
            return song.getName();
        });
        nameList = nameList.sort();
        if (ascending) {
            console.log('  ' + nameList.join('\n  '));
        }
        else {
            console.log('  ' + nameList.reverse().join('\n  '));
        }
    }
    /**
     * Ordena los albumes
     * @param ascending true si es de forma ascendente
     */
    showAlbumOrder(ascending = true) {
        let nameList = this.getAlbums().map((album) => {
            return album.getName();
        });
        nameList = nameList.sort();
        if (ascending) {
            console.log('  ' + nameList.join('\n  '));
        }
        else {
            console.log('  ' + nameList.reverse().join('\n  '));
        }
    }
    /**
     * Ordena los álbumes por año
     * @param ascending true si es de forma ascedente
     */
    showAlbumYearOrder(ascending = true) {
        let albums = this.getAlbums().sort((albumA, albumB) => {
            return albumA.getYear() - albumB.getYear();
        });
        let albumNames = albums.map((album) => {
            return album.getName();
        });
        if (ascending) {
            console.log('  ' + albumNames.join('\n  '));
        }
        else {
            console.log('  ' + albumNames.reverse().join('\n  '));
        }
    }
    /**
     * Muestra la información del grupo
     */
    showInfo() {
        let info = `GRUPO ${this.getName()}
    -Nombre: ${this.getName()}
    -Artistas: ${this.getArtists().map((artist) => {
            return artist.getName();
        })}
    -Año creacion: ${this.getFundationYear()}
    -Genero/s: ${this.getGenres()}
    -Albums:
      ${this.getAlbums().map((album) => {
            return album.getName();
        }).join('\n      ')}`;
        console.log(info);
    }
}
exports.Group = Group;
