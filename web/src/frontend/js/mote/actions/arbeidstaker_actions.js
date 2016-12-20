import { HENT_ARBEIDSTAKER_FORESPURT, HENT_ARBEIDSTAKER_FEILET, ARBEIDSTAKER_HENTET, HENTER_ARBEIDSTAKER } from './actiontyper';

export function hentArbeidstaker(fnr) {
    return {
        type: HENT_ARBEIDSTAKER_FORESPURT,
        fnr,
    };
}

export function henterArbeidstaker() {
    return {
        type: HENTER_ARBEIDSTAKER,
    };
}

export function hentArbeidstakerFeilet() {
    return {
        type: HENT_ARBEIDSTAKER_FEILET,
    };
}

export function arbeidstakerHentet(data) {
    return {
        type: ARBEIDSTAKER_HENTET,
        data,
    };
}
