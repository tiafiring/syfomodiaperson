import { tilLesbarDatoMedArstall } from 'digisyfo-npm';

export const ANTALL_MS_DAG = 1000 * 60 * 60 * 24;

export const lagJsDate = (dato) => {
    if (dato) {
        const year = dato.substring(0, 4);
        const month = dato.substring(5, 7);
        const day = dato.substring(8, 10);
        const hour = dato.substring(11, 13);
        const minute = dato.substring(14, 16);
        const seconds = dato.substring(17, 19);
        return new Date(year, month - 1, day, hour, minute, seconds);
    }
    return dato;
};

export const konverterTid = (mote) => {
    return Object.assign({}, mote, {
        opprettetTidspunkt: lagJsDate(mote.opprettetTidspunkt),
        bekreftetAlternativ: mote.bekreftetAlternativ ? Object.assign({}, mote.bekreftetAlternativ, {
            tid: lagJsDate(mote.bekreftetAlternativ.tid),
            created: lagJsDate(mote.bekreftetAlternativ.created),
        }) : null,
        bekreftetTidspunkt: mote.bekreftetTidspunkt ? lagJsDate(mote.bekreftetTidspunkt) : null,
        deltakere: mote.deltakere.map((deltaker) => {
            return Object.assign({}, deltaker, {
                svartidspunkt: lagJsDate(deltaker.svartidspunkt),
                svar: deltaker.svar.map((s) => {
                    return Object.assign({}, s, {
                        tid: lagJsDate(s.tid),
                        created: lagJsDate(s.created),
                    });
                }),
            });
        }),
        alternativer: mote.alternativer.map((alt) => {
            return Object.assign({}, alt, {
                tid: lagJsDate(alt.tid),
                created: lagJsDate(alt.created),
            });
        }),
    });
};

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

