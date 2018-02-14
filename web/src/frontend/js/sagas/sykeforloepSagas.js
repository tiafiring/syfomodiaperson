import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import { log } from 'digisyfo-npm';

export function* hentSykeforloep(action) {
    yield put({ type: 'HENTER_SYKEFORLOEP' });
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep?fnr=${action.fnr}`);
        yield put({ type: 'SYKEFORLOEP_HENTET', data });
    } catch (e) {
        log(e);
        yield put({ type: 'HENT_SYKEFORLOEP_FEILET' });
    }
}

function* watchHentSykeforloep() {
    yield* takeEvery('HENT_SYKEFORLOEP_FORESPURT', hentSykeforloep);
}

export default function* sykeforloepSagas() {
    yield fork(watchHentSykeforloep);
}
