import * as actiontype from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    ikkeTilgang: false,
    ikkeTilgangFeilmelding: '',
    data: [],
};

export default function oppfoelgingsdialoger(state = initiellState, action) {
    switch (action.type) {
        case actiontype.HENT_OPPFOELGINGSDIALOGER_FEILET: {
            return Object.assign({}, state, {
                data: [],
                hentet: true,
                henter: false,
                hentingFeilet: true,
            });
        }
        case actiontype.HENTER_OPPFOELGINGSDIALOGER: {
            return Object.assign({}, state, {
                data: [],
                hentet: false,
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontype.OPPFOELGINGSDIALOGER_HENTET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                hentet: true,
                data: action.data,
            });
        }
        case actiontype.HENT_OPPFOELGINGSDIALOGER_IKKE_TILGANG: {
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
