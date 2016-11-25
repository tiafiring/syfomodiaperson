import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { post, get } from '../../api/index';
import history from '../../history';
import * as actions from '../actions/moter_actions';

export function* opprettMote(action) {
    yield put(actions.oppretterMote());
    try {
        yield call(post, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/moter`, action.data);
        yield put(actions.moteOpprettet(action.data));
    } catch (e) {
        yield put(actions.opprettMoteFeilet());
    }
}

export function* hentMoter(action) {
    yield put(actions.henterMoter());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/moter?fnr=${action.fnr}`);
        yield put(actions.moterHentet(data));
    } catch (e) {
        yield put(actions.hentMoterFeilet());
    }
}

export function* avbrytMote(action) {
    yield put(actions.avbryterMote(action.uuid));
    try {
        yield call(post, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/moter/${action.uuid}/avbryt`);
        yield put(actions.moteAvbrutt(action.uuid));
        history.replace(`/sykefravaer/${action.fnr}/mote`);
    } catch (e) {
        yield put(actions.avbrytMoteFeilet());
    }
}

export function* bekreftMote(action) {
    yield put(actions.bekrefterMote());
    try {
        yield call(post, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/moter/${action.moteUuid}/bekreft?valgtAlternativId=${action.valgtAlternativId}`);
        yield put(actions.moteBekreftet(action.moteUuid, action.valgtAlternativId));
        history.replace(`/sykefravaer/${action.fnr}/mote`);
    } catch (e) {
        yield put(actions.bekreftMoteFeilet());
    }
}

function* watchOpprettMote() {
    yield* takeEvery('OPPRETT_MOTE_FORESPURT', opprettMote);
}

function* watchAvbrytMote() {
    yield* takeEvery('AVBRYT_MOTE_FORESPURT', avbrytMote);
}

function* watchBekreftMote() {
    yield* takeEvery('BEKREFT_MOTE_FORESPURT', bekreftMote);
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
        fork(watchBekreftMote),
        fork(watchMoteOpprettet),
    ];
}
