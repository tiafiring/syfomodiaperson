import { call, fork, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log, get } from 'digisyfo-npm';
import * as actions from '../actions/soknader_actions';
import {
    HENT_SOKNADER_FORESPURT,
} from '../actions/actiontyper';
import mockSoknader from '../../test/mockdata/mockSoknader';
import { toggleMockSoknader } from '../selectors/toggleSelectors';

export function* hentSoknader() {
    yield put(actions.henterSoknader());
    try {
        const data = yield call(get, '/syfosoknad/soknader');
        yield put(actions.soknaderHentet(data));
    } catch (e) {
        log(e);
        if (toggleMockSoknader()) {
            yield put(actions.soknaderHentet(mockSoknader));
        } else {
            yield put(actions.hentSoknaderFeilet());
        }
    }
}

function* watchHentSoknader() {
    yield* takeEvery(HENT_SOKNADER_FORESPURT, hentSoknader);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
}
