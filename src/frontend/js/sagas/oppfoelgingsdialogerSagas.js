import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/oppfoelgingsdialoger_actions';

export function* hentOppfoelgingsdialoger(action) {
    yield put(actions.henterOppfoelgingsdialoger());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialog/v1/${action.fnr}`);
        yield put(actions.hentOppfolgingsdialogerHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentOppfoelgingsdialogerFeilet());
    }
}

function* watchHentOppfoelgingsdialoger() {
    yield takeEvery(actions.HENT_OPPFOELGINGSDIALOGER_FORESPURT, hentOppfoelgingsdialoger);
}

export default function* oppfoelgingsdialogerSagas() {
    yield fork(watchHentOppfoelgingsdialoger);
}
