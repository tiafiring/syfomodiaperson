import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get } from '../api/index';
import * as actions from '../actions/egenansatt_actions';

export function* hentEgenansattSaga(action) {
    yield put(actions.henterEgenansatt());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/egenansatt/${action.fnr}`);
        yield put(actions.egenansattHentet(data));
    } catch (e) {
        yield put(actions.hentEgenansattFeilet());
    }
}
function* watchHentEgenansatt() {
    yield takeEvery(actions.HENT_EGENANSATT_FORESPURT, hentEgenansattSaga);
}

export default function* egenansattSagas() {
    yield fork(watchHentEgenansatt);
}
