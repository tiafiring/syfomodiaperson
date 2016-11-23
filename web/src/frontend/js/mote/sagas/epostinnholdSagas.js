import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../../api/index';
import * as actions from '../actions/epostinnhold_actions';

export function* hentBekreftMoteEpostinnhold(action) {
    yield put(actions.henterEpostInnhold());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/epostinnhold/BEKREFTET?motedeltakeruuid=${action.motedeltakerUuid}&valgtAlternativId=${action.valgtAlternativId}`);
        yield put(actions.epostInnholdHentet('BEKREFT_TIDSPUNKT', data));
    } catch (e) {
        yield put(actions.hentEpostinnholdFeilet());
    }
}

function* watchHentBekreftMoteEpostinnhold() {
    yield* takeEvery('HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT', hentBekreftMoteEpostinnhold);
}

export default function* epostinnholdSagas() {
    yield [
        fork(watchHentBekreftMoteEpostinnhold),
    ];
}
