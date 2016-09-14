const ledere = (state = {}, action = {}) => {
    switch (action.type) {
        case 'SET_LEDERE': {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        case 'TOGGLE_APEN_LEDER': {
            const data = state.data.map((leder) => {
                if (leder.id === action.lederId) {
                    return Object.assign({}, leder, {
                        erApen: !leder.erApen,
                    });
                }
                return leder;
            });
            return Object.assign({}, state, {
                data,
            });
        }
        default: {
            return state;
        }
    }
};

export default ledere;
