// import {Album} from '../Basics/Album';
// import {Song} from '../Basics/Song';
// import {Group} from '../Basics/Group';
// import {Artist} from '../Basics/Artist';
// import {Genre} from '../Basics/Genre';
// import {Reproduccion} from '../Basics/Reproduccion';
// // import {Duration} from '../Basics/Song';

// // // Paul McCartney, George Harrison y Ringo Starr.
// /**
//  * Datos de fecha para Song
//  */
// const date1 = new Date('2018-03-16');
// const date2 = new Date('2018-03-12');
// const date3 = new Date('2018-03-12');
// const date4 = new Date('2018-03-11');

// /**
//  * Fecha de reproduccion
//  */
// const r1 = new Reproduccion(date1);
// const r2 = new Reproduccion(date2);
// const r3 = new Reproduccion(date3);
// const r4 = new Reproduccion(date4);

// /**
//  * generos
//  */
// const grock = genrer.rock;
// const gpop = genrer.pop;
// const grap = genrer.rap;
// const gjazz = genrer.jazz;
// const gblues = genrer.blues;

// // Groups
// const g1 = new Group('the beatles', ['jhon Lennon', 'Paul McCartney'], 1960, [grock, gpop], ['Hey jude']); // nombres de artistas(string), nombre de generos, nombre del abum
// // Music Genre
// const genrerData = new MusicGenre(grock, [g1], ['Hey jude'], ['dont let me down', 'dos']); // que reciba un array de string de album y de canciones
// // Songs
// const song1 = new Song('dont let me down', 'jhon lennon', [2, 3], [grock], date3, false, [r1, r4]);
// const song2 = new Song('dos', 'jhon lennon', [2, 3], [grock, gpop], date1, false, [r1, r4]);
// const song3 = new Song('La vie en rose', 'Louis Amstrong', [2, 8], [gjazz], date2, false, [r1, r4]);
// const song4 = new Song('Cold, Cold Heart', 'Louis Amstrong', [2, 13], [gjazz], date4, false, [r2, r4]);
// // albunes
// const album1 = new Album('Hey jude', g1, 1960, [grock], [song1, song2]); // mas de un genero
// const album2 = new Album('Satchmo Serenades', g1, 1960, [gjazz], [song1, song2]); // mas de un genero
// // Artists
// const art1 = new Artist('John Lennon', [g1], [grock], [album1], [song1]); // mas de un genero
// const art2 = new Artist('Louis Amstrong', [g1], [gjazz, gblues], [album2], [song1]); // mas de un genero
// const art3 = new Artist('Paul McCartney', [g1], [grock, gpop], [album1], [song1, song2]);

// export {date1, date2, date3, date4, r1, r2, r3, r4, gblues, gjazz, gpop, grock, grap,
//     g1, genrerData, album1, album2, art1, art2, art3, song1, song2, song3, song4};