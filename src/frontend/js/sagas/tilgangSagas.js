import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getWithoutThrows } from '../api/index';
import * as actions from '../actions/tilgang_actions';
import * as actiontype from '../actions/actiontyper';
import { log } from 'digisyfo-npm';

export function* sjekkTilgang(action) {
    yield put(actions.sjekkerTilgang());
    try {
        const data = yield call(getWithoutThrows, `${window.APP_SETTINGS.TILGANGSKONTROLL_RESTROOT}/tilgang/tilgangtilbruker?fnr=${action.fnr}`);
        if (data.harTilgang === false) {
            yield put(actions.harIkkeTilgang(data.begrunnelse));
            return;
        }
        yield put(actions.harTilgang());
    } catch (e) {
        log(e);
        yield put(actions.sjekkTilgangFeilet());
    }
}

function* watchSjekkTilgang() {
    yield* takeEvery(actiontype.SJEKK_TILGANG_FORESPURT, sjekkTilgang);
}

export default function* tilgangSagas() {
    yield fork(watchSjekkTilgang);
}
