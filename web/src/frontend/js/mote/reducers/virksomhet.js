import { HENTER_VIRKSOMHET, VIRKSOMHET_HENTET, HENT_VIRKSOMHET_FEILET, NULLSTILL_VIRKSOMHET } from '../actions/actiontyper';

const defaultState = {
    data: {},
    henter: false,
    hentingFeilet: false,
    navn: '',
};

export default function virksomhet(state = defaultState, action = {}) {
    switch (action.type) {
        case HENTER_VIRKSOMHET: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
                navn: 'henter virksomhet...',
            });
        }
        case VIRKSOMHET_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                navn: action.data.navn,
            };
        }
        case HENT_VIRKSOMHET_FEILET: {
            return {
                data: {},
                henter: false,
                hentingFeilet: true,
                navn: 'Fant ikke virksomhet',
            };
        }
        case NULLSTILL_VIRKSOMHET: {
            return {
                data: {},
                henter: false,
                hentingFeilet: false,
                navn: '',
            };
        }
        default: {
            return state;
        }
    }
}
