const defualtState = {
    data: {},
};

const navBruker = (state = defualtState, action = {}) => {
    switch (action.type) {
        case 'SET_NAVBRUKER': {
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
};

export default navBruker;
