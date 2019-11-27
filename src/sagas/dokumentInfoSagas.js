import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects';
import { get } from '../api';
import * as actions from '../actions/dokumentinfo_actions';

export function* dokumentInfoSaga(action) {
    yield put(actions.henterDokumentinfo());
    try {
        const path = `${process.env.REACT_APP_OPPFOLGINGSPLANREST_ROOT}/internad/dokument/${action.id}/dokumentinfo`;
        const data = yield call(get, path);
        yield put(actions.dokumentinfoHentet(data));
    } catch (e) {
        yield put(actions.hentDokumentinfoFeilet());
    }
}

function* watchHentDokumentInfo() {
    yield takeEvery(actions.HENT_DOKUMENTINFO_FORESPURT, dokumentInfoSaga);
}

export default function* dokumentInfoSagas() {
    yield all([
        fork(watchHentDokumentInfo),
    ]);
}
