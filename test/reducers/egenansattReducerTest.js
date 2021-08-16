import { expect } from "chai";
import deepFreeze from "deep-freeze";
import * as actions from "../../src/data/egenansatt/egenansatt_actions";
import egenansatt from "../../src/data/egenansatt/egenansatt";
import { HentEgenAnsattActionTypes } from "@/data/egenansatt/egenansatt_actions";
import { defaultErrorTexts, ErrorType } from "@/api/axios";

describe("egenansatt", () => {
  describe("henter", () => {
    const initialState = deepFreeze({
      henter: false,
      hentet: false,
      error: undefined,
      isEgenAnsatt: false,
    });

    it(`håndterer ${HentEgenAnsattActionTypes.EGENANSATT_HENTET}`, () => {
      const action = actions.egenansattHentet(true);
      const nextState = egenansatt(initialState, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: true,
        error: undefined,
        isEgenAnsatt: true,
      });
    });

    it(`håndterer ${HentEgenAnsattActionTypes.HENT_EGENANSATT_FEILET}`, () => {
      const generalError = {
        type: ErrorType.GENERAL_ERROR,
        message: "",
        defaultErrorMsg: defaultErrorTexts.generalError,
      };

      const action = actions.hentEgenansattFeilet(generalError);
      const nextState = egenansatt(initialState, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: false,
        error: generalError,
        isEgenAnsatt: false,
      });
    });
  });
});
