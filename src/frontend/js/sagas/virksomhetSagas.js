import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/virksomhet_actions';

export function* hentVirksomhet(action) {
    yield put(actions.henterVirksomhet());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/virksomhet/${action.orgnummer}`);
        yield put(actions.virksomhetHentet(action.orgnummer, data));
    } catch (e) {
        log(e);
        yield put(actions.hentVirksomhetFeilet());
    }
}

function* watchHentVirksomhet() {
    yield takeEvery(actions.HENT_VIRKSOMHET_FORESPURT, hentVirksomhet);
}

export default function* virksomhetSagas() {
    yield [
        fork(watchHentVirksomhet),
    ];
}
