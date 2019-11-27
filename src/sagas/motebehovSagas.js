import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    get,
    post,
} from '../api';
import * as actions from '../actions/motebehov_actions';
import * as behandleActions from '../actions/behandlemotebehov_actions';
import { fullNaisUrlDefault } from '../utils/miljoUtil';
import { HOST_NAMES } from '../konstanter';

export function* hentMotebehov(action) {
    const fnr = action.fnr ? action.fnr : '';
    yield put(actions.henterMotebehov());
    try {
        const host = HOST_NAMES.SYFOMOTEBEHOV;
        const path = `${process.env.REACT_APP_SYFOMOTEBEHOV_ROOT}/internad/veileder/motebehov?fnr=${fnr}`;
        const url = fullNaisUrlDefault(host, path);
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

export function* behandleMotebehov(action) {
    const fnr = action.fnr;
    yield put(behandleActions.behandleMotebehovBehandler());
    try {
        const host = HOST_NAMES.SYFOMOTEBEHOV;
        const path = `${process.env.REACT_APP_SYFOMOTEBEHOV_ROOT}/internad/veileder/motebehov/${fnr}/behandle`;
        const url = fullNaisUrlDefault(host, path);
        yield call(post, url);
        yield put(behandleActions.behandleMotebehovBehandlet(action.veilederIdent));
    } catch (e) {
        if (e.status === 403) {
            yield put(behandleActions.behandleMotebehovForbudt());
            return;
        }
        log(e);
        yield put(behandleActions.behandleMotebehovFeilet());
    }
}

function* watchHentMotebehov() {
    yield takeEvery(actions.HENT_MOTEBEHOV_FORESPURT, hentMotebehov);
}

function* watchbehandleMotebehov() {
    yield takeEvery(behandleActions.BEHANDLE_MOTEBEHOV_FORESPURT, behandleMotebehov);
}

export default function* motebehovSagas() {
    yield all([
        fork(watchHentMotebehov),
        fork(watchbehandleMotebehov),
    ]);
}
