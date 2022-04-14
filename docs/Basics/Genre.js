"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const BasicData_1 = require("./BasicData");
const SongManager_1 = require("../Managers/SongManager");
const AlbumManager_1 = require("../Managers/AlbumManager");
const ArtistManager_1 = require("../Managers/ArtistManager");
const GroupManager_1 = require("../Managers/GroupManager");
/**
 * Clase para representar un género musical.
 */
class Genre extends BasicData_1.BasicData {
    /**
     * Constructor de la clase `Genre`.
     * @param name Nombre.
     * @param musicians Gropos/Artistas.
     * @param albums Álbumes.
     * @param songs Canciones.
     */
    constructor(name, musicians, albums, songs) {
        super(name);
        this.musicians = musicians;
        this.albums = albums;
        this.songs = songs;
    }
    /**
     * Getter para la propiedad `musicians`.
     * @returns Devuelve el valor de`musicians`.
     */
    getMusicians() {
        return this.musicians;
    }
    /**
     * Setter para la propiedad `musicians`.
     * @param musicians Nuevo valor de `musicians`.
     */
    setMusicians(musicians) {
        this.musicians = musicians;
    }
    /**
     * Agrega un grupo/artista al género.
     * @param newMusician Grupo/artista a agregar.
     */
    addMusician(newMusician) {
        if (this.musicians.find((m) => m === newMusician) === undefined) {
            this.musicians.push(newMusician);
        }
    }
    /**
     * Elimina un grupo/artista del género.
     * @param musician Grupo/artista a eliminar.
     */
    deleteMusician(musician) {
        const index = this.musicians.indexOf(musician);
        if (index !== -1) {
            this.musicians.splice(index, 1);
        }
    }
    /**
     * Getter para la propiedad `albums`.
     * @returns Devuelve el valor de`albums`.
     */
    getAlbums() {
        return this.albums;
    }
    /**
     * Setter para la propiedad `albums`.
     * @param albums Nuevo valor de `albums`.
     */
    setAlbums(albums) {
        this.albums = albums;
    }
    /**
     * Agrega un álbum al género.
     * @param newAlbum Álbum a agregar.
     */
    addAlbum(newAlbum) {
        if (this.albums.find((m) => m === newAlbum) === undefined) {
            this.albums.push(newAlbum);
        }
    }
    /**
     * Elimina un álbum del género.
     * @param album Álbum a eliminar.
     */
    deleteAlbum(album) {
        const index = this.albums.indexOf(album);
        if (index !== -1) {
            this.albums.splice(index, 1);
        }
    }
    /**
     * Getter para la propiedad `songs`.
     * @returns Devuelve el valor de`songs`.
     */
    getSongs() {
        return this.songs;
    }
    /**
     * Setter para la propiedad `songs`.
     * @param songs Nuevo valor de `songs`.
     */
    setSongs(songs) {
        this.songs = songs;
    }
    /**
     * Agrega una canción a al género.
     * @param newSong Canción a agregar.
     */
    addSong(newSong) {
        if (this.songs.find((m) => m === newSong) === undefined) {
            this.songs.push(newSong);
        }
    }
    /**
     * Elimina una canción del género.
     * @param song Canción a eliminar.
     */
    deleteSong(song) {
        const index = this.songs.indexOf(song);
        if (index !== -1) {
            this.songs.splice(index, 1);
        }
    }
    /**
     * Muestra la información de la playlist.
     * @returns Devuelve una cadena con la información de la playlist.
     */
    showInfo() {
        const info = `GÉNERO ${this.name}
    -Grupos/Artistas:
      ${this.getMusiciansNames().join('\n      ')}
    -Álbums:
      ${this.getAlbumsNames().join('\n      ')}
    -Canciones:
      ${this.getSongsNames().join('\n      ')}`;
        console.log(info);
        return info;
    }
    /**
     * Devuelve los nombres de los grupos/artistas del género.
     * @returns Devuelve un array con los nombres de los grupos/artistas del género.
     */
    getMusiciansNames() {
        let musiciansNames = [];
        this.musicians.forEach((musician) => {
            musiciansNames.push(musician.getName());
        });
        return musiciansNames;
    }
    /**
     * Devuelve los nombres de los álbumes del género.
     * @returns Devuelve un array con los nombres de los álbumes del género.
     */
    getAlbumsNames() {
        let albumsNames = [];
        this.albums.forEach((album) => {
            albumsNames.push(album.getName());
        });
        return albumsNames;
    }
    /**
     * Devuelve los nombres de las canciones del género.
     * @returns Devuelve un array con los nombres de las canciones del género.
     */
    getSongsNames() {
        let songsNames = [];
        this.songs.forEach((song) => {
            songsNames.push(song.getName());
        });
        return songsNames;
    }
    /**
     * Deserializa un objeto `GenreInterface`.
     * @param genre Objeto `GenreInterface`.
     * @returns Devuelve un nuevo objeto `Genre`.
     */
    static deserialize(genre) {
        let musicians = [];
        let albums = [];
        let songs = [];
        genre.songs.forEach((s) => songs.push(SongManager_1.SongManager.getSongManager().searchByName(s.name)));
        genre.albums.forEach((a) => albums.push(AlbumManager_1.AlbumManager.getAlbumManager().searchByName(a.name)));
        genre.musicians.forEach((m) => {
            if ('groups' in m) {
                musicians.push(ArtistManager_1.ArtistManager.getArtistManager().searchByName(m.name));
            }
            else {
                musicians.push(GroupManager_1.GroupManager.getGroupManager().searchByName(m.name));
            }
        });
        return new Genre(genre.name, musicians, albums, songs);
    }
}
exports.Genre = Genre;
