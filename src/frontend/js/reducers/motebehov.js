import * as actions from '../actions/actiontyper';

export const sorterEtterDato = (a, b) => {
    return b.opprettetDato === a.opprettetDato ? 0 : b.opprettetDato > a.opprettetDato ? 1 : -1;
};

const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    tilgang: {},
};

export default function motebehov(state = defaultState, action) {
    switch (action.type) {
        case actions.HENTER_MOTEBEHOV: {
            return Object.assign({}, state, {
                data: [],
                henter: true,
                hentingFeilet: false,
            });
        }
        case actions.MOTEBEHOV_HENTET: {
            return Object.assign({}, state, {
                data: action.data.sort(sorterEtterDato),
                henter: false,
                hentingFeilet: false,
            });
        }
        case actions.HENT_MOTEBEHOV_FEILET: {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        }
        case actions.HENT_MOTEBEHOV_IKKE_TILGANG: {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: false,
                tilgang: action.tilgang,
            });
        }
        default: {
            return state;
        }
    }
}
