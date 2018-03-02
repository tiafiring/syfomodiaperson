import * as actionstype from './actiontyper';

export function hentDokumentinfoFeilet() {
    return {
        type: actionstype.HENT_DOKUMENTINFO_FEILET,
    };
}

export function henterDokumentinfo() {
    return {
        type: actionstype.HENTER_DOKUMENTINFO,
    };
}

export function dokumentinfoHentet(data) {
    return {
        type: actionstype.DOKUMENTINFO_HENTET,
        data,
    };
}

export function hentDokumentinfo(id) {
    return {
        type: actionstype.HENT_DOKUMENTINFO_FORESPURT,
        id,
    };
}
