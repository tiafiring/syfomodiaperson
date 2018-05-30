import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/oppfoelgingsdialoger_actions';
import * as actiontype from '../actions/actiontyper';

export function* hentOppfoelgingsdialoger(action) {
    yield put(actions.henterOppfoelgingsdialoger());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialog/v1/${action.fnr}`);
        yield put({ type: 'OPPFOELGINGSDIALOGER_HENTET', data });
    } catch (e) {
        log(e);
        yield put(actions.hentOppfoelgingsdialogerFeilet());
    }
}

function* watchHentOppfoelgingsdialoger() {
    yield* takeEvery(actiontype.HENT_OPPFOELGINGSDIALOGER_FORESPURT, hentOppfoelgingsdialoger);
}

export default function* oppfoelgingsdialogerSagas() {
    yield fork(watchHentOppfoelgingsdialoger);
}
