import { call, put, takeEvery } from "redux-saga/effects";
import {
  avlyserMote,
  AvlysMoteAction,
  avlysMoteFeilet,
  avlysMoteFullfort,
  DialogmoteActionTypes,
  endrerTidSted,
  EndreTidStedAction,
  endreTidStedFeilet,
  endreTidStedFullfort,
  ferdigstillerMote,
  FerdigstillMoteAction,
  ferdigstillMoteFeilet,
  ferdigstillMoteFullfort,
  FetchDialogmoteAction,
  fetchDialogmoteFailed,
  fetchDialogmoteSuccess,
  oppretterInnkalling,
  OpprettInnkallingAction,
  opprettInnkallingFeilet,
  opprettInnkallingFullfort,
} from "./dialogmote_actions";
import { get, post } from "@/api/axios";
import { DialogmoteDTO } from "./types/dialogmoteTypes";
import { ISDIALOGMOTE_ROOT } from "@/apiConstants";
import { ApiErrorException, generalError } from "@/api/errors";

function* opprettInnkalling(action: OpprettInnkallingAction) {
  yield put(oppretterInnkalling());
  const path = `${ISDIALOGMOTE_ROOT}/dialogmote/personident`;
  try {
    yield call(post, path, action.data, action.fnr);
    yield put(opprettInnkallingFullfort());
    window.location.href = `/sykefravaer/moteoversikt`;
  } catch (e) {
    if (e instanceof ApiErrorException) {
      yield put(opprettInnkallingFeilet(e.error));
    } else {
      yield put(opprettInnkallingFeilet(generalError(e.message)));
    }
  }
}

function* fetchDialogmoteSaga(action: FetchDialogmoteAction) {
  const path = `${ISDIALOGMOTE_ROOT}/dialogmote/personident`;
  try {
    const data: DialogmoteDTO[] = yield call(get, path, action.fnr);
    yield put(fetchDialogmoteSuccess(data));
  } catch (e) {
    if (e instanceof ApiErrorException) {
      yield put(fetchDialogmoteFailed(e.error));
    } else {
      yield put(fetchDialogmoteFailed(generalError(e.message)));
    }
  }
}

function* avlysDialogmote(action: AvlysMoteAction) {
  yield put(avlyserMote());
  const path = `${ISDIALOGMOTE_ROOT}/dialogmote/${action.moteUuid}/avlys`;
  try {
    yield call(post, path, action.data);
    yield put(avlysMoteFullfort());
    window.location.href = `/sykefravaer/moteoversikt`;
  } catch (e) {
    if (e instanceof ApiErrorException) {
      yield put(avlysMoteFeilet(e.error));
    } else {
      yield put(avlysMoteFeilet(generalError(e.message)));
    }
  }
}

function* endreTidStedDialogmote(action: EndreTidStedAction) {
  yield put(endrerTidSted());
  const path = `${ISDIALOGMOTE_ROOT}/dialogmote/${action.moteUuid}/tidsted`;
  try {
    yield call(post, path, action.data);
    yield put(endreTidStedFullfort());
    window.location.href = `/sykefravaer/moteoversikt`;
  } catch (e) {
    if (e instanceof ApiErrorException) {
      yield put(endreTidStedFeilet(e.error));
    } else {
      yield put(endreTidStedFeilet(generalError(e.message)));
    }
  }
}

function* ferdigstillDialogmote(action: FerdigstillMoteAction) {
  yield put(ferdigstillerMote());
  const path = `${ISDIALOGMOTE_ROOT}/dialogmote/${action.moteUuid}/ferdigstill`;
  try {
    yield call(post, path, action.data);
    yield put(ferdigstillMoteFullfort());
    window.location.href = `/sykefravaer/moteoversikt`;
  } catch (e) {
    if (e instanceof ApiErrorException) {
      yield put(ferdigstillMoteFeilet(e.error));
    } else {
      yield put(ferdigstillMoteFeilet(generalError(e.message)));
    }
  }
}

export default function* dialogmoteSagas() {
  yield takeEvery(
    DialogmoteActionTypes.OPPRETT_INNKALLING_FORESPURT,
    opprettInnkalling
  );
  yield takeEvery(DialogmoteActionTypes.FETCH_DIALOGMOTE, fetchDialogmoteSaga);
  yield takeEvery(DialogmoteActionTypes.AVLYS_MOTE_FORESPURT, avlysDialogmote);
  yield takeEvery(
    DialogmoteActionTypes.ENDRE_TID_STED_FORESPURT,
    endreTidStedDialogmote
  );
  yield takeEvery(
    DialogmoteActionTypes.FERDIGSTILL_MOTE_FORESPURT,
    ferdigstillDialogmote
  );
}
