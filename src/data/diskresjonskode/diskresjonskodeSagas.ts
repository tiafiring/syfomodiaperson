import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  diskresjonskodeHentet,
  HentDiskresjonskodeAction,
  HentDiskresjonskodeActionTypes,
  hentDiskresjonskodeFeilet,
  henterDiskresjonskode,
} from "./diskresjonskode_actions";
import { get } from "@/api/axios";
import { RootState } from "../rootState";
import { SYFOPERSON_ROOT } from "@/apiConstants";
import { ApiErrorException, generalError } from "@/api/errors";

export function* hentDiskresjonskodeSaga(action: HentDiskresjonskodeAction) {
  yield put(henterDiskresjonskode());
  const path = `${SYFOPERSON_ROOT}/person/diskresjonskode`;
  try {
    const data: string = yield call(get, path, action.fnr);
    yield put(diskresjonskodeHentet(data));
  } catch (e) {
    if (e instanceof ApiErrorException) {
      yield put(hentDiskresjonskodeFeilet(e.error));
    } else {
      yield put(hentDiskresjonskodeFeilet(generalError(e.message)));
    }
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
