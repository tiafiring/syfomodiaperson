import { call, put, takeEvery } from "redux-saga/effects";
import {
  avlyserMote,
  AvlysMoteAction,
  avlysMoteFeilet,
  avlysMoteFullfort,
  DialogmoteActionTypes,
  FetchDialogmoteAction,
  fetchDialogmoteFailed,
  fetchDialogmoteSuccess,
  oppretterInnkalling,
  OpprettInnkallingAction,
  opprettInnkallingFeilet,
  opprettInnkallingFullfort,
} from "./dialogmote_actions";
import { get, post } from "../../api";
import { DialogmoteDTO } from "./dialogmoteTypes";

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

export default function* dialogmoteSagas() {
  yield takeEvery(
    DialogmoteActionTypes.OPPRETT_INNKALLING_FORESPURT,
    opprettInnkalling
  );
  yield takeEvery(DialogmoteActionTypes.FETCH_DIALOGMOTE, fetchDialogmoteSaga);
  yield takeEvery(DialogmoteActionTypes.AVLYS_MOTE_FORESPURT, avlysDialogmote);
}
