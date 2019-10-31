import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api';
import * as actions from '../actions/sykepengesoknader_actions';
import { erDev } from '../selectors/toggleSelectors';
import mockSykepengesoknader from '../../test/mockdata/mockSykepengesoknader';

export function* hentSykepengesoknader(action) {
    yield put(actions.henterSykepengesoknader());

    try {
        const data = yield call(get, `${process.env.REACT_APP_REST_ROOT}/sykepengesoknader?fnr=${action.fnr}`);
        yield put(actions.sykepengesoknaderHentet(data));
    } catch (e) {
        log(e);
        if (erDev()) {
            yield put(actions.sykepengesoknaderHentet(mockSykepengesoknader));
        } else {
            yield put(actions.hentSykepengesoknaderFeilet());
        }
    }
}

function* watchHentSykepengesoknader() {
    yield takeEvery('HENT_SYKEPENGESOKNADER_FORESPURT', hentSykepengesoknader);
}

export default function* sykepengesoknaderSagas() {
    yield fork(watchHentSykepengesoknader);
}
