const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

export default function veilederoppgaver(state = initiellState, action) {
    switch (action.type) {
        case 'HENT_VEILEDEROPPGAVER_FEILET': {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_VEILEDEROPPGAVER': {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'VEILEDEROPPGAVER_HENTET': {
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
}
