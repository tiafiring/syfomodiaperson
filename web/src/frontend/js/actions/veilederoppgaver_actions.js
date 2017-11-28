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


export function oppgaveBehandletFeilet() {
    return {
        type: actionstype.BEHANDLE_OPPGAVE_FEILET,
    };
}

export function behandlerOppgave() {
    return {
        type: actionstype.BEHANDLER_OPPGAVE,
    };
}

export function oppgaveBehandlet(id, oppgave) {
    return {
        type: actionstype.OPPGAVE_BEHANDLET,
        id,
        oppgave,
    };
}

export function behandleOppgave(id, oppgave, fnr) {
    return {
        type: actionstype.BEHANDLE_OPPGAVE_FORESPURT,
        fnr,
        id,
        oppgave,
    };
}
