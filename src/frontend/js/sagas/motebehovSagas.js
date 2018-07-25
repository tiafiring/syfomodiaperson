import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/motebehov_actions';
import * as actiontyper from '../actions/actiontyper';


export function* hentMotebehov(action) {
    const fnr = action.fnr ? action.fnr : '';
    yield put(actions.henterMotebehov());
    try {
        // const url = `${window.APP_SETTINGS.SYFOMOTEBEHOV_ROOT}/motebehov?fnr=${fnr}`;
        // const data = yield call(get, url);
        yield put(actions.motebehovHentet([]));
    } catch (e) {
        if (e.status === 403) {
            yield put(actions.hentMotebehovIkkeTilgang(e.tilgang));
            return;
        }
        log(e);
        yield put(actions.hentMotebehovFeilet());
    }
}

function* watchHentMotebehov() {
    yield* takeEvery(actiontyper.HENT_MOTEBEHOV_FORESPURT, hentMotebehov);
}

export default function* motebehovSagas() {
    yield [
        fork(watchHentMotebehov),
    ];
}
