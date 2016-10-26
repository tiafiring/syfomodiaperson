const defualtState = {
    data: { harTilgang: false },
};

const navbruker = (state = defualtState, action = {}) => {
    switch (action.type) {
        case 'NAVBRUKER_HENTET': {
            return {
                henter: false,
                hentingFeilet: false,
                data: Object.assign({}, state.data, action.data),
            };
        }
        case 'HENT_NAVBRUKER_FORESPURT': {
            return Object.assign({
                henter: true,
                hentingFeilet: false,
                data: Object.assign({}, state.data, {
                    fnr: action.fnr,
                }),
            });
        }
        case 'TILGANG_MOTEMODUL_HENTET': {
            return Object.assign({
                henter: false,
                hentingFeilet: false,
                data: Object.assign({}, state.data, {
                    harTilgang: action.data.harTilgang
                }),
            });
        }
        default: {
            return state;
        }
    }
};

export default navbruker;
