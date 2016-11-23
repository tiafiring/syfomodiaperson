import { HENT_NAVBRUKER_FORESPURT, SJEKK_TILGANG_MOTEADMIN_FORESPURT } from './actiontyper';

export function hentNavbruker(fnr) {
    return {
        type: HENT_NAVBRUKER_FORESPURT,
        fnr,
    };
}

export function sjekkTilgangMoteadmin() {
    return {
        type: SJEKK_TILGANG_MOTEADMIN_FORESPURT,
    };
}
