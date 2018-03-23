import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/sykepengesoknader_actions';
import { log } from 'digisyfo-npm';

export function* hentSykepengesoknader(action) {
    yield put(actions.henterSykepengesoknader());

    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykepengesoknader?fnr=${action.fnr}`);
        yield put({ type: 'SYKEPENGESOKNADER_HENTET', data });
    } catch (e) {
        log(e);
        yield put(actions.hentSykepengesoknaderFeilet());
    }
}

function* watchHentSykepengesoknader() {
    yield* takeEvery('HENT_SYKEPENGESOKNADER_FORESPURT', hentSykepengesoknader);
}

export default function* sykepengesoknaderSagas() {
    yield fork(watchHentSykepengesoknader);
}
