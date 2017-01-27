import {
    HENT_SYKMELDINGER_FEILET,
    HENTER_SYKMELDINGER,
    HENT_SYKMELDINGER_FORESPURT,
    HENT_SYKMELDINGER_IKKE_TILGANG
} from "./actiontyper";

export function hentSykmeldingerFeilet() {
    return {
        type: HENT_SYKMELDINGER_FEILET,
    };
}

export function hentSykmeldingerIkkeTilgang() {
    return {
        type: HENT_SYKMELDINGER_IKKE_TILGANG,
        ikkeTilgang: true,
    };
}

export function henterSykmeldinger() {
    return {
        type: HENTER_SYKMELDINGER,
    };
}

export function hentSykmeldinger(fnr) {
    return {
        type: HENT_SYKMELDINGER_FORESPURT,
        fnr,
    };
}
