import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../../api/index';
import * as actions from '../actions/epostinnhold_actions';
import * as arbeidsgiveractions from '../actions/arbeidsgiverepostinnhold_actions';
import { HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT, HENT_AVBRYT_MOTE_EPOSTINNHOLD_FORESPURT, HENT_BEKREFT_MOTE_ARBEIDSGIVEREPOSTINNHOLD_FORESPURT } from '../actions/actiontyper';
import { log } from 'digisyfo-npm';

export function* hentBekreftMoteEpostinnhold(action) {
    yield put(actions.henterEpostInnhold());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/epostinnhold/BEKREFTET?motedeltakeruuid=${action.motedeltakerUuid}&valgtAlternativId=${action.valgtAlternativId}`);
        yield put(actions.epostInnholdHentet('BEKREFT_TIDSPUNKT', data));
    } catch (e) {
        log(e);
        yield put(actions.hentEpostinnholdFeilet());
    }
}

export function* hentBekreftMoteArbeidsgiverEpostinnhold(action) {
    yield put(arbeidsgiveractions.henterArbeidstakerEpostInnhold());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/epostinnhold/BEKREFTET?motedeltakeruuid=${action.motedeltakerUuid}&valgtAlternativId=${action.valgtAlternativId}`);
        yield put(arbeidsgiveractions.arbeidsgiverEpostInnholdHentet('BEKREFT_TIDSPUNKT', data));
    } catch (e) {
        log(e);
        yield put(arbeidsgiveractions.hentArbeidsgiverEpostinnholdFeilet());
    }
}

export function* hentAvbrytMoteEpostinnhold(action) {
    yield put(actions.henterEpostInnhold());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEADMIN_REST_ROOT}/epostinnhold/AVBRUTT?motedeltakeruuid=${action.motedeltakerUuid}`);
        yield put(actions.epostInnholdHentet('AVBRYT_TIDSPUNKT', data));
    } catch (e) {
        log(e);
        yield put(actions.hentEpostinnholdFeilet());
    }
}

function* watchHentBekreftMoteEpostinnhold() {
    yield* takeEvery(HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT, hentBekreftMoteEpostinnhold);
}

function* watchHentBekreftMoteArbeidsgiverEpostinnhold() {
    yield* takeEvery(HENT_BEKREFT_MOTE_ARBEIDSGIVEREPOSTINNHOLD_FORESPURT, hentBekreftMoteArbeidsgiverEpostinnhold);
}

function* watchHentAvbrytMoteEpostinnhold() {
    yield* takeEvery(HENT_AVBRYT_MOTE_EPOSTINNHOLD_FORESPURT, hentAvbrytMoteEpostinnhold);
}

export default function* epostinnholdSagas() {
    yield [
        fork(watchHentBekreftMoteEpostinnhold),
        fork(watchHentAvbrytMoteEpostinnhold),
        fork(watchHentAvbrytMoteEpostinnhold),
        fork(watchHentBekreftMoteArbeidsgiverEpostinnhold),
    ];
}
