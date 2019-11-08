import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get } from '../api';
import * as actions from '../actions/diskresjonskode_actions';

export function* hentDiskresjonskodeSaga(action) {
    yield put(actions.henterDiskresjonskode());
    try {
        const path = `${process.env.REACT_APP_REST_ROOT}/internad/diskresjonskode/${action.fnr}`;
        const data = yield call(get, path);
        yield put(actions.diskresjonskodeHentet(data));
    } catch (e) {
        yield put(actions.hentDiskresjonskodeFeilet());
    }
}
function* watchHentDiskresjonskode() {
    yield takeEvery(actions.HENT_DISKRESJONSKODE_FORESPURT, hentDiskresjonskodeSaga);
}

export default function* diskresjonskodeSagas() {
    yield fork(watchHentDiskresjonskode);
}
