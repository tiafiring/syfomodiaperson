import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api';
import * as actions from '../actions/sykeforloep_actions';

export function* hentSykeforloep(action) {
    yield put(actions.henterSykeforloep());
    try {
        const path = `${process.env.REACT_APP_REST_ROOT}/internad/oppfolgingstilfelle?fnr=${action.fnr}`;
        const data = yield call(get, path);
        yield put(actions.sykeforloepHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykeforloepFeilet());
    }
}

function* watchHentSykeforloep() {
    yield takeEvery(actions.HENT_SYKEFORLOEP_FORESPURT, hentSykeforloep);
}

export default function* sykeforloepSagas() {
    yield fork(watchHentSykeforloep);
}
