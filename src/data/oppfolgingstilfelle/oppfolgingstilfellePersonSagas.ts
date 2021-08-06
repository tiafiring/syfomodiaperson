import { call, put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./oppfolgingstilfellerperson_actions";
import { get, Result, Success } from "../../api/axios";
import { OppfolgingstilfellePerson } from "./types/OppfolgingstilfellePerson";

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
    yield put(actions.hentOppfolgingstilfellerPersonUtenArbeidsiverHenter());

    const path = `${process.env.REACT_APP_REST_ROOT}/internad/oppfolgingstilfelleperioder/utenarbeidsgiver?fnr=${action.fnr}`;
    const result: Result<OppfolgingstilfellePerson[]> = yield call(get, path);

    if (result instanceof Success) {
      yield put(
        actions.hentOppfolgingstilfellerPersonUtenArbeidsiverHentet(result.data)
      );
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentOppfolgingstilfellerPersonUtenArbeidsiverFeilet());
    }
  }
}

export default function* oppfolgingstilfellerPersonSagas() {
  yield takeEvery(
    actions.HENT_OPPFOLGINGSTILFELLER_PERSON_FORESPURT,
    hentOppfolgingstilfellerPersonHvisIkkeHentet
  );
}
