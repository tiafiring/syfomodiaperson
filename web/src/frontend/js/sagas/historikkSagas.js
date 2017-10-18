import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/historikk_actions';
import { log } from 'digisyfo-npm';

export function* hentHistorikkOppfoelgingsdialog(action) {
    yield put(actions.henterHistorikk());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialog/v1/${action.fnr}/historikk`);
        yield put(actions.historikkHentet(data, 'OPPFOELGINGSDIALOG'));
    } catch (e) {
        log(e);
        yield put(actions.hentHistorikkFeilet());
    }
}

function* watchHentHistorikkOppfoelgingsdialog() {
    yield* takeEvery('HENT_HISTORIKK_FORESPURT', hentHistorikkOppfoelgingsdialog);
}

export default function* historikkSagas() {
    yield fork(watchHentHistorikkOppfoelgingsdialog);
}
