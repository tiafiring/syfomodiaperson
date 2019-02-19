import * as actiontype from '../actions/actiontyper';

const defaultState = {
    data: [],
    henter: false,
    hentet: false,
    hentingFeilet: false,
};

const ledere = (state = defaultState, action = {}) => {
    switch (action.type) {
        case actiontype.LEDERE_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentet: true,
                hentingFeilet: false,
            };
        }
        case actiontype.HENTER_LEDERE: {
            return {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                data: [],
            };
        }
        case actiontype.HENT_LEDERE_FEILET: {
            return {
                henter: false,
                hentet: false,
                hentingFeilet: true,
                data: [],
            };
        }
        default: {
            return state;
        }
    }
};

export default ledere;
