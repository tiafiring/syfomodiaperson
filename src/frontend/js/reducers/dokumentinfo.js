import {
    HENT_DOKUMENTINFO_FEILET,
    HENTER_DOKUMENTINFO,
    DOKUMENTINFO_HENTET,
} from '../actions/dokumentinfo_actions';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: {},
};

export default function dokumentinfo(state = initiellState, action) {
    switch (action.type) {
        case HENT_DOKUMENTINFO_FEILET: {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case HENTER_DOKUMENTINFO: {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        }
        case DOKUMENTINFO_HENTET: {
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
