import { HENTER_VIRKSOMHET, VIRKSOMHET_HENTET, HENT_VIRKSOMHET_FEILET } from '../actions/actiontyper';

const defaultState = {
    data: {},
    henter: false,
    hentingFeilet: false,
};

export default function virksomhet(state = defaultState, action = {}) {
    switch (action.type) {
        case HENTER_VIRKSOMHET: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case VIRKSOMHET_HENTET: {
            const nyeData = {};
            nyeData[action.orgnummer] = action.data.navn;
            return {
                data: Object.assign({}, state.data, nyeData),
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
        default: {
            return state;
        }
    }
}
