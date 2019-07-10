export const HENT_MOTEBEHOV_FORESPURT = 'HENT_MOTEBEHOV_FORESPURT';
export const HENTER_MOTEBEHOV = 'HENTER_MOTEBEHOV';
export const MOTEBEHOV_HENTET = 'MOTEBEHOV_HENTET';
export const HENT_MOTEBEHOV_FEILET = 'HENT_MOTEBEHOV_FEILET';
export const HENT_MOTEBEHOV_IKKE_TILGANG = 'HENT_MOTEBEHOV_IKKE_TILGANG';

export function hentMotebehov(fnr) {
    return {
        type: HENT_MOTEBEHOV_FORESPURT,
        fnr,
    };
}

export function henterMotebehov() {
    return {
        type: HENTER_MOTEBEHOV,
    };
}

export function motebehovHentet(data) {
    return {
        type: MOTEBEHOV_HENTET,
        data,
    };
}

export function hentMotebehovFeilet() {
    return {
        type: HENT_MOTEBEHOV_FEILET,
    };
}

export function hentMotebehovIkkeTilgang(tilgang) {
    return {
        type: HENT_MOTEBEHOV_IKKE_TILGANG,
        tilgang,
    };
}
