import {
    all,
    call,
    fork,
    put,
    select,
    takeEvery,
} from 'redux-saga/effects';
import { get } from '../api';
import * as actions from '../actions/personoppgave_actions';

export function* hentPersonOppgaver(action: any) {
    yield put(actions.hentPersonOppgaverHenter());
    try {
        const path = '/ispersonoppgave/api/v1/personoppgave/personident';
        const data = yield call(get, path, action.fnr);
        const personOppgaveList = data || []
        yield put(actions.hentPersonOppgaverHentet(personOppgaveList));
    } catch (e) {
        yield put(actions.hentPersonOppgaverFeilet());
    }
}

export const skalHentePersonOppgaver = (state: any) => {
    const reducer = state.personoppgaver;
    return !(reducer.henter || reducer.hentingForsokt);
};

export function* hentPersonOppgaverHvisIkkeHentet(action: any) {
    const skalHente = yield select(skalHentePersonOppgaver);
    if (skalHente) {
        yield hentPersonOppgaver(action);
    }
}

function* watchHentPersonOppgaver() {
    yield takeEvery(actions.HENT_PERSONOPPGAVER_FORESPURT, hentPersonOppgaverHvisIkkeHentet);
}

export default function* personOppgaveSagas() {
    yield all([
        fork(watchHentPersonOppgaver),
    ]);
}
