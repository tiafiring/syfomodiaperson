import { call, put, takeEvery } from "redux-saga/effects";
import {
  innkallingOpprettet,
  OPPRETT_INNKALLING_FORESPURT,
  oppretterInnkalling,
  OpprettInnkallingAction,
  opprettInnkallingFeilet,
  opprettInnkallingFullfort,
} from "./dialogmote_actions";
import { post } from "../../api";

function* opprettInnkalling(action: OpprettInnkallingAction) {
  yield put(oppretterInnkalling());
  try {
    const path = `${process.env.REACT_APP_ISDIALOGMOTE_ROOT}/v1/dialogmote/personident`;
    yield call(post, path, action.data, action.fnr);
    yield put(innkallingOpprettet(action.data));
    yield put(opprettInnkallingFullfort());
  } catch (e) {
    yield put(opprettInnkallingFeilet());
  }
}

export default function* dialogmoteSagas() {
  yield takeEvery(OPPRETT_INNKALLING_FORESPURT, opprettInnkalling);
}
