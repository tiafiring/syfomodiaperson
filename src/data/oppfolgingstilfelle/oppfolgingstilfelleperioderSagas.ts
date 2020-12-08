import { call, put, fork, takeEvery, select } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./oppfolgingstilfelleperioder_actions";
import { LedereState } from "../leder/ledere";

export function* hentOppfolgingstilfelleperioder(
  action: any,
  orgnummer: string
) {
  yield put(actions.hentOppfolgingstilfelleperioderHenter(orgnummer));
  try {
    const path = `${process.env.REACT_APP_REST_ROOT}/internad/oppfolgingstilfelleperioder?fnr=${action.fnr}&orgnummer=${orgnummer}`;
    const data = yield call(get, path);
    yield put(actions.hentOppfolgingstilfelleperioderHentet(data, orgnummer));
  } catch (e) {
    yield put(actions.hentOppfolgingstilfelleperioderFeilet(orgnummer));
  }
}

export const hentLedereVirksomhetsnummerList = (ledere: LedereState) => {
  const erLedereHentet = ledere.hentet;
  if (erLedereHentet) {
    return ledere.data.map((leder) => {
      return leder.orgnummer;
    });
  }
  return [];
};

export const hentSykmeldingerVirksomhetsnummerList = (sykmeldinger: any) => {
  const erSykmeldingerHentet = sykmeldinger.hentet;
  if (erSykmeldingerHentet) {
    return sykmeldinger.data
      .filter((sykmelding: any) => {
        return sykmelding.mottakendeArbeidsgiver;
      })
      .map((sykmelding: any) => {
        return sykmelding.mottakendeArbeidsgiver.virksomhetsnummer;
      });
  }
  return [];
};

export const hentVirksomhetsnummerList = (state: any) => {
  const ledereVirksomhetNrList = hentLedereVirksomhetsnummerList(state.ledere);
  const sykmeldingerVirksomhetsNrList = hentSykmeldingerVirksomhetsnummerList(
    state.sykmeldinger
  );
  return [
    ...new Set([...sykmeldingerVirksomhetsNrList, ...ledereVirksomhetNrList]),
  ];
};

export const skalHenteOppfolgingstilfelleperioder = (
  state: any,
  orgnummer: string
) => {
  const reducer = state.oppfolgingstilfelleperioder[orgnummer] || {};
  return (!reducer.henter && !reducer.hentingForsokt) || false;
};

export function* hentOppfolgingstilfelleperioderHvisIkkeHentet(action: any) {
  const virksomhetsNrList = yield select(hentVirksomhetsnummerList);
  for (let i = 0; i < virksomhetsNrList.length; i++) {
    const skalHente = yield select(
      skalHenteOppfolgingstilfelleperioder,
      virksomhetsNrList[i]
    );
    if (skalHente) {
      yield call(hentOppfolgingstilfelleperioder, action, virksomhetsNrList[i]);
    }
  }
}

function* watchHentOppfolgingstilfelleperioder() {
  yield takeEvery(
    actions.HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT,
    hentOppfolgingstilfelleperioderHvisIkkeHentet
  );
}

export default function* oppfolgingstilfelleperioderSagas() {
  yield fork(watchHentOppfolgingstilfelleperioder);
}
