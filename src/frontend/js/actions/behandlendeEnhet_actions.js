import * as actionstype from './actiontyper';

export function hentBehandlendeEnhetFeilet() {
    return {
        type: actionstype.HENT_BEHANDLENDE_ENHET_FEILET,
    };
}

export function henterBehandlendeEnhet() {
    return {
        type: actionstype.HENTER_BEHANDLENDE_ENHET,
    };
}

export function behandlendeEnhetHentet(data) {
    return {
        type: actionstype.BEHANDLENDE_ENHET_HENTET,
        data,
    };
}

export function hentBehandlendeEnhet(fnr) {
    return {
        type: actionstype.HENT_BEHANDLENDE_ENHET_FORESPURT,
        fnr,
    };
}
