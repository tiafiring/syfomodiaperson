import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/motebehov_actions';
import * as actiontyper from '../actions/actiontyper';

export const hentSyfomotebehovUrl = () => {
    const apiUrl = 'syfomotebehov/api/veileder';
    if (window.location.href.indexOf('tjenester.nav') > -1) {
        // Prod
        return `https://app.adeo.no/${apiUrl}`;
    } else if (window.location.href.indexOf('localhost') > -1) {
        // Lokalt
        return `http://localhost:8811/${apiUrl}`;
    }
    // Q1
    return `https://syfomotebehov-q1.nais.preprod.local/${apiUrl}`;
};

export function* hentMotebehov(action) {
    const fnr = action.fnr ? action.fnr : '';
    yield put(actions.henterMotebehov());
    try {
        const url = `${hentSyfomotebehovUrl()}/motebehov?fnr=${fnr}`;
        const data = yield call(get, url);
        yield put(actions.motebehovHentet(data));
    } catch (e) {
        if (e.status === 403) {
            yield put(actions.hentMotebehovIkkeTilgang(e.tilgang));
            return;
        }
        log(e);
        yield put(actions.hentMotebehovFeilet());
    }
}

function* watchHentMotebehov() {
    yield* takeEvery(actiontyper.HENT_MOTEBEHOV_FORESPURT, hentMotebehov);
}

export default function* motebehovSagas() {
    yield [
        fork(watchHentMotebehov),
    ];
}
