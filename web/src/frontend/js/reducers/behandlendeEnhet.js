import * as actiontype from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: {},
};

export default function veilederoppgaver(state = initiellState, action) {
    switch (action.type) {
        case actiontype.HENT_BEHANDLENDE_ENHET_FEILET: {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case actiontype.HENTER_BEHANDLENDE_ENHET: {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        }
        case actiontype.BEHANDLENDE_ENHET_HENTET: {
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
