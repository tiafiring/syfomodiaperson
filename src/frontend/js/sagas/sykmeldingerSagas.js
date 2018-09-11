import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/sykmeldinger_actions';
import { sykmeldingerHentet } from '../actions/sykmeldinger_actions';
import { HENT_SYKMELDINGER_FORESPURT } from '../actions/actiontyper';
import { toggleMockSoknader } from '../selectors/toggleSelectors';
import mockSykmeldinger from '../../test/mockdata/mockSykmeldinger';

export function* hentSykmeldinger(action) {
    yield put(actions.henterSykmeldinger());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger?fnr=${action.fnr}`);
        yield put(sykmeldingerHentet(data));
    } catch (e) {
        log(e);
        if (toggleMockSoknader()) {
            yield put(sykmeldingerHentet(mockSykmeldinger));
        } else {
            yield put(actions.hentSykmeldingerFeilet());
        }
    }
}

function* watchHentSykmeldinger() {
    yield* takeEvery(HENT_SYKMELDINGER_FORESPURT, hentSykmeldinger);
}

export default function* sykmeldingerSagas() {
    yield fork(watchHentSykmeldinger);
}
