import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/sykeforloep_actions';

export function* hentSykeforloep(action) {
    yield put(actions.henterSykeforloep());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep?fnr=${action.fnr}`);
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
