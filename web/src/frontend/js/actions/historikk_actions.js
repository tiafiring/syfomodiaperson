export function hentHistorikkFeilet() {
    return {
        type: 'HENT_HISTORIKK_FEILET',
    };
}

export function henterHistorikk() {
    return {
        type: 'HENTER_HISTORIKK',
    };
}

export function hentHistorikk(fnr) {
    return {
        type: 'HENT_HISTORIKK_FORESPURT',
        fnr,
    };
}

export function historikkHentet(data, kilde) {
    return {
        type: 'HISTORIKK_HENTET',
        data,
        kilde,
    };
}

