import { parseSykepengesoknad, tidligsteFom, senesteTom } from 'digisyfo-npm';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
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

export const settErOppdelt = (soknad) => {
    const perioder = soknad.aktiviteter.map((a) => {
        return a.periode;
    });
    const _senesteTom = senesteTom(perioder);
    const _tidligsteFom = tidligsteFom(perioder);
    const _erOppdelt = (() => {
        if (!soknad.fom || !soknad.tom) {
            return false;
        }
        return !(soknad.fom.getTime() === _tidligsteFom.getTime() && soknad.tom.getTime() === _senesteTom.getTime());
    })();
    return Object.assign({}, soknad, {
        _erOppdelt,
    });
};

export default function sykepengesoknader(state = initiellState, action = {}) {
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
                const soknad = settErOppdelt(parseSykepengesoknad(s));
                return sorterAktiviteterEldsteFoerst(soknad);
            });
            return {
                henter: false,
                hentingFeilet: false,
                hentet: true,
                data: soknader,
            };
        }
        default: {
            return state;
        }
    }
}
