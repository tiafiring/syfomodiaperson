import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { httpPut, get } from '../api/index';
import * as actions from '../actions/veilederoppgaver_actions';
import * as actiontype from '../actions/actiontyper';

export function* veilederOppgaverSaga(action) {
    yield put(actions.henterVeilederOppgaver());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.VEILEDEROPPGAVERREST_ROOT}/veilederoppgaver/v1?fnr=${action.fnr}`);
        yield put(actions.veilederOppgaverHentet(data));
    } catch (e) {
        yield put(actions.hentVeilederOppgaverFeilet());
    }
}

function* watchHentVeilederOppgaver() {
    yield* takeEvery(actiontype.HENT_VEILEDEROPPGAVER_FORESPURT, veilederOppgaverSaga);
}

export function* behandleVeilederOppgaverSaga(action) {
    yield put(actions.behandlerOppgave());
    try {
        const data = yield call(httpPut, `${window.APP_SETTINGS.VEILEDEROPPGAVERREST_ROOT}/veilederoppgaver/v1/actions`, action.oppgave);
        yield put(actions.oppgaveBehandlet(data, action.oppgave));
    } catch (e) {
        yield put(actions.oppgaveBehandletFeilet());
    }
}

function* watchBehandleVeilederOppgaver() {
    yield* takeEvery(actiontype.BEHANDLE_OPPGAVE_FORESPURT, behandleVeilederOppgaverSaga);
}

export default function* veilederoppgaverSagas() {
    yield [
        fork(watchBehandleVeilederOppgaver),
        fork(watchHentVeilederOppgaver),
    ];
}
