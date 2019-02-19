import {
    call,
    put,
    fork,
    takeEvery,
    select,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/oppfolgingstilfelleperioder_actions';
import { HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT } from '../actions/oppfolgingstilfelleperioder_actions';

export function* hentOppfolgingstilfelleperioder(action, orgnummer) {
    yield put(actions.hentOppfolgingstilfelleperioderHenter(orgnummer));
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/oppfolgingstilfelleperioder?fnr=${action.fnr}&orgnummer=${orgnummer}`);
        yield put(actions.hentOppfolgingstilfelleperioderHentet(data, orgnummer));
    } catch (e) {
        log(e);
        yield put(actions.hentOppfolgingstilfelleperioderFeilet(orgnummer));
    }
}

export const hentLedere = (state) => {
    const erLedereHentet = state.ledere.hentet;
    if (erLedereHentet) {
        return state.ledere.data;
    }
    return [];
};

export const skalHenteOppfolgingstilfelleperioder = (state, leder) => {
    const reducer = state.oppfolgingstilfelleperioder[leder.orgnummer] || {};
    return (!reducer.henter && !reducer.hentingForsokt) || false;
};

export function* hentOppfolgingstilfelleperioderHvisIkkeHentet(action) {
    const ledere = yield select(hentLedere);
    for (let i = 0; i < ledere.length; i++) {
        const skalHente = yield select(skalHenteOppfolgingstilfelleperioder, ledere[i]);
        if (skalHente) {
            yield call(hentOppfolgingstilfelleperioder, action, ledere[i].orgnummer);
        }
    }
}

function* watchHentOppfolgingstilfelleperioder() {
    yield takeEvery(HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT, hentOppfolgingstilfelleperioderHvisIkkeHentet);
}

export default function* oppfolgingstilfelleperioderSagas() {
    yield fork(watchHentOppfolgingstilfelleperioder);
}
