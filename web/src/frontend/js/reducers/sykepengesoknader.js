import { tilDato, parseDatoerPeriodeListe, parseDatoerPeriode } from '../utils/serialisering/dato';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    ikkeTilgang: false,
    ikkeTilgangFeilmelding: '',
    data: [],
};

export function sorterAktiviteterEldsteFoerst(soknad) {
    const aktiviteter = soknad.aktiviteter.sort((a, b) => {
        if (a.periode.fom.getTime() !== b.periode.fom.getTime()) {
            return a.periode.fom - b.periode.fom;
        }
        return a.periode.tom - b.periode.tom;
    });
    return Object.assign({}, soknad, {
        aktiviteter,
    });
}

const parseAktivitetsdatoer = (aktiviteter) => {
    return aktiviteter.map((aktivitet) => {
        return Object.assign({}, aktivitet,
            {
                periode: parseDatoerPeriode(aktivitet.periode),
            }
        );
    });
};

const parseUtdanningsDato = (utdanning) => {
    return utdanning && Object.assign({}, utdanning, { utdanningStartdato: tilDato(utdanning.utdanningStartdato) });
};

const parseUtenlandsopphold = (utenlandsopphold) => {
    return utenlandsopphold && Object.assign({}, utenlandsopphold, { perioder: parseDatoerPeriodeListe(utenlandsopphold.perioder) });
};

export const parseDatofelter = (soknad) => {
    return Object.assign({}, soknad, {
        aktiviteter: parseAktivitetsdatoer(soknad.aktiviteter),
        egenmeldingsperioder: soknad.egenmeldingsperioder && parseDatoerPeriodeListe(soknad.egenmeldingsperioder),
        ferie: soknad.ferie && parseDatoerPeriodeListe(soknad.ferie),
        permisjon: soknad.permisjon && parseDatoerPeriodeListe(soknad.permisjon),
        utenlandsopphold: parseUtenlandsopphold(soknad.utenlandsopphold),
        utdanning: parseUtdanningsDato(soknad.utdanning),
        gjenopptattArbeidFulltUtDato: tilDato(soknad.gjenopptattArbeidFulltUtDato),
        identdato: tilDato(soknad.identdato),
        sendtTilArbeidsgiverDato: tilDato(soknad.sendtTilArbeidsgiverDato),
        sendtTilNAVDato: tilDato(soknad.sendtTilNAVDato),
        opprettetDato: tilDato(soknad.opprettetDato),
        sykmeldingSkrevetDato: tilDato(soknad.sykmeldingSkrevetDato),
        forrigeSykeforloepTom: tilDato(soknad.forrigeSykeforloepTom),
    });
};


export default function sykepengesoknader(state = initiellState, action) {
    switch (action.type) {
        case 'HENT_SYKEPENGESOKNADER_FEILET': {
            return Object.assign({}, state, {
                data: [],
                hentet: true,
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_SYKEPENGESOKNADER': {
            return {
                data: [],
                hentet: false,
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'SYKEPENGESOKNADER_HENTET': {
            const soknader = action.data.map((s) => {
                const soknad = parseDatofelter(s);
                return sorterAktiviteterEldsteFoerst(soknad);
            });
            return {
                henter: false,
                hentingFeilet: false,
                hentet: true,
                data: soknader,
            };
        }
        case 'HENT_SYKEPENGESOKNADER_IKKE_TILGANG': {
            return Object.assign({}, state, {
                data: [],
                hentet: true,
                henter: false,
                hentingFeilet: false,
                ikkeTilgang: true,
                ikkeTilgangFeilmelding: action.feilmelding,
            });
        }
        default: {
            return state;
        }
    }
}
