import * as actiontype from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

export default function veilederoppgaver(state = initiellState, action) {
    switch (action.type) {
        case actiontype.HENT_VEILEDEROPPGAVER_FEILET: {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        }
        case actiontype.HENTER_VEILEDEROPPGAVER: {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case actiontype.VEILEDEROPPGAVER_HENTET: {
            return {
                henter: false,
                hentingFeilet: false,
                data: action.data,
            };
        }
        case actiontype.OPPGAVE_BEHANDLET: {
            const data = state.data.map((oppgave) => {
                if (oppgave.id === action.id) {
                    return Object.assign({}, oppgave, {
                        status: action.oppgave.status || oppgave.status,
                    });
                }
                return oppgave;
            });
            return {
                data,
            };
        }
        default: {
            return state;
        }
    }
}
