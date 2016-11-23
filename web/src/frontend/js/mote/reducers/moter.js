import * as actions from '../actions/actiontyper';

const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
};

export default function moter(state = defaultState, action) {
    switch (action.type) {
        case actions.OPPRETTER_MOTE: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                sender: true,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.MOTE_OPPRETTET: {
            const mote = Object.assign({}, action.data, {
                fnr: action.data.fnr,
                status: 'OPPRETTET',
            });
            return Object.assign({}, state, {
                data: [...state.data, mote],
            }, {
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.OPPRETT_MOTE_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: true,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.HENTER_MOTER: {
            return {
                data: [],
                sender: false,
                henter: true,
                hentingFeilet: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            };
        }
        case actions.MOTER_HENTET: {
            return {
                data: action.data,
                sender: false,
                henter: false,
                hentingFeilet: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            };
        }
        case actions.HENT_MOTER_FEILET: {
            return {
                data: [],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: true,
                avbryter: false,
                avbrytFeilet: false,
            };
        }
        case actions.AVBRYTER_MOTE: {
            return Object.assign({}, state, {
                avbryter: true,
                avbrytFeilet: false,
            });
        }
        case actions.AVBRYT_MOTE_FEILET: {
            return Object.assign({}, state, {
                avbrytFeilet: true,
                avbryter: false,
            });
        }
        case actions.MOTE_AVBRUTT: {
            const data = state.data.map((mote) => {
                if (mote.moteUuid === action.uuid) {
                    return Object.assign({}, mote, {
                        status: 'AVBRUTT',
                    });
                }
                return mote;
            });
            return Object.assign({}, state, { data }, {
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.BEKREFTER_MOTE: {
            return Object.assign({}, state, {
                bekrefter: true,
                bekreftFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.MOTE_BEKREFTET: {
            const data = state.data.map((mote) => {
                if (mote.moteUuid === action.moteUuid) {
                    const valgtAlternativ = mote.alternativer.filter((alternativ) => {
                        return alternativ.id === action.valgtAlternativId;
                    })[0];
                    return Object.assign({}, mote, {
                        status: 'BEKREFTET',
                        valgtAlternativ,
                    });
                }
                return mote;
            });
            return Object.assign({}, state, { data }, {
                bekrefter: false,
                bekreftFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actions.BEKREFT_MOTE_FEILET: {
            return Object.assign({}, state, {
                bekrefter: false,
                bekreftFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
}
