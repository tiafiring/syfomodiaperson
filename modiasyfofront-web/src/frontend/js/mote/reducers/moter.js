const defaultState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
};

export default function moter(state = defaultState, action) {
    switch (action.type) {
        case 'OPPRETT_MOTE': {
            return Object.assign({}, state, {
                data: [...state.data, action.data],
            });
        }
        default: {
            return state;
        }
    }
}
