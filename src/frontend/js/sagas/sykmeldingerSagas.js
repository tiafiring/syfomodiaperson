import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/sykmeldinger_actions';
import { sykmeldingerHentet } from '../actions/sykmeldinger_actions';
import { erDev } from '../selectors/toggleSelectors';
import mockSykmeldinger from '../../test/mockdata/mockSykmeldinger';

export function* hentSykmeldinger(action) {
    yield put(actions.henterSykmeldinger());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger?fnr=${action.fnr}`);
        yield put(sykmeldingerHentet(data));
    } catch (e) {
        log(e);
        if (erDev()) {
            yield put(sykmeldingerHentet(mockSykmeldinger));
        } else {
            yield put(actions.hentSykmeldingerFeilet());
        }
    }
}

function* watchHentSykmeldinger() {
    yield takeEvery(actions.HENT_SYKMELDINGER_FORESPURT, hentSykmeldinger);
}

export default function* sykmeldingerSagas() {
    yield fork(watchHentSykmeldinger);
}
