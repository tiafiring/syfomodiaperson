import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/soknader_actions';
import {
    HENT_SOKNADER_FORESPURT,
} from '../actions/actiontyper';
import mockSoknader from '../../test/mockdata/mockSoknader';
import { erDev } from '../selectors/toggleSelectors';

export function* hentSoknader(action) {
    const fnr = action.fnr ? action.fnr : '';
    yield put(actions.henterSoknader());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.SYFOSOKNAD_ROOT}/veileder/soknader?fnr=${fnr}`);
        yield put(actions.soknaderHentet(data));
    } catch (e) {
        log(e);
        if (erDev()) {
            yield put(actions.soknaderHentet(mockSoknader));
        } else {
            yield put(actions.hentSoknaderFeilet());
        }
    }
}

function* watchHentSoknader() {
    yield takeEvery(HENT_SOKNADER_FORESPURT, hentSoknader);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
}
