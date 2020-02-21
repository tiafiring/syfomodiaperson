import {
    call,
    put,
    fork,
    takeEvery,
} from 'redux-saga/effects';
import { get } from '../api';
import * as actions from '../actions/arbeidsgiverssykmeldinger_actions';

export function* hentArbeidsgiversSykmeldinger(action) {
    yield put(actions.henterArbeidsgiversSykmeldinger());

    try {
        const path = `${process.env.REACT_APP_SYFOSMREGISTER_ROOT}/v1/internal/sykmeldinger?fnr=${action.fnr}`;
        const data = yield call(get, path);

        if (!!data.err) {
            yield put(actions.hentArbeidsgiversSykmeldingerFeilet());
        } else {
            yield put(actions.arbeidsgiversSykmeldingerHentet(data, action.fnr));
        }
    } catch (e) {
        yield put(actions.hentArbeidsgiversSykmeldingerFeilet());
    }
}

function* watchHentArbeidsgiversSykmeldinger() {
    yield takeEvery('HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT', hentArbeidsgiversSykmeldinger);
}

export default function* ArbeidsgiversSykmeldingerSagas() {
    yield fork(watchHentArbeidsgiversSykmeldinger);
}
