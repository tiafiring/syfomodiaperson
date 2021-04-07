import { call, put, fork, takeEvery, select } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./oppfolgingstilfellerperson_actions";

export function* hentOppfolgingstilfellePersonUtenArbeidsgiver(action: any) {
  yield put(actions.hentOppfolgingstilfellerPersonUtenArbeidsiverHenter());
  try {
    const path = `${process.env.REACT_APP_REST_ROOT}/internad/oppfolgingstilfelleperioder/utenarbeidsgiver?fnr=${action.fnr}`;
    const data = yield call(get, path);
    yield put(
      actions.hentOppfolgingstilfellerPersonUtenArbeidsiverHentet(data)
    );
  } catch (e) {
    yield put(actions.hentOppfolgingstilfellerPersonUtenArbeidsiverFeilet());
  }
}

export const harInnsendtSykmeldingUtenArbeidsgiver = (sykmeldinger: any) => {
  const erSykmeldingerHentet = sykmeldinger.hentet;
  if (erSykmeldingerHentet) {
    return (
      sykmeldinger.data.filter((sykmelding: any) => {
        return !sykmelding.mottakendeArbeidsgiver;
      }).length > 0
    );
  }
  return false;
};

export const skalHenteOppfolgingstilfelleperioder = (state: any) => {
  if (harInnsendtSykmeldingUtenArbeidsgiver(state.sykmeldinger)) {
    const reducer = state.oppfolgingstilfellerperson;
    return (!reducer.henter && !reducer.hentingForsokt) || false;
  } else {
    return false;
  }
};

export function* hentOppfolgingstilfellerPersonHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteOppfolgingstilfelleperioder);
  if (skalHente) {
    yield call(hentOppfolgingstilfellePersonUtenArbeidsgiver, action);
  }
}

function* watchHentOppfolgingstilfellerPerson() {
  yield takeEvery(
    actions.HENT_OPPFOLGINGSTILFELLER_PERSON_FORESPURT,
    hentOppfolgingstilfellerPersonHvisIkkeHentet
  );
}

export default function* oppfolgingstilfellerPersonSagas() {
  yield fork(watchHentOppfolgingstilfellerPerson);
}
