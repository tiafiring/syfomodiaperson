export function hentSykmeldingerFeilet() {
    return {
        type: 'HENT_SYKMELDINGER_FEILET',
    };
}

export function hentSykmeldingerIkkeTilgang() {
    return {
        type: 'HENT_SYKMELDINGER_IKKE_TILGANG',
        ikkeTilgang: true,
    };
}

export function henterSykmeldinger() {
    return {
        type: 'HENTER_SYKMELDINGER',
    };
}

export function sorterSykmeldinger(kriterium, status) {
    return {
        type: 'SET_SORTERING',
        kriterium,
        status,
    };
}

export function hentSykmeldinger(fnr) {
    return {
        type: 'HENT_SYKMELDINGER_FORESPURT',
        fnr,
    };
}
