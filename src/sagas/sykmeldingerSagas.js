import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../api';
import * as actions from '../actions/sykmeldinger_actions';
import { erDev } from '../selectors/toggleSelectors';
import mockSykmeldinger from '../../test/mockdata/mockSykmeldinger';

export function* hentSykmeldinger(action) {
    yield put(actions.henterSykmeldinger());
    try {
        const path = `${process.env.REACT_APP_SYFOSMREGISTER_ROOT}/v1/internal/sykmeldinger?fnr=${action.fnr}`;
        const data = yield call(get, path);
        yield put(actions.sykmeldingerHentet(data));
    } catch (e) {
        log(e);
        if (erDev()) {
            yield put(actions.sykmeldingerHentet(mockSykmeldinger));
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
