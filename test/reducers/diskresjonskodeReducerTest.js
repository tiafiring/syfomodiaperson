import deepFreeze from "deep-freeze";
import { expect } from "chai";
import * as actions from "../../src/data/diskresjonskode/diskresjonskode_actions";
import { HentDiskresjonskodeActionTypes } from "@/data/diskresjonskode/diskresjonskode_actions";
import diskresjonskode from "../../src/data/diskresjonskode/diskresjonskode";
import { defaultErrorTexts, ErrorType } from "@/api/errors";

describe("diskresjonskode", () => {
  describe("henter", () => {
    const initialState = deepFreeze({
      henter: false,
      hentet: false,
      error: undefined,
      data: {
        diskresjonskode: "",
      },
    });

    it(`håndterer ${HentDiskresjonskodeActionTypes.HENTER_DISKRESJONSKODE}`, () => {
      const action = actions.henterDiskresjonskode();
      const nextState = diskresjonskode(initialState, action);
      expect(nextState).to.deep.equal({
        henter: true,
        hentet: false,
        error: undefined,
        data: {
          diskresjonskode: "",
        },
      });
    });

    it(`håndterer ${HentDiskresjonskodeActionTypes.DISKRESJONSKODE_HENTET}`, () => {
      const data = "7";
      const action = actions.diskresjonskodeHentet(data);
      const nextState = diskresjonskode(initialState, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: true,
        error: undefined,
        data: {
          diskresjonskode: data,
        },
      });
    });

    it(`håndterer ${HentDiskresjonskodeActionTypes.HENT_DISKRESJONSKODE_FEILET}`, () => {
      const generalError = {
        type: ErrorType.GENERAL_ERROR,
        message: "",
        defaultErrorMsg: defaultErrorTexts.generalError,
      };

      const action = actions.hentDiskresjonskodeFeilet(generalError);
      const nextState = diskresjonskode(initialState, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: false,
        error: generalError,
        data: {
          diskresjonskode: "",
        },
      });
    });
  });
});
