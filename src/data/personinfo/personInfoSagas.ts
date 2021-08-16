import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "@/api/axios";
import * as actions from "./personInfo_actions";
import { PersonAdresse } from "./types/PersonAdresse";
import { SYFOPERSON_ROOT } from "@/apiConstants";

export const skalHentePersonAdresse = (state: any) => {
  const reducer = state.personadresse;
  return !(reducer.henter || reducer.hentingForsokt);
};

export function* hentPersonAdresseHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHentePersonAdresse);
  if (skalHente) {
    yield put(actions.hentPersonAdresseHenter());
    const path = `${SYFOPERSON_ROOT}/person/adresse`;
    const result: Result<PersonAdresse> = yield call(get, path, action.fnr);

    if (result instanceof Success) {
      yield put(actions.hentPersonAdresseHentet(result.data));
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentPersonAdresseFeilet());
    }
  }
}

export default function* personAdresseSagas() {
  yield takeEvery(
    actions.HENT_PERSON_ADRESSE_FORESPURT,
    hentPersonAdresseHvisIkkeHentet
  );
}
