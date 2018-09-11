import {
    HENT_SYKMELDINGER_FEILET,
    HENT_SYKMELDINGER_FORESPURT,
    HENTER_SYKMELDINGER,
    SET_SORTERING,
    SYKMELDINGER_HENTET,
} from './actiontyper';

export function hentSykmeldingerFeilet() {
    return {
        type: HENT_SYKMELDINGER_FEILET,
    };
}

export function henterSykmeldinger() {
    return {
        type: HENTER_SYKMELDINGER,
    };
}

export function sorterSykmeldinger(kriterium, status) {
    return {
        type: SET_SORTERING,
        kriterium,
        status,
    };
}

export function hentSykmeldinger(fnr) {
    return {
        type: HENT_SYKMELDINGER_FORESPURT,
        fnr,
    };
}

export function sykmeldingerHentet(data) {
    return {
        type: SYKMELDINGER_HENTET,
        data,
    };
}
