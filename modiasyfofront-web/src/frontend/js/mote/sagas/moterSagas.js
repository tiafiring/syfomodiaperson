import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { post } from '../../api';

export function* opprettMote(action) {
    yield put({ type: 'OPPRETTER_MOTE' });
    try {
        yield call(post, `${window.SYFO_SETTINGS.MOTEADMIN_REST_ROOT}/mote/${action.fnr}/opprett`, action.data);
        yield put({ type: 'MOTE_OPPRETTET', data: action.data, fnr: action.fnr });
    } catch (e) {
        yield put({ type: 'OPPRETT_MOTE_FEILET' });
    }
}

function* watchOpprettMote() {
    yield* takeEvery('OPPRETT_MOTE_FORESPURT', opprettMote);
}

export default function* ledereSagas() {
    yield fork(watchOpprettMote);
}
