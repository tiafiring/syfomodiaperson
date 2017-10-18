const defaultState = {
    data: [],
    hentingFeilet: false,
};

const historikk = (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'HISTORIKK_HENTET': {
            const nyHistorikk = action.data.map((event) => {
                event.kilde = action.kilde;
                return event;
            });
            return {
                data: state.data.concat(nyHistorikk),
            };
        }
        case 'HENTER_HISTORIKK': {
            return Object.assign({}, state, {
                data: [],
            });
        }
        case 'HENT_HISTORIKK_FEILET': {
            return Object.assign({}, state, {
                hentingFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
};

export default historikk;
