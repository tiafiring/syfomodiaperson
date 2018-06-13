import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/tilgang_actions';
import * as actiontype from '../actions/actiontyper';

export function* sjekkTilgang(action) {
    yield put(actions.sjekkerTilgang());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.TILGANGSKONTROLL_RESTROOT}/tilgang/tilgangtilbruker?fnr=${action.fnr}`);
        if (data.harTilgang === true) {
            yield put(actions.harTilgang());
        }
    } catch (e) {
        if (e.status === 403) {
            yield put(actions.harIkkeTilgang(e.tilgang.begrunnelse));
            return;
        }
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
