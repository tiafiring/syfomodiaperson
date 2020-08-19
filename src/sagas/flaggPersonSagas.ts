import {
    all,
    call,
    fork,
    put,
    select,
    takeEvery,
} from 'redux-saga/effects';
import {
    get,
    post,
} from '../api';
import * as actions from '../actions/flaggperson_actions';

export function* hentStatus(action: any) {
    yield put(actions.henterStatus());
    try {
        const path = `${process.env.REACT_APP_ISPENGESTOPP_ROOT}/v1/person/status?fnr=${action.fnr}`;
        const data = yield call(get, path);
        if (!!data.err) {
            yield put(actions.hentStatusFeilet());
        } else {
            yield put(actions.statusHentet(data, action.fnr));
        }
    } catch (e) {
        yield put(actions.hentStatusFeilet());
    }
}

export const skalHenteStatus = (state: { flaggperson: any; }) => {
    const reducer = state.flaggperson;
    return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentStatusHvisIkkeHentet(action: any) {
    const skalHente = yield select(skalHenteStatus);
    if (skalHente) {
        yield hentStatus(action);
    }
}

function* watchHentStatus() {
    yield takeEvery(actions.HENT_STATUS_FORESPURT, hentStatusHvisIkkeHentet);
}

export function* endreStatus(action: any) {
    yield put(actions.endrerStatus());
    try {
        const path = `${process.env.REACT_APP_ISPENGESTOPP_ROOT}/v1/person/flagg`;
        yield call(post, path, action.stoppAutomatikk);

        if (!!action.data.err) {
            yield put(actions.endreStatusFeilet());
        } else {
            yield put(actions.statusEndret());
            const fnr = action.stoppAutomatikk.sykmeldtFnr.value;
            yield hentStatus({ fnr });
        }
    } catch (e) {
        yield put(actions.endreStatusFeilet());
    }
}

function* watchEndreStatus() {
    yield takeEvery(actions.ENDRE_STATUS_FORESPURT, endreStatus);
}

export default function* flaggPersonSagas() {
    yield all([
        fork(watchEndreStatus),
        fork(watchHentStatus),
    ]);
}
