import { call, put, takeEvery } from "redux-saga/effects";
import {
  DialogmoteActionTypes,
  FetchDialogmoteAction,
  fetchDialogmoteFailed,
  fetchDialogmoteSuccess,
  innkallingOpprettet,
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
    yield put(innkallingOpprettet(action.data));
    yield put(opprettInnkallingFullfort());
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

export default function* dialogmoteSagas() {
  yield takeEvery(
    DialogmoteActionTypes.OPPRETT_INNKALLING_FORESPURT,
    opprettInnkalling
  );
  yield takeEvery(DialogmoteActionTypes.FETCH_DIALOGMOTE, fetchDialogmoteSaga);
}
