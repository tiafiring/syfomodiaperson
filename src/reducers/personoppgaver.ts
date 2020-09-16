import { Reducer } from 'redux';
import {
    HENT_PERSONOPPGAVER_HENTER,
    HENT_PERSONOPPGAVER_HENTET,
    HENT_PERSONOPPGAVER_FEILET,
} from '../actions/personoppgave_actions';
import { PersonOppgave } from '../types/PersonOppgave';

export interface PersonOppgaverState {
    henter: boolean,
    hentet: boolean,
    hentingFeilet: boolean,
    hentingForsokt: boolean,
    data: PersonOppgave[],
}

export const initialState: PersonOppgaverState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    hentingForsokt: false,
    data: [],
};

export const PersonOppgaveType = {
    OPPFOLGINGSPLANLPS: 'OPPFOLGINGSPLANLPS',
}

const oppfolgingsplanerlps: Reducer<PersonOppgaverState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case HENT_PERSONOPPGAVER_HENTER: {
            return {
                ...state,
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForsokt: false,
            };
        }
        case HENT_PERSONOPPGAVER_HENTET: {
            return {
                ...state,
                henter: false,
                hentet: true,
                hentingForsokt: true,
                data: action.data,
            };
        }
        case HENT_PERSONOPPGAVER_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentingForsokt: true,
            };
        }
        default:
            return state;
    }
};

export default oppfolgingsplanerlps;
