import { HENTER_VIRKSOMHET, VIRKSOMHET_HENTET, HENT_VIRKSOMHET_FEILET, NULLSTILL_VIRKSOMHET } from '../actions/actiontyper';

const defaultState = {
    data: {},
    henter: false,
    hentingFeilet: false,
    nullstilt: false,
};

export default function virksomhet(state = defaultState, action = {}) {
    switch (action.type) {
        case HENTER_VIRKSOMHET: {
            return Object.assign({}, state, {
                data: {},
                henter: true,
                hentingFeilet: false,
                nullstilt: false,
            });
        }
        case VIRKSOMHET_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        case HENT_VIRKSOMHET_FEILET: {
            return {
                data: {},
                henter: false,
                hentingFeilet: true,
            };
        }
        case NULLSTILL_VIRKSOMHET: {
            return {
                data: {},
                henter: false,
                hentingFeilet: false,
                nullstilt: true,
            };
        }
        default: {
            return state;
        }
    }
}
