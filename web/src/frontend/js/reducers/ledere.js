const defaultState = {
    data: [],
    ikkeTilgang: false
};

const ledere = (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'LEDERE_HENTET': {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        case 'HENTER_LEDERE': {
            return {
                henter: true,
                hentingFeilet: false,
                data: [],
            };
        }
        case 'HENT_LEDERE_FEILET': {
            return {
                henter: false,
                hentingFeilet: true,
                data: [],
            };
        }
        case 'HENT_LEDERE_IKKE_TILGANG': {
            return {
                henter: false,
                hentingFeilet: false,
                ikkeTilgang: true,
                data: [],
            };
        }
        default: {
            return state;
        }
    }
};

export default ledere;
