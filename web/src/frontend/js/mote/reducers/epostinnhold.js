import { HENTER_EPOSTINNHOLD, EPOSTINNHOLD_HENTET, HENT_EPOSTINNHOLD_FEILET, SET_VALGT_DELTAKER, SET_VALGT_KANAL } from '../actions/actiontyper';

const defaultState = {
    data: {},
    henter: false,
    hentingFeilet: false,
};

export default function epostinnhold(state = defaultState, action = {}) {
    switch (action.type) {
        case HENTER_EPOSTINNHOLD: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case EPOSTINNHOLD_HENTET: {
            return Object.assign({}, state, {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                eposttype: action.eposttype,
            });
        }
        case HENT_EPOSTINNHOLD_FEILET: {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case SET_VALGT_KANAL: {
            return Object.assign({}, state, {
                valgtKanal: action.valgtKanal,
            });
        }
        case SET_VALGT_DELTAKER: {
            return Object.assign({}, state, {
                valgtDeltaker: action.valgtDeltaker,
            });
        }
        default: {
            return state;
        }
    }
}
