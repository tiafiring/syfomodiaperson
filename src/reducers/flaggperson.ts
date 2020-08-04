import { ENDRE_STATUS_FEILET, ENDRER_STATUS, HENT_STATUS_FEILET, HENTER_STATUS, STATUS_ENDRET, STATUS_HENTET } from '../actions/flaggperson_actions';
import { StatusEndring } from '../types/FlaggPerson';

export const initialState = {
    henter: false,
    hentingFeilet: false,
    hentet: false,

    endrer: false,
    endret: false,
    endringFeilet: false,

    data: [],
};

const flaggperson = (state = initialState, action = { type: '', data: [] }) => {
    switch (action.type) {
        case HENTER_STATUS: {
            return {
                ...state,
                henter: true,
            };
        }
        case STATUS_HENTET: {
            return {
                ...state,
                hentet: true,
                data: action.data.map((se: StatusEndring & {opprettet: string} ) => (
                    {
                        ...se,
                        opprettet: Date.parse(se.opprettet)

                    }
                )),
            };
        }
        case HENT_STATUS_FEILET: {
            return {
                ...state,
                hentingFeilet: true,
            };
        }
        case ENDRER_STATUS: {
            return {
                ...state,
                endrer: true,
            };
        }
        case STATUS_ENDRET: {
            return {
                ...state,
                endret: true,
            };
        }
        case ENDRE_STATUS_FEILET: {
            return {
                ...state,
                endringFeilet: true,
            };
        }
        default:
            return state;
    }
};

export default flaggperson;
