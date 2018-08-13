import * as actions from './actiontyper';

export function hentMotebehov(fnr) {
    return {
        type: actions.HENT_MOTEBEHOV_FORESPURT,
        fnr,
    };
}

export function henterMotebehov() {
    return {
        type: actions.HENTER_MOTEBEHOV,
    };
}

export function motebehovHentet(data) {
    return {
        type: actions.MOTEBEHOV_HENTET,
        data,
    };
}

export function hentMotebehovFeilet() {
    return {
        type: actions.HENT_MOTEBEHOV_FEILET,
    };
}

export function hentMotebehovIkkeTilgang(tilgang) {
    return {
        type: actions.HENT_MOTEBEHOV_IKKE_TILGANG,
        tilgang,
    };
}
