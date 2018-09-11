import { parseSykmelding } from 'digisyfo-npm';
import { HENT_SYKMELDINGER_FEILET, HENTER_SYKMELDINGER, SYKMELDINGER_HENTET } from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

export default function sykmeldinger(state = initiellState, action = {}) {
    switch (action.type) {
        case HENT_SYKMELDINGER_FEILET: {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        }
        case HENTER_SYKMELDINGER: {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case SYKMELDINGER_HENTET: {
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
