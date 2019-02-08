import {
    call,
    put,
    fork,
    takeEvery,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/oppfolgingstilfelleperioder_actions';
import { HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT } from '../actions/oppfolgingstilfelleperioder_actions';

export function* hentOppfolgingstilfelleperioder(action) {
    yield put(actions.hentOppfolgingstilfelleperioderHenter(action.orgnummer));
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep/oppfolgingstilfelleperioder?fnr=${action.fnr}&orgnummer=${action.orgnummer}`);
        yield put(actions.hentOppfolgingstilfelleperioderHentet(data, action.orgnummer));
    } catch (e) {
        log(e);
        yield put(actions.hentOppfolgingstilfelleperioderFeilet(action.orgnummer));
    }
}

function* watchHentOppfolgingstilfelleperioder() {
    yield takeEvery(HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT, hentOppfolgingstilfelleperioder);
}

export default function* oppfolgingstilfelleperioderSagas() {
    yield fork(watchHentOppfolgingstilfelleperioder);
}
