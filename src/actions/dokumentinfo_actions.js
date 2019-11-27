export const HENT_DOKUMENTINFO_FORESPURT = 'HENT_DOKUMENTINFO_FORESPURT';
export const HENTER_DOKUMENTINFO = 'HENTER_DOKUMENTINFO';
export const HENT_DOKUMENTINFO_FEILET = 'HENT_DOKUMENTINFO_FEILET';
export const DOKUMENTINFO_HENTET = 'DOKUMENTINFO_HENTET';

export function hentDokumentinfoFeilet() {
    return {
        type: HENT_DOKUMENTINFO_FEILET,
    };
}

export function henterDokumentinfo() {
    return {
        type: HENTER_DOKUMENTINFO,
    };
}

export function dokumentinfoHentet(data) {
    return {
        type: DOKUMENTINFO_HENTET,
        data,
    };
}

export function hentDokumentinfo(id) {
    return {
        type: HENT_DOKUMENTINFO_FORESPURT,
        id,
    };
}
