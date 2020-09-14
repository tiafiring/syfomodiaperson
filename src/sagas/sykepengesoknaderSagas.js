import {
    call,
    fork,
    put,
    select,
    takeEvery,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api';
import * as actions from '../actions/sykepengesoknader_actions';

export function* hentSykepengesoknader(action) {
    yield put(actions.henterSykepengesoknader());

    try {
        const path = `${process.env.REACT_APP_REST_ROOT}/internad/sykepengesoknader?fnr=${action.fnr}`;
        const data = yield call(get, path);
        yield put(actions.sykepengesoknaderHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykepengesoknaderFeilet());
    }
}

export const skalHenteSykepengesoknader = (state) => {
    const reducer = state.sykepengesoknader;
    return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentSykepengesoknaderHvisIkkeHentet(action) {
    const skalHente = yield select(skalHenteSykepengesoknader);
    if (skalHente) {
        yield hentSykepengesoknader(action);
    }
}

function* watchHentSykepengesoknader() {
    yield takeEvery('HENT_SYKEPENGESOKNADER_FORESPURT', hentSykepengesoknaderHvisIkkeHentet);
}

export default function* sykepengesoknaderSagas() {
    yield fork(watchHentSykepengesoknader);
}
