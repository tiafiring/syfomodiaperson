import * as actiontype from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: {},
};

export default function dokumentinfo(state = initiellState, action) {
    switch (action.type) {
        case actiontype.HENT_DOKUMENTINFO_FEILET: {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case actiontype.HENTER_DOKUMENTINFO: {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        }
        case actiontype.DOKUMENTINFO_HENTET: {
            return {
                henter: false,
                hentingFeilet: false,
                data: action.data,
            };
        }
        default: {
            return state;
        }
    }
}
