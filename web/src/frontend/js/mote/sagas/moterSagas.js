import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { post, get } from '../../api';
import * as actions from '../actions/moter_actions';

export function* opprettMote(action) {
    yield put(actions.oppretterMote());
    try {
        yield call(post, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/moter/${action.fnr}/opprett`, action.data);
        yield put(actions.moteOpprettet(action.data, action.fnr));
    } catch (e) {
        console.log("err", e);
        yield put(actions.opprettMoteFeilet());
    }
}

export function* hentMoter(action) {
    yield put(actions.henterMoter());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/moter/${action.fnr}`);
        yield put(actions.moterHentet(data));
    } catch (e) {
        console.log("err", e);
        yield put(actions.hentMoterFeilet());
    }
}

export function* avbrytMote(action) {
    yield put(actions.avbryterMote(action.uuid));
    try {
        yield call(post, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/mote/${action.uuid}/avbryt`);
        yield put(actions.moteAvbrutt(action.uuid));
    } catch (e) {
        console.log("err", e);
        yield put(actions.avbrytMoteFeilet());
    }
}

function* watchOpprettMote() {
    yield* takeEvery('OPPRETT_MOTE_FORESPURT', opprettMote);
}

function* watchAvbrytMote() {
    yield* takeEvery('AVBRYT_MOTE_FORESPURT', avbrytMote);
}

function* watchHentMoter() {
    yield* takeEvery('HENT_MOTER_FORESPURT', hentMoter);
}

function * watchMoteOpprettet() {
    yield* takeEvery('MOTE_OPPRETTET', hentMoter);
}

export default function* moterSagas() {
    yield [
        fork(watchOpprettMote),
        fork(watchHentMoter),
        fork(watchAvbrytMote),
        fork(watchMoteOpprettet),
    ];
}
