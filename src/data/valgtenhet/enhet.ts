import { VALGT_ENHET } from "./enhet_actions";
import { Reducer } from "redux";

const defaultState = {
  valgtEnhet: "",
};

const enhet: Reducer = (state = defaultState, action = { type: "" }) => {
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
