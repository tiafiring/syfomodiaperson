import * as actiontype from '../actions/actiontyper';

export function sjekkTilgangFeilet() {
    return {
        type: actiontype.SJEKK_TILGANG_FEILET,
    };
}

export function sjekkerTilgang() {
    return {
        type: actiontype.SJEKKER_TILGANG,
    };
}

export function harTilgang() {
    return {
        type: actiontype.HAR_TILGANG,
    };
}

export function harIkkeTilgang(begrunnelse) {
    return {
        type: actiontype.HAR_IKKE_TILGANG,
        begrunnelse,
    };
}


export function sjekkTilgang(fnr) {
    return {
        type: actiontype.SJEKK_TILGANG_FORESPURT,
        fnr,
    };
}
