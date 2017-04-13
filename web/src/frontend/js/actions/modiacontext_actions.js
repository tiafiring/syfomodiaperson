import {
    PUSH_MODIACONTEXT_FORESPURT,
    PUSH_MODIACONTEXT_FEILET,
    MODIACONTEXT_PUSHET,
    PUSHER_MODIACONTEXT,
    HENT_AKTIVBRUKER_FORESPURT,
    HENT_AKTIVBRUKER_FEILET,
    AKTIVBRUKER_HENTET,
    HENTER_AKTIVBRUKER,
    HENT_AKTIVENHET_FORESPURT,
    HENT_AKTIVENHET_FEILET,
    AKTIVENHET_HENTET,
    HENTER_AKTIVENHET,
} from './actiontyper';

export function hentAktivBruker(data) {
    return {
        type: HENT_AKTIVBRUKER_FORESPURT,
        data,
    };
}

export function hentAktivBrukerFeilet() {
    return {
        type: HENT_AKTIVBRUKER_FEILET,
    };
}

export function henterAktivBruker() {
    return {
        type: HENTER_AKTIVBRUKER,
    };
}

export function aktivBrukerHentet(data) {
    return {
        type: AKTIVBRUKER_HENTET,
        data,
    };
}


export function hentAktivEnhet(data) {
    return {
        type: HENT_AKTIVENHET_FORESPURT,
        data,
    };
}

export function hentAktivEnhetFeilet() {
    return {
        type: HENT_AKTIVENHET_FEILET,
    };
}

export function henterAktivEnhet() {
    return {
        type: HENTER_AKTIVENHET,
    };
}

export function aktivEnhetHentet(data) {
    return {
        type: AKTIVENHET_HENTET,
        data,
    };
}

export function pushModiaContextFeilet() {
    return {
        type: PUSH_MODIACONTEXT_FEILET,
    };
}

export function pusherModiaContext() {
    return {
        type: PUSHER_MODIACONTEXT,
    };
}

export function pushModiaContext(data) {
    return {
        type: PUSH_MODIACONTEXT_FORESPURT,
        data,
    };
}

export function modiaContextPushet() {
    return {
        type: MODIACONTEXT_PUSHET,
    };
}

