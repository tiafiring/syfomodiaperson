const initiellState = {
    henter: false,
    hentingFeilet: false,
    ikkeTilgang: false,
    ikkeTilgangFeilmelding: '',
    data: [],
};

export default function oppfoelgingsdialoger(state = initiellState, action) {
    switch (action.type) {
        case 'HENT_OPPFOELGINGSDIALOGER_FEILET': {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_OPPFOELGINGSDIALOGER': {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'OPPFOELGINGSDIALOGER_HENTET': {
            return {
                henter: false,
                hentingFeilet: false,
                data: action.data,
            };
        }
        case 'HENT_OPPFOELGINGSDIALOGER_IKKE_TILGANG': {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: false,
                ikkeTilgang: true,
                ikkeTilgangFeilmelding: action.feilmelding,
            });
        }
        default: {
            return state;
        }
    }
}
