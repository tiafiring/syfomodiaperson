export function hentSykepengesoknaderFeilet() {
    return {
        type: 'HENT_SYKEPENGESOKNADER_FEILET',
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
