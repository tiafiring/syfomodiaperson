const initiellState = {
    henter: false,
    hentingFeilet: false,
    ikkeTilgang: false,
    ikkeTilgangFeilmelding: '',
    data: [],
};

export default function arbeidsgiversSykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET': {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_ARBEIDSGIVERS_SYKMELDINGER': {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'ARBEIDSGIVERS_SYKMELDINGER_HENTET': {
            return {
                henter: false,
                hentingFeilet: false,
                data: action.data,
            };
        }
        case 'HENT_ARBEIDSGIVERS_SYKMELDINGER_IKKE_TILGANG': {
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
