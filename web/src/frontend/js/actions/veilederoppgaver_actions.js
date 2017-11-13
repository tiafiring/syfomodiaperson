import * as actionstype from './actiontyper';

export function hentVeilederOppgaverFeilet() {
    return {
        type: actionstype.HENT_VEILEDEROPPGAVER_FEILET,
    };
}

export function henterVeilederOppgaver() {
    return {
        type: actionstype.HENTER_VEILEDEROPPGAVER,
    };
}

export function veilederOppgaverHentet(data) {
    return {
        type: actionstype.VEILEDEROPPGAVER_HENTET,
        data,
    };
}

export function hentVeilederOppgaver(fnr) {
    return {
        type: actionstype.HENT_VEILEDEROPPGAVER_FORESPURT,
        fnr,
    };
}
