import { VALGT_ENHET } from "./enhet_actions";
import { Reducer } from "redux";

export interface EnhetState {
  valgtEnhet: string;
}

const defaultState: EnhetState = {
  valgtEnhet: "",
};

const enhet: Reducer<EnhetState> = (
  state = defaultState,
  action = { type: "" }
) => {
  switch (action.type) {
    case VALGT_ENHET: {
      return Object.assign({}, defaultState, {
        valgtEnhet: action.data,
      });
    }
    default: {
      return state;
    }
  }
};

export default enhet;
