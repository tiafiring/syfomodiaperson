export function hentSykeforloepFeilet() {
    return {
        type: 'HENT_SYKEFORLOEP_FEILET',
    };
}

export function henterSykeforloep() {
    return {
        type: 'HENTER_SYKEFORLOEP',
    };
}

export function sykeforloepHentet(data) {
    return {
        type: 'SYKEFORLOEP_HENTET',
        data,
    };
}

export function hentSykeforloep(fnr) {
    return {
        type: 'HENT_SYKEFORLOEP_FORESPURT',
        fnr,
    };
}
