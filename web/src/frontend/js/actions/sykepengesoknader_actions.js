export function hentSykepengesoknaderFeilet() {
    return {
        type: 'HENT_SYKEPENGESOKNADER_FEILET',
    };
}

export function hentSykepengesoknaderIkkeTilgang() {
    return {
        type: 'HENT_SYKEPENGESOKNADER_IKKE_TILGANG',
        ikkeTilgang: true,
    };
}

export function henterSykepengesoknader() {
    return {
        type: 'HENTER_SYKEPENGESOKNADER',
    };
}

export function hentSykepengesoknader(fnr) {
    return {
        type: 'HENT_SYKEPENGESOKNADER_FORESPURT',
        fnr,
    };
}
