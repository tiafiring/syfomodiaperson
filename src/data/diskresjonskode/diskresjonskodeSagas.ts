import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  diskresjonskodeHentet,
  HentDiskresjonskodeAction,
  HentDiskresjonskodeActionTypes,
  hentDiskresjonskodeFeilet,
  henterDiskresjonskode,
} from "./diskresjonskode_actions";
import { get, Result, Success } from "../../api/axios";
import { RootState } from "../rootState";
import { SYFOPERSON_ROOT } from "../../apiConstants";

export function* hentDiskresjonskodeSaga(action: HentDiskresjonskodeAction) {
  yield put(henterDiskresjonskode());
  const path = `${SYFOPERSON_ROOT}/person/diskresjonskode`;
  const result: Result<string> = yield call(get, path, action.fnr);

  if (result instanceof Success) {
    yield put(diskresjonskodeHentet(result.data));
  } else {
    yield put(hentDiskresjonskodeFeilet(result.error));
  }
}

export const skalHenteDiskresjonskode = (state: RootState) => {
  const { henter, hentet, error } = state.diskresjonskode;
  return !(henter || hentet || error);
};

export function* hentDiskresjonskodeHvisIkkeHentet(
  action: HentDiskresjonskodeAction
) {
  const skalHente = yield select(skalHenteDiskresjonskode);
  if (skalHente) {
    yield call(hentDiskresjonskodeSaga, action);
  }
}

export default function* diskresjonskodeSagas() {
  yield takeEvery(
    HentDiskresjonskodeActionTypes.HENT_DISKRESJONSKODE_FORESPURT,
    hentDiskresjonskodeHvisIkkeHentet
  );
}
