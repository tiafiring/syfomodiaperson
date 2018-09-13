import { tilLesbarDatoMedArstall } from 'digisyfo-npm';

export const ANTALL_MS_DAG = 1000 * 60 * 60 * 24;

export const restdatoTildato = (restdato) => {
    const dato = restdato.split('T')[0];
    return dato.split('-').reverse().join('.');
};

export const restdatoTilLesbarDato = (restdato) => {
    const dato = restdato.split('T')[0];
    return tilLesbarDatoMedArstall(new Date(dato));
};

const maanedListe = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
const ukedagListe = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];

export const capitalizeFoersteBokstav = (ord) => {
    return ord.charAt(0).toUpperCase() + ord.slice(1);
};

export const tilDatoMedUkedagOgMaanedNavn = (dato) => {
    const nyDato = new Date(dato);
    const ukeDag = capitalizeFoersteBokstav(ukedagListe[nyDato.getDay()]);
    const dag = nyDato.getDate();
    const maaned = maanedListe[nyDato.getMonth()];
    const aar = nyDato.getFullYear();
    return `${ukeDag} ${dag}. ${maaned} ${aar}`;
};
