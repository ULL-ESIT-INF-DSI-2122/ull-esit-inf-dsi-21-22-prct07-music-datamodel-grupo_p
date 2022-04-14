"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const BasicData_1 = require("./BasicData");
const SongManager_1 = require("../Managers/SongManager");
const AlbumManager_1 = require("../Managers/AlbumManager");
const PlaylistManager_1 = require("../Managers/PlaylistManager");
/**
 * Clase que representa a un artista
 * @param name nombre del artista
 * @param groups grupos a los que pertenece el artista
 * @param genres generos que tiene el artista
 * @param albums albumes que tiene el artista
 * @param songs canciones que tiene el artista
 */
class Artist extends BasicData_1.BasicData {
    constructor(name, groups, genres, albums, songs) {
        super(name);
        this.groups = groups;
        this.genres = genres;
        this.albums = albums;
        this.songs = songs;
    }
    /**
     * Método que deserealiza un objeto.
     * @param artist objeto de tipo 'ArtistInterface'
     * @returns Devuelve un nuevo Artista
     */
    static deserialize(artist) {
        let albums = [];
        let songs = [];
        artist.songs.forEach((s) => songs.push(SongManager_1.SongManager.getSongManager().searchByName(s.name)));
        artist.albums.forEach((a) => albums.push(AlbumManager_1.AlbumManager.getAlbumManager().searchByName(a.name)));
        return new Artist(artist.name, artist.groups, artist.genres, albums, songs);
    }
    /**
     * getter de grupos
     * @returns un string de grupos
     */
    getGroups() {
        return this.groups;
    }
    /**
     * getter de genres
     * @returns devuelve los generos que tiene el artista
     */
    getGenres() {
        return this.genres;
    }
    /**
     * getter de albums
     * @returns los albumes que tiene el artista
     */
    getAlbums() {
        return this.albums;
    }
    /**
     * getter de songs
     * @returns las canciones que tiene el artista
     */
    getSongs() {
        return this.songs;
    }
    /**
     * setter para nombre
     * @param newName nuevo nombre para el artista
     */
    setName(newName) {
        this.name = newName;
    }
    /**
     * Setter para 'groups'
     * @param newGroups nuevos grupos
     */
    setGroups(newGroups) {
        this.groups = newGroups;
    }
    /**
     * Setter para genrres
     * @param newGenres nuevos géneros
     */
    setGenres(newGenres) {
        this.genres = newGenres;
    }
    /**
     * Setter para álbum
     * @param newAlbums nuevos álbumes
     */
    setAlbums(newAlbums) {
        this.albums = newAlbums;
    }
    /**
    *Setter para songs
    * @param newSongs nuevas canciones
    */
    setSongs(newSongs) {
        this.songs = newSongs;
    }
    /**
     * Agrega un grupo al artista
     * @param newGroup nuevo grupo
     */
    addGroup(newGroup) {
        this.groups.push(newGroup);
    }
    /**
     * Agrega un género al artista
     * @param genre nuevo género
     */
    addGenre(genre) {
        if (this.genres.find((x) => x === genre.getName()) === undefined) {
            this.genres.push(genre.getName());
        }
    }
    /**
     * Agrega un canción al artista
     * @param newSong nueva canción
     */
    addSong(newSong) {
        this.songs.push(newSong);
    }
    /**
     * Agrega un álbum al artista
     * @param newAlbum nuevo álbum
     */
    addAlbum(newAlbum) {
        this.albums.push(newAlbum);
    }
    /**
     * Elimina el grupo del artista
     * @param groupDelete grupo a eliminar
     */
    removeGroup(groupDelete) {
        this.groups = this.groups.filter((elemento) => elemento !== groupDelete);
    }
    /**
     * Elimina el género que tiene el artista
     * @param genre género a eliminar
     */
    removeGenre(genre) {
        const index = this.genres.indexOf(genre.getName());
        if (index !== -1) {
            this.genres.splice(index, 1);
        }
    }
    /**
     * Elimina el álbum que tiene el artista
     * @param albumDelete album que será eliminado
     */
    removeAlbum(albumDelete) {
        this.albums = this.albums.filter((elemento) => elemento !== albumDelete);
    }
    /**
     * Elimina la canción del artista
     * @param songDelete canción que será eliminada
     */
    removeSong(songDelete) {
        this.songs = this.songs.filter((elemento) => elemento !== songDelete);
    }
    /**
     * Muestra la info del artista
     */
    showInfo() {
        let info = `ARTISTA ${this.getName()}
    -Nombre: ${this.getName()}
    -Grupos: ${this.getGroups()}
    -Genero/s: ${this.getGenres()}
    -Albums:
      ${this.getAlbums().map((album) => {
            return album.getName();
        }).join('\n      ')}
    -Canciones:
      ${this.getSongs().map((song) => {
            return song.getName();
        }).join('\n      ')}`;
        console.log(info);
    }
    /**
     * Ordena las canciones
     * @param ascending true para ordenar de forma ascendente
     */
    showSongsOrder(ascending = true) {
        let nameList = this.getSongs().map((song) => song.getName());
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
     * Ordena los albumes por año
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
     * Muestra la canciones que fueron lanzadas como single
     */
    showSingles() {
        let songs = this.getSongs().filter((song) => song.getIsSingle());
        let single = songs.map((song) => {
            return song.getName();
        });
        console.log('  ' + single.join('\n  '));
    }
    /**
     * Ordena por número de reproducciones
     * @param ascending true si es de forma ascendente
     */
    showByReproductions(ascending = true) {
        let songs = this.getSongs().sort((songA, songB) => {
            return songA.getReproductions() - songB.getReproductions();
        });
        let songsNames = songs.map((song) => {
            return song.getName();
        });
        if (ascending) {
            console.log('  ' + songsNames.join('\n  '));
        }
        else {
            console.log('  ' + songsNames.reverse().join('\n  '));
        }
    }
    /**
     * Muestra las playlist asociadas al artista.
     */
    showPlayListAsociate() {
        const playLists = Array.from(PlaylistManager_1.PlaylistManager.getPlaylistManager().getCollection());
        const playListsWithAuthor = playLists.filter((playList) => playList.getMusicians().includes(this.getName()));
        const asociatePlaylists = playListsWithAuthor.map((playlist) => {
            return playlist.getName();
        });
        console.log('  ' + asociatePlaylists.join('\n  '));
    }
}
exports.Artist = Artist;
