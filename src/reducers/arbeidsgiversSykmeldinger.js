import { parseSykmelding } from '@navikt/digisyfo-npm';

const initiellState = {
    henter: false,
    hentingFeilet: false,
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
                data: action.data.map(parseSykmelding),
            };
        }
        default: {
            return state;
        }
    }
}
