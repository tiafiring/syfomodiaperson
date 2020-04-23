import * as actiontype from '../actions/actiontyper';
import {
    currentLedere,
    formerLedere,
} from '../utils/ledereUtils';

const defaultState = {
    data: [],
    formerLedere: [],
    henter: false,
    hentet: false,
    hentingFeilet: false,
};

const ledere = (state = defaultState, action = {}) => {
    switch (action.type) {
        case actiontype.LEDERE_HENTET: {
            return {
                data: currentLedere(action.data),
                formerLedere: formerLedere(action.data),
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
                formerLedere: [],
            };
        }
        case actiontype.HENT_LEDERE_FEILET: {
            return {
                henter: false,
                hentet: false,
                hentingFeilet: true,
                data: [],
                formerLedere: [],
            };
        }
        default: {
            return state;
        }
    }
};

export default ledere;
