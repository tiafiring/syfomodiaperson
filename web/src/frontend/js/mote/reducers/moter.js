const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
};

export default function moter(state = defaultState, action) {
    switch (action.type) {
        case 'OPPRETTER_MOTE': {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                sender: true,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case 'MOTE_OPPRETTET': {
            const mote = Object.assign({}, action.data, {
                fnr: action.fnr,
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
        case 'OPPRETT_MOTE_FEILET': {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: true,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case 'HENTER_MOTER': {
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
        case 'MOTER_HENTET': {
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
        case 'HENT_MOTER_FEILET': {
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
        case 'AVBRYTER_MOTE': {
            return Object.assign({}, state, {
                avbryter: true,
                avbrytFeilet: false,
            });
        }
        case 'AVBRYT_MOTE_FEILET': {
            return Object.assign({}, state, {
                avbrytFeilet: true,
                avbryter: false,
            });
        }
        case 'MOTE_AVBRUTT': {
            const data = state.data.map((mote) => {
                if (mote.moteUuid === action.uid) {
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
        default: {
            return state;
        }
    }
}
