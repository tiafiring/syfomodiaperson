import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { setLedetekster, log } from '@navikt/digisyfo-npm';
import { get } from '../api';
import * as actions from '../actions/ledetekster_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentLedetekster() {
    yield put(actions.henterLedetekster());
    try {
        const ledetekster = yield call(get, `${window.APP_SETTINGS.TEKSTER_REST_ROOT}/tekster`);
        setLedetekster(ledetekster);
        yield put(actions.ledeteksterHentet(ledetekster));
    } catch (e) {
        log(e);
        yield put(actions.hentLedeteksterFeilet());
    }
}

function* watchHentLedetekster() {
    yield takeEvery(actiontyper.HENT_LEDETEKSTER_FORESPURT, hentLedetekster);
}

export default function* ledeteksterSagas() {
    yield fork(watchHentLedetekster);
}
