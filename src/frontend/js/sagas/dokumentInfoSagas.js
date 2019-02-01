import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { get } from '../api/index';
import * as actions from '../actions/dokumentinfo_actions';
import * as actiontype from '../actions/actiontyper';

export function* dokumentInfoSaga(action) {
    yield put(actions.henterDokumentinfo());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/dokument/${action.id}/dokumentinfo`);
        yield put(actions.dokumentinfoHentet(data));
    } catch (e) {
        yield put(actions.hentDokumentinfoFeilet());
    }
}

function* watchHentDokumentInfo() {
    yield takeEvery(actiontype.HENT_DOKUMENTINFO_FORESPURT, dokumentInfoSaga);
}

export default function* dokumentInfoSagas() {
    yield all([
        fork(watchHentDokumentInfo),
    ]);
}
