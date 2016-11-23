const defaultState = {
    data: {},
    henter: false,
    hentingFeilet: false,
};

export default function epostinnhold(state = defaultState, action = {}) {
    switch (action.type) {
        case 'HENTER_EPOSTINNHOLD': {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case 'EPOSTINNHOLD_HENTET': {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                eposttype: action.eposttype,
            };
        }
        case 'HENT_EPOSTINNHOLD_FEILET': {
            return {
                data: {},
                henter: false,
                hentingFeilet: true,
            };
        }
        default: {
            return state;
        }
    }
}
