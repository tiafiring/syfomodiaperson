import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import { log } from 'digisyfo-npm';
import * as actiontype from '../actions/actiontyper';

export function* hentLedere(action) {
    yield put({ type: actiontype.HENTER_LEDERE });
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/naermesteleder?fnr=${action.fnr}`);
        yield put({ type: actiontype.LEDERE_HENTET, data });
    } catch (e) {
        log(e);
        yield put({ type: actiontype.HENT_LEDERE_FEILET });
    }
}

function* watchHentLedere() {
    yield* takeEvery(actiontype.HENT_LEDERE_FORESPURT, hentLedere);
}

export default function* ledereSagas() {
    yield fork(watchHentLedere);
}
