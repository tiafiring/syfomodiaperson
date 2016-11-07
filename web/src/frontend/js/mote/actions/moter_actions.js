export function opprettMote(fnr, data) {
    return {
        type: 'OPPRETT_MOTE_FORESPURT',
        fnr,
        data,
    };
}

export function oppretterMote() {
    return {
        type: 'OPPRETTER_MOTE',
    };
}

export function moteOpprettet(data, fnr) {
    return {
        type: 'MOTE_OPPRETTET',
        data,
        fnr,
    };
}

export function opprettMoteFeilet() {
    return {
        type: 'OPPRETT_MOTE_FEILET',
    };
}

export function hentMoter(fnr) {
    return {
        type: 'HENT_MOTER_FORESPURT',
        fnr,
    };
}

export function henterMoter() {
    return {
        type: 'HENTER_MOTER',
    };
}

export function moterHentet(data) {
    return {
        type: 'MOTER_HENTET',
        data,
    };
}

export function hentMoterFeilet() {
    return {
        type: 'HENT_MOTER_FEILET',
    };
}

export function avbrytMote(uuid) {
    return {
        type: 'AVBRYT_MOTE_FORESPURT',
        uuid,
    };
}

export function moteAvbrutt(uuid) {
    return {
        type: 'MOTE_AVBRUTT',
        uuid,
    };
}

export function avbrytMoteFeilet() {
    return {
        type: 'AVBRYT_MOTE_FEILET',
    };
}

export function avbryterMote(uuid) {
    return {
        type: 'AVBRYTER_MOTE',
        uuid,
    };
}
