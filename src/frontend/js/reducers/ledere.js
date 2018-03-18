import * as actiontype from '../actions/actiontyper';

const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
};

const ledere = (state = defaultState, action = {}) => {
    switch (action.type) {
        case actiontype.LEDERE_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontype.HENTER_LEDERE: {
            return {
                henter: true,
                hentingFeilet: false,
                data: [],
            };
        }
        case actiontype.HENT_LEDERE_FEILET: {
            return {
                henter: false,
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
