import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getWithoutThrows } from '../api/index';
import { log } from 'digisyfo-npm';

export function* hentLedere(action) {
    yield put({ type: 'HENTER_LEDERE' });
    try {
        const data = yield call(getWithoutThrows, `${window.APP_SETTINGS.REST_ROOT}/naermesteleder?fnr=${action.fnr}`);
        if (data.id) {
            const feilmelding = data.id;
            yield put({ type: 'HENT_LEDERE_IKKE_TILGANG', feilmelding });
            return;
        }
        yield put({ type: 'LEDERE_HENTET', data });
    } catch (e) {
        log(e);
        yield put({ type: 'HENT_LEDERE_FEILET' });
    }
}

function* watchHentLedere() {
    yield* takeEvery('HENT_LEDERE_FORESPURT', hentLedere);
}

export default function* ledereSagas() {
    yield fork(watchHentLedere);
}
