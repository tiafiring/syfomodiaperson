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
            });
        }
        case 'OPPRETT_MOTE_FEILET': {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: true,
            });
        }
        case 'HENTER_MOTER': {
            return {
                data: [],
                sender: false,
                henter: true,
                hentingFeilet: false,
                sendingFeilet: false,
            };
        }
        case 'MOTER_HENTET': {
            return {
                data: action.data,
                sender: false,
                henter: false,
                hentingFeilet: false,
                sendingFeilet: false,
            };
        }
        case 'HENT_MOTER_FEILET': {
            return {
                data: [],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: true,
            };
        }
        default: {
            return state;
        }
    }
}
