import { HENT_ARBEIDSTAKER_FEILET, ARBEIDSTAKER_HENTET, HENTER_ARBEIDSTAKER } from '../actions/actiontyper';

const defaultState = {
    data: {},
    henter: false,
    hentingFeilet: false,
};

export default function arbeidstaker(state = defaultState, action = {}) {
    switch (action.type) {
        case HENTER_ARBEIDSTAKER: {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        }
        case HENT_ARBEIDSTAKER_FEILET: {
            return {
                data: {},
                henter: false,
                hentingFeilet: true,
            };
        }
        case ARBEIDSTAKER_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        default: {
            return state;
        }
    }
}
