import * as actiontype from '../actions/actiontyper';

const initiellState = {
    hentet: false,
    henter: false,
    hentingFeilet: false,
    data: {
        harTilgang: false,
    },
};

export default function tilgang(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontype.SJEKKER_TILGANG: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontype.HAR_TILGANG: {
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    harTilgang: true,
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            });
        }
        case actiontype.HAR_IKKE_TILGANG: {
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    harTilgang: false,
                    begrunnelse: action.begrunnelse,
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            });
        }
        case actiontype.SJEKK_TILGANG_FEILET: {
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
