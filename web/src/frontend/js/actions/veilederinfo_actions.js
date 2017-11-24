import * as actions from './actiontyper';

export function hentVeilederinfo() {
    return {
        type: actions.HENT_VEILEDERINFO_FORESPURT,
    };
}

export function hentVeilederinfoFeilet() {
    return {
        type: actions.HENT_VEILEDERINFO_FEILET,
    };
}

export function henterVeilederinfo() {
    return {
        type: actions.HENTER_VEILEDERINFO,
    };
}

export function veilederinfoHentet(data) {
    return {
        type: actions.VEILEDERINFO_HENTET,
        data,
    };
}
