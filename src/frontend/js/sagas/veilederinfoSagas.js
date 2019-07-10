import { call, put, fork, all, takeEvery } from 'redux-saga/effects';
import { get } from '../api/index';
import * as actions from '../actions/veilederinfo_actions';

export function* hentVeilederinfoSaga() {
    yield put(actions.henterVeilederinfo());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.VEILEDEROPPGAVERREST_ROOT}/veilederinfo`);
        yield put(actions.veilederinfoHentet(data));
    } catch (e) {
        yield put(actions.hentVeilederinfoFeilet());
    }
}

function* watchHentVeilederinfo() {
    yield takeEvery(actions.HENT_VEILEDERINFO_FORESPURT, hentVeilederinfoSaga);
}

export default function* veilederinfoSagas() {
    yield all([
        fork(watchHentVeilederinfo),
    ]);
}
