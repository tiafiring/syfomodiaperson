import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { post, get } from '../../api';
import * as actions from '../actions/moter_actions';

export function* opprettMote(action) {
    yield put(actions.oppretterMote());
    try {
        yield call(post, `${window.SYFO_SETTINGS.MOTEADMIN_REST_ROOT}/moter/${action.fnr}/opprett`, action.data);
        yield put(actions.moteOpprettet(action.data, action.fnr));
    } catch (e) {
        yield put(actions.opprettMoteFeilet());
    }
}

export function* hentMoter(action) {
    yield put(actions.henterMoter());
    try {
        const data = yield call(get, `${window.SYFO_SETTINGS.MOTEADMIN_REST_ROOT}/moter/${action.fnr}`);
        yield put(actions.moterHentet(data));
    } catch (e) {
        yield put(actions.hentMoterFeilet());
    }
}

function* watchOpprettMote() {
    yield* takeEvery('OPPRETT_MOTE_FORESPURT', opprettMote);
}

function* watchHentMoter() {
    yield* takeEvery('HENT_MOTER_FORESPURT', hentMoter);
}

export default function* moterSagas() {
    yield [
        fork(watchOpprettMote),
        fork(watchHentMoter),
    ];
}
