import {
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api';
import * as actions from '../actions/soknader_actions';
// import mockSoknader from '../../test/mockdata/mockSoknader';
import soknader from '../../mock/data/soknader-annet-arbeidsforhold';
import { erDev } from '../selectors/toggleSelectors';

export function* hentSoknader(action) {
    const fnr = action.fnr ? action.fnr : '';
    yield put(actions.henterSoknader());
    try {
        const path = `${process.env.REACT_APP_SYFOSOKNAD_ROOT}/veileder/internad/soknader?fnr=${fnr}`;
        const data = yield call(get, path);
        yield put(actions.soknaderHentet(data));
    } catch (e) {
        log(e);
        if (erDev()) {
            yield put(actions.soknaderHentet(soknader));
        } else {
            yield put(actions.hentSoknaderFeilet());
        }
    }
}

function* watchHentSoknader() {
    yield takeEvery(actions.HENT_SOKNADER_FORESPURT, hentSoknader);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
}
