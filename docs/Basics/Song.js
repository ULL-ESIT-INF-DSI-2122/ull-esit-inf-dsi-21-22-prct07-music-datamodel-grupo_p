"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const BasicData_1 = require("./BasicData;");
/**
 * Clase que representa una cancion
 * Tiene asociados los siguientes datos:
 * @param name nombre
 * @param author author
 * @param duration tiempo que dura la canción
 * @param genres géneros a los que pertenece la canción
 * @param publicationDate fecha de lanzamiento
 * @param isSingle flag para ver si fué lanzado como single
 * @param reproductions reproducciones de la canción
 */
class Song extends BasicData_1.BasicData {
    constructor(name, author, duration, genres, publicationDate, isSingle, reproductions) {
        super(name);
        this.author = author;
        this.duration = duration;
        this.genres = genres;
        this.publicationDate = publicationDate;
        this.isSingle = isSingle;
        this.reproductions = reproductions;
    }
    /**
     * Método getter para 'duration'
     * @returns valor de tipo Duration
     */
    getDuration() {
        return this.duration;
    }
    /**
     * Método getter para 'publicationDate'
     * @returns año de publicación de la canción
     */
    getPublicationDate() {
        return this.publicationDate;
    }
    /**
     * Método getter para 'single'
     * @returns valor boleano, true si fué lanzada como single.
     */
    getIsSingle() {
        return this.isSingle;
    }
    /**
     * Método setter de si es single o no la canción.
     * @param newValor tipo boleano.
     */
    setIsSingle(newValor) {
        this.isSingle = newValor;
    }
    /**
     * Método setter para la nueva duración de la canción.
     * @param newDuraction de tipo Duration
     */
    setDuration(newDuraction) {
        this.duration = newDuraction;
    }
    /**
     * Devuelve el nombre del autor de la canción
     * @returns author como string
     */
    getAuthorName() {
        return this.author;
    }
    /**
     * Método setter para author
     * @param newAuthor es el nuevo nombre de author
     */
    setAuthorName(newAuthor) {
        this.author = newAuthor;
    }
    /**
     * Método getter para 'reproductions'
     * @returns Devuelve el número de reproducciones de la canción
     */
    getReproductions() {
        return this.reproductions;
    }
    /**
     * Método setter para reproductions
     * @param reproduction es la nueva reproducción de la canción.
     */
    setReproductions(reproduction) {
        this.reproductions = reproduction;
    }
    /**
     * Método getter para 'genres'
     * @returns un array de los géneros a los que pertenece la canicón
     */
    getGenres() {
        return this.genres;
    }
    /**
     * Método setter para los nuevos generos
     * que pertenece la canción.
     * @param newGenres de tipo Genre
     */
    setGenres(newGenres) {
        this.genres = newGenres;
    }
    /**
     * Método Setter para 'publicationDate'
     * @param duration de tipo Date. Nueva fecha de lanzamiento
     */
    setDatePublication(duration) {
        this.publicationDate = duration;
    }
    /**
     * Elimina el género de la canción.
     * @param genre que será eliminado
     */
    removeGenre(genre) {
        const index = this.genres.indexOf(genre.getName());
        if (index !== -1) {
            this.genres.splice(index, 1);
        }
    }
    /**
     * Agrega el género a la canción.
     * @param genre que será añadido.
     */
    addGenre(genre) {
        if (this.genres.find((x) => x === genre.getName()) === undefined) {
            this.genres.push(genre.getName());
        }
    }
    /**
     * Devuelve los datos de la canción
     * @returns datos de la canción como string
     */
    showInfo() {
        const info = `CANCIÓN ${this.getName()}
    -Autor: ${this.author}
    -Duración: ${this.duration[0]}min ${this.duration[1]}s
    -Género/s: ${this.genres}
    -Single: ${(this.isSingle ? 'Si' : 'No')}
    -Numero de reproducciones: ${this.reproductions}`;
        console.log(info);
        return info;
    }
}
exports.Song = Song;
