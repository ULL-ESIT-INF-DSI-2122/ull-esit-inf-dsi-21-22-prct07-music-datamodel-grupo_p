"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
const BasicData_1 = require("./BasicData");
const GenreManager_1 = require("../Managers/GenreManager");
const SongManager_1 = require("../Managers/SongManager");
/**
 * Clase para representar una playlist.
 */
class Playlist extends BasicData_1.BasicData {
    /**
     * Constructor de la clase `Playlist`.
     * @param name Nombre.
     * @param songs Canciones.
     * @param systemPlaylist True si es una playlist creada por el sistema.
     */
    constructor(name, songs, systemPlaylist = false) {
        super(name);
        this.songs = songs;
        this.systemPlaylist = systemPlaylist;
        this.genres = [];
        this.duration = [0, 0];
        this.recalculateDuration();
        this.updateGenres();
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
        this.recalculateDuration();
        this.updateGenres();
    }
    /**
     * Agrega una canción a la playlist.
     * @param newSong Canción a agregar.
     */
    addSong(newSong) {
        if (this.songs.find((m) => m === newSong) === undefined) {
            this.songs.push(newSong);
        }
        this.recalculateDuration();
        this.updateGenres();
    }
    /**
     * Elimina una canción de la playlist.
     * @param song Canción a eliminar.
     */
    deleteSong(song) {
        const index = this.songs.indexOf(song);
        this.songs.splice(index, 1);
        this.recalculateDuration();
        this.updateGenres();
    }
    /**
     * Getter para la propiedad `duration`.
     * @returns Devuelve el valor de`duration`.
     */
    getDuration() {
        return this.duration;
    }
    /**
     * Getter para la propiedad `genres`.
     * @returns Devuelve el valor de`genres`.
     */
    getGenres() {
        return this.genres;
    }
    /**
     * Getter para la propiedad `systemPlaylist`.
     * @returns Devuelve el valor de`systemPlaylist`.
     */
    getSystemPlaylist() {
        return this.systemPlaylist;
    }
    /**
     * Setter para la propiedad `systemPlaylist`.
     * @param flag Nuevo valor de `systemPlaylist`.
     */
    setSystemPlaylist(flag) {
        this.systemPlaylist = flag;
    }
    /**
     * Recalcula la duración total de la playlist.
     */
    recalculateDuration() {
        let minuts = 0;
        let seconds = 0;
        this.songs.forEach((song) => {
            minuts += song.getDuration()[0];
            seconds += song.getDuration()[1];
        });
        this.duration = [Math.trunc(minuts / 60), minuts % 60 + Math.trunc(seconds / 60)];
    }
    /**
     * Actualiza los géneros de la playlist a partir de sus canciones.
     */
    updateGenres() {
        this.genres = [];
        this.songs.forEach((s) => {
            s.getGenres().forEach((g) => {
                if (this.genres.length === 0 || ((this.genres.find((x) => x.getName() === g)) === undefined)) {
                    this.genres.push(GenreManager_1.GenreManager.getGenreManager().searchByName(g));
                }
            });
        });
    }
    /**
     * Devuelve los nombres de las canciones en orden.
     * @param order Variable para indicar el orden.
     * @returns Devuelve un array con los nombres de las canciones en el orden indicado.
     */
    getSongsNames(order = 0) {
        switch (order) {
            case 0:
                this.songs.sort(function (a, b) {
                    if (a.getName() < b.getName()) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
                break;
            case 1:
                this.songs.sort(function (a, b) {
                    if (a.getName() > b.getName()) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
                break;
            case 2:
                this.songs.sort(function (a, b) {
                    if (a.getAuthorName() < b.getAuthorName()) {
                        return -1;
                    }
                    if (a.getAuthorName() > b.getAuthorName()) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 3:
                this.songs.sort(function (a, b) {
                    if (a.getAuthorName() > b.getAuthorName()) {
                        return -1;
                    }
                    if (a.getAuthorName() < b.getAuthorName()) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 4:
                this.songs.sort(function (a, b) {
                    if (a.getPublicationDate() < b.getPublicationDate()) {
                        return -1;
                    }
                    if (a.getPublicationDate() > b.getPublicationDate()) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 5:
                this.songs.sort(function (a, b) {
                    if (a.getPublicationDate() > b.getPublicationDate()) {
                        return -1;
                    }
                    if (a.getPublicationDate() < b.getPublicationDate()) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 6:
                this.songs.sort(function (a, b) {
                    if ((a.getDuration()[0] * 60 + a.getDuration()[1]) < (b.getDuration()[0] * 60 + b.getDuration()[1])) {
                        return -1;
                    }
                    if ((a.getDuration()[0] * 60 + a.getDuration()[1]) > (b.getDuration()[0] * 60 + b.getDuration()[1])) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 7:
                this.songs.sort(function (a, b) {
                    if ((a.getDuration()[0] * 60 + a.getDuration()[1]) > (b.getDuration()[0] * 60 + b.getDuration()[1])) {
                        return -1;
                    }
                    if ((a.getDuration()[0] * 60 + a.getDuration()[1]) < (b.getDuration()[0] * 60 + b.getDuration()[1])) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 8:
                this.songs.sort(function (a, b) {
                    if (a.getGenres()[0] < b.getGenres()[0]) {
                        return -1;
                    }
                    if (a.getGenres()[0] > b.getGenres()[0]) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 9:
                this.songs.sort(function (a, b) {
                    if (a.getGenres()[0] > b.getGenres()[0]) {
                        return -1;
                    }
                    if (a.getGenres()[0] < b.getGenres()[0]) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 10:
                this.songs.sort(function (a, b) {
                    if (a.getReproductions() < b.getReproductions()) {
                        return -1;
                    }
                    if (a.getReproductions() > b.getReproductions()) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 11:
                this.songs.sort(function (a, b) {
                    if (a.getReproductions() > b.getReproductions()) {
                        return -1;
                    }
                    if (a.getReproductions() < b.getReproductions()) {
                        return 1;
                    }
                    return 0;
                });
                break;
        }
        let songsNames = [];
        this.songs.forEach((song) => {
            songsNames.push(song.getName());
        });
        return songsNames;
    }
    /**
     * Muestra la información de la playlist.
     * @returns Devuelve una cadena con la información de la playlist.
     */
    showInfo(order = 0) {
        const info = `PLAYLIST ${this.name}
    -Géneros: ${this.getGenresNames()}
    -Playlist original: ${(this.systemPlaylist ? 'Sí' : 'No')}
    -Duración: ${this.duration[0]}h ${this.duration[1]}min
    -Canciones:
      ${this.getSongsNames(order).join('\n      ')}`;
        console.log(info);
        return info;
    }
    getMusicians() {
        const artistList = this.getSongs().map((song) => song.getAuthorName());
        // const artistList = artistLists.reduce((acumulated, newList) => acumulated.concat(newList));
        return artistList;
    }
    /**
     * Devuelve los nombres de los géneros de la playlist.
     * @returns Devuelve un array con los nombres de los géneros de la playlist.
     */
    getGenresNames() {
        let genresNames = [];
        this.genres.map((genre) => {
            genresNames.push(genre.getName());
        });
        return genresNames;
    }
    /**
     * Deserializa un objeto `PlaylistInterface`.
     * @param playlist Objeto `PlaylistInterface`.
     * @returns Devuelve un nuevo objeto `Playlist`.
     */
    static deserialize(playlist) {
        let songs = [];
        playlist.songs.forEach((s) => songs.push(SongManager_1.SongManager.getSongManager().searchByName(s.name)));
        return new Playlist(playlist.name, songs, playlist.systemPlaylist);
    }
}
exports.Playlist = Playlist;
