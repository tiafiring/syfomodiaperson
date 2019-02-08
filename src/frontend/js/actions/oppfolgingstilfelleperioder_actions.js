export const HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT = 'HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT';
export const HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER = 'HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER';
export const HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET = 'HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET';
export const HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET = 'HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET';

export function hentOppfolgingstilfelleperioder(fnr, orgnummer) {
    return {
        type: HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT,
        fnr,
        orgnummer,
    };
}

export function hentOppfolgingstilfelleperioderHenter() {
    return {
        type: HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER,
    };
}

export function hentOppfolgingstilfelleperioderHentet(data, orgnummer) {
    return {
        type: HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET,
        data,
        orgnummer,
    };
}

export function hentOppfolgingstilfelleperioderFeilet(orgnummer) {
    return {
        type: HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET,
        orgnummer,
    };
}
