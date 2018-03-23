import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    data: {},
};

export default function egenansatt(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.HENTER_EGENANSATT: {
            return Object.assign({}, state, {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                data: {},
            });
        }
        case actiontyper.EGENANSATT_HENTET: {
            return Object.assign({}, state, {
                henter: false,
                hentet: true,
                data: action.data,
            });
        }
        case actiontyper.HENT_EGENANSATT_FEILET: {
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
