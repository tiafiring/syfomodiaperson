// import { call, put, fork } from 'redux-saga/effects';
import { fork, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
// import { post } from '../../api';

export function* opprettMote(action) {
    yield put({ type: 'MOTE_OPPRETTET', fnr: action.fnr, data: action.data });
    // yield put({ type: 'OPPRETTER_MOTE' });
    // try {
    //     const data = yield call(post, `${window.SYFO_SETTINGS.REST_ROOT}/rest/mote?fnr=${action.fnr}`, action.data);
    //     yield put({ type: 'MOTE_OPPRETTET', data: action.data });
    // } catch (e) {
    //     yield put({ type: 'OPPRETT_MOTE_FEILET' });
    // }
}

function* watchOpprettMote() {
    yield* takeEvery('OPPRETT_MOTE_FORESPURT', opprettMote);
}

export default function* ledereSagas() {
    yield fork(watchOpprettMote);
}
