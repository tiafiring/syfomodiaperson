const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    data: [],
};

export default function sykeforloep(state = initiellState, action) {
    switch (action.type) {
        case 'HENT_SYKEFORLOEP_FEILET': {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_SYKEFORLOEP': {
            return Object.assign({}, state, {
                data: [],
                henter: true,
                hentingFeilet: false,
            });
        }
        case 'SYKEFORLOEP_HENTET': {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                data: action.data,
                hentet: true,
            });
        }
        default: {
            return state;
        }
    }
}
