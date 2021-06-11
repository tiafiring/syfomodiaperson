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
  ferdigstillMoteFeilet,
  ferdigstillMoteFullfort,
  ferdigstillerMote,
  FerdigstillMoteAction,
  FetchDialogmoteAction,
  fetchDialogmoteFailed,
  fetchDialogmoteSuccess,
  oppretterInnkalling,
  OpprettInnkallingAction,
  opprettInnkallingFeilet,
  opprettInnkallingFullfort,
} from "./dialogmote_actions";
import { get, post } from "../../api";
import { DialogmoteDTO } from "./types/dialogmoteTypes";

function* opprettInnkalling(action: OpprettInnkallingAction) {
  yield put(oppretterInnkalling());
  try {
    const path = `${process.env.REACT_APP_ISDIALOGMOTE_ROOT}/post/v1/dialogmote/personident`;
    yield call(post, path, action.data, action.fnr);
    yield put(opprettInnkallingFullfort());
    window.location.href = `/sykefravaer/moteoversikt`;
  } catch (e) {
    yield put(opprettInnkallingFeilet());
  }
}

function* fetchDialogmoteSaga(action: FetchDialogmoteAction) {
  try {
    const path = `${process.env.REACT_APP_ISDIALOGMOTE_ROOT}/get/v1/dialogmote/personident`;
    const dialogmoter: DialogmoteDTO[] = yield call(get, path, action.fnr);
    yield put(fetchDialogmoteSuccess(dialogmoter));
  } catch (e) {
    console.log(e);
    yield put(fetchDialogmoteFailed());
  }
}

function* avlysDialogmote(action: AvlysMoteAction) {
  yield put(avlyserMote());
  try {
    const path = `${process.env.REACT_APP_ISDIALOGMOTE_ROOT}/post/v1/dialogmote/${action.moteUuid}/avlys`;
    yield call(post, path, action.data);
    yield put(avlysMoteFullfort());
    window.location.href = `/sykefravaer/moteoversikt`;
  } catch (e) {
    yield put(avlysMoteFeilet());
  }
}

function* endreTidStedDialogmote(action: EndreTidStedAction) {
  yield put(endrerTidSted());
  try {
    const path = `${process.env.REACT_APP_ISDIALOGMOTE_ROOT}/post/v1/dialogmote/${action.moteUuid}/tidsted`;
    yield call(post, path, action.data);
    yield put(endreTidStedFullfort());
    window.location.href = `/sykefravaer/moteoversikt`;
  } catch (e) {
    yield put(endreTidStedFeilet());
  }
}

function* ferdigstillDialogmote(action: FerdigstillMoteAction) {
  yield put(ferdigstillerMote());
  try {
    const path = `${process.env.REACT_APP_ISDIALOGMOTE_ROOT}/post/v1/dialogmote/${action.moteUuid}/ferdigstill`;
    yield call(post, path, action.data);
    yield put(ferdigstillMoteFullfort());
    window.location.href = `/sykefravaer/moteoversikt`;
  } catch (e) {
    yield put(ferdigstillMoteFeilet());
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
