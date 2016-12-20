import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../../api/index';
import * as actions from '../actions/arbeidstaker_actions';
import { HENT_ARBEIDSTAKER_FORESPURT } from '../actions/actiontyper';

export function* hentArbeidstaker(action) {
    yield put(actions.henterArbeidstaker());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/brukerinfo/${action.fnr}`);
        yield put(actions.arbeidstakerHentet(data));
    } catch (e) {
        yield put(actions.hentArbeidstakerFeilet());
    }
}

function* watchHentArbeidstaker() {
    yield* takeEvery(HENT_ARBEIDSTAKER_FORESPURT, hentArbeidstaker);
}

export default function* epostinnholdSagas() {
    yield [
        fork(watchHentArbeidstaker),
    ];
}
