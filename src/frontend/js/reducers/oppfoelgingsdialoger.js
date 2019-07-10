import * as actiontype from '../actions/actiontyper';
import { VIRKSOMHET_HENTET } from '../actions/virksomhet_actions';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    data: [],
};

export default function oppfoelgingsdialoger(state = initiellState, action) {
    switch (action.type) {
        case actiontype.HENT_OPPFOELGINGSDIALOGER_FEILET: {
            return Object.assign({}, state, {
                data: [],
                hentet: true,
                henter: false,
                hentingFeilet: true,
            });
        }
        case actiontype.HENTER_OPPFOELGINGSDIALOGER: {
            return Object.assign({}, state, {
                data: [],
                hentet: false,
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontype.OPPFOELGINGSDIALOGER_HENTET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                hentet: true,
                data: action.data,
            });
        }
        case VIRKSOMHET_HENTET: {
            const data = state.data.map((dialog) => {
                if (dialog.virksomhet.virksomhetsnummer === action.orgnummer) {
                    return Object.assign({}, dialog, {
                        virksomhet: Object.assign({}, dialog.virksomhet, {
                            navn: action.data.navn,
                        }),
                    });
                }
                return dialog;
            });
            return Object.assign({}, state, {
                data,
            });
        }
        default: {
            return state;
        }
    }
}
