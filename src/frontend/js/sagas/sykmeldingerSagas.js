import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/sykmeldinger_actions';
import { log } from 'digisyfo-npm';

export function* hentSykmeldinger(action) {
    yield put(actions.henterSykmeldinger());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger?fnr=${action.fnr}`);
        yield put({ type: 'SYKMELDINGER_HENTET', data });
    } catch (e) {
        log(e);
        yield put(actions.hentSykmeldingerFeilet());
    }
}

function* watchHentSykmeldinger() {
    yield* takeEvery('HENT_SYKMELDINGER_FORESPURT', hentSykmeldinger);
}

export default function* sykmeldingerSagas() {
    yield fork(watchHentSykmeldinger);
}
