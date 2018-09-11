import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/sykepengesoknader_actions';
import { sykepengesoknaderHentet } from '../actions/sykepengesoknader_actions';
import { toggleMockSoknader } from '../selectors/toggleSelectors';
import mockSykepengesoknader from '../../test/mockdata/mockSykepengesoknader';

export function* hentSykepengesoknader(action) {
    yield put(actions.henterSykepengesoknader());

    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykepengesoknader?fnr=${action.fnr}`);
        yield put(sykepengesoknaderHentet(data));
    } catch (e) {
        log(e);
        if (toggleMockSoknader()) {
            yield put(sykepengesoknaderHentet(mockSykepengesoknader));
        } else {
            yield put(actions.hentSykepengesoknaderFeilet());
        }
    }
}

function* watchHentSykepengesoknader() {
    yield* takeEvery('HENT_SYKEPENGESOKNADER_FORESPURT', hentSykepengesoknader);
}

export default function* sykepengesoknaderSagas() {
    yield fork(watchHentSykepengesoknader);
}
