import * as actiontype from '../actions/actiontyper';

const initiellState = {
    hentet: false,
    henter: false,
    hentingFeilet: false,
    data: {},
};

export default function veilederinfo(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontype.HENTER_VEILEDERINFO: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontype.VEILEDERINFO_HENTET: {
            return Object.assign({}, state, {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            });
        }
        case actiontype.HENT_VEILEDERINFO_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
}
