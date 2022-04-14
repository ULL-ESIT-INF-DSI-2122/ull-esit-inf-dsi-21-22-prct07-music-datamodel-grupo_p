"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const BasicData_1 = require("./BasicData");
const SongManager_1 = require("../Managers/SongManager");
/**
 * Clase que representa un Albúm
 * Extiende de la interfaz de datos basicos(get y set de nombre).
 * Las caracteristicas principales que tiene el album son:
 * @param name del abum
 * @param publisher quien publica el album
 * @param publicationYear año de publicación
 * @param genres géneros a los que pertenece
 * @param songs canciones que contiene
 */
class Album extends BasicData_1.BasicData {
    constructor(name, publisher, publicationYear, genres, songs) {
        super(name);
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.genres = genres;
        this.songs = songs;
    }
    /**
     * Método getter para 'publisher'
     * @returns un string de quien publica el álbum
     */
    getPublisher() {
        return this.publisher;
    }
    /**
     * Método getter para 'year'
     * @returns el año que fué publicado
     */
    getYear() {
        return this.publicationYear;
    }
    /**
     * Método getter para 'genres'
     * @returns un array con los géneros a lo que pertenece
     */
    getGenres() {
        return this.genres;
    }
    /**
     * Método getter para 'songs'
     * @returns las canciones que tiene el álbum
     */
    getSongs() {
        return this.songs;
    }
    /**
     * Método setter para 'publisher'
     * @param newPublisher nuevo artista o grupo que publica el álbum
     */
    setPublisher(newPublisher) {
        this.publisher = newPublisher;
    }
    /**
     * Método setter para 'year'
     * @param year año que fué publicado
     */
    setYear(year) {
        this.publicationYear = year;
    }
    /**
     * Método setter para 'genres'
     * @param newGenres para los nuevos géneros a los que pertenece el álbum
     */
    setGenres(newGenres) {
        this.genres = newGenres;
    }
    /**
    * Método setter para 'songs'
    * @param newSongs de tipo Song
    */
    setSongs(newSongs) {
        this.songs = newSongs;
    }
    /**
     * Método que agrega un nuevo género al álbum
     * @param genre de tipo Genre
     */
    addGenre(genre) {
        if (this.genres.find((x) => x === genre.getName()) === undefined) {
            this.genres.push(genre.getName());
        }
    }
    /**
     * Agrega una nueva canción
     * @param newSong canción que será agregada al álbum
     */
    addSong(newSong) {
        this.songs.push(newSong);
    }
    /**
     * Elimina un género del ábum
     * @param genre de tipo Genre
     */
    removeGenre(genre) {
        const index = this.genres.indexOf(genre.getName());
        if (index !== -1) {
            this.genres.splice(index, 1);
        }
    }
    /**
     * Elimina la canción del álbum
     * @param songDelete canción que será eliminada del álbum
     */
    removeSong(songDelete) {
        this.songs = this.songs.filter((elemento) => elemento !== songDelete);
    }
    /**
     * Método que deserealiza un objeto, en este caso es song.
     * @param album objeto de tipo 'AlbumInterface'
     * @returns Devuelve un nuevo álbum
     */
    static deserialize(album) {
        let songs = [];
        album.songs.forEach((s) => songs.push(SongManager_1.SongManager.getSongManager().searchByName(s.name)));
        return new Album(album.name, album.whoPublishes, album.publicationYear, album.genres, songs);
    }
    /**
     * Devuelve la información del álbum
     * @returns un string con la información del álbum
     */
    showInfo() {
        const info = `ÁLBUM ${this.name}
    -Publicado por: ${this.publisher}
    -Año de publicacion: ${this.publicationYear}
    -Genero: ${this.genres}
    -Canciones: 
      ${this.songs.map((song) => {
            return song.getName();
        }).join('\n      ')}`;
        console.log(info);
        return info;
    }
}
exports.Album = Album;
