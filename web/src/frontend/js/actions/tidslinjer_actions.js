import { HENT_TIDSLINJER_FEILET, HENTER_TIDSLINJER, SET_TIDSLINJER, HENT_TIDSLINJER_FORESPURT } from './actiontyper';

export function hentTidslinjerFeilet() {
    return {
        type: HENT_TIDSLINJER_FEILET,
    };
}

export function henterTidslinjer() {
    return {
        type: HENTER_TIDSLINJER,
    };
}

export function setTidslinjer(tidslinjer = [], arbeidssituasjon) {
    return {
        type: SET_TIDSLINJER,
        tidslinjer,
        arbeidssituasjon,
    };
}

export function hentTidslinjer(fnr, apneHendelseIder = [], arbeidssituasjon = 'MED_ARBEIDSGIVER') {
    return {
        type: HENT_TIDSLINJER_FORESPURT,
        apneHendelseIder,
        fnr,
        arbeidssituasjon,
    };
}
