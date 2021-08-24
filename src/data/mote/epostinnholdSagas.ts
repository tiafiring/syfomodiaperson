import { call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./epostinnhold_actions";
import * as arbeidsgiveractions from "./arbeidsgiverepostinnhold_actions";
import { get } from "@/api/axios";
import { EpostInnholdDTO } from "./types/EpostInnholdDTO";
import { SYFOMOTEADMIN_ROOT } from "@/apiConstants";

export function* hentBekreftMoteEpostinnhold(action: any) {
  yield put(actions.henterEpostInnhold());

  const path = `${SYFOMOTEADMIN_ROOT}/epostinnhold/BEKREFTET?motedeltakeruuid=${action.motedeltakerUuid}&valgtAlternativId=${action.valgtAlternativId}`;
  try {
    const data: EpostInnholdDTO = yield call(get, path);
    yield put(actions.epostInnholdHentet("BEKREFT_TIDSPUNKT", data));
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentEpostinnholdFeilet());
  }
}

export function* hentBekreftMoteArbeidsgiverEpostinnhold(action: any) {
  yield put(arbeidsgiveractions.henterArbeidstakerEpostInnhold());

  const path = `${SYFOMOTEADMIN_ROOT}/epostinnhold/BEKREFTET?motedeltakeruuid=${action.motedeltakerUuid}&valgtAlternativId=${action.valgtAlternativId}`;
  try {
    const data: EpostInnholdDTO = yield call(get, path);
    yield put(
      arbeidsgiveractions.arbeidsgiverEpostInnholdHentet(
        "BEKREFT_TIDSPUNKT",
        data
      )
    );
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(arbeidsgiveractions.hentArbeidsgiverEpostinnholdFeilet());
  }
}

export function* hentAvbrytMoteEpostinnhold(action: any) {
  yield put(actions.henterEpostInnhold());

  const path = `${SYFOMOTEADMIN_ROOT}/epostinnhold/AVBRUTT?motedeltakeruuid=${action.motedeltakerUuid}`;
  try {
    const data: EpostInnholdDTO = yield call(get, path);
    yield put(actions.epostInnholdHentet("AVBRYT_TIDSPUNKT", data));
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentEpostinnholdFeilet());
  }
}

export default function* epostinnholdSagas() {
  yield takeEvery(
    actions.HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT,
    hentBekreftMoteEpostinnhold
  );
  yield takeEvery(
    arbeidsgiveractions.HENT_BEKREFT_MOTE_ARBEIDSGIVEREPOSTINNHOLD_FORESPURT,
    hentBekreftMoteArbeidsgiverEpostinnhold
  );
  yield takeEvery(
    actions.HENT_AVBRYT_MOTE_EPOSTINNHOLD_FORESPURT,
    hentAvbrytMoteEpostinnhold
  );
}
