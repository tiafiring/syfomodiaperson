import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api/index';
import {
    HENT_NAVBRUKER_FORESPURT,
    HENTER_NAVBRUKER,
    NAVBRUKER_HENTET,
    HENT_NAVBRUKER_FEILET,
} from '../actions/actiontyper';

export function* hentNavbruker(action) {
    yield put({ type: HENTER_NAVBRUKER });
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/brukerinfo?fnr=${action.fnr}`);
        yield put({ type: NAVBRUKER_HENTET, data });
    } catch (e) {
        log(e);
        yield put({ type: HENT_NAVBRUKER_FEILET });
    }
}

function* watchHentNavbruker() {
    yield* takeEvery(HENT_NAVBRUKER_FORESPURT, hentNavbruker);
}

export default function* ledereSagas() {
    yield [
        fork(watchHentNavbruker),
    ];
}
