export function hentOppfoelgingsdialogerFeilet() {
    return {
        type: 'HENT_OPPFOELGINGSDIALOGER_FEILET',
    };
}

export function hentOppfoelgingsdialogerIkkeTilgang() {
    return {
        type: 'HENT_OPPFOELGINGSDIALOGER_IKKE_TILGANG',
        ikkeTilgang: true,
    };
}

export function henterOppfoelgingsdialoger() {
    return {
        type: 'HENTER_OPPFOELGINGSDIALOGER',
    };
}

export function hentOppfoelgingsdialoger(fnr) {
    return {
        type: 'HENT_OPPFOELGINGSDIALOGER_FORESPURT',
        fnr,
    };
}
