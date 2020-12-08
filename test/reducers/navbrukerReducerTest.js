import { expect } from "chai";
import deepFreeze from "deep-freeze";
import navbruker from "../../src/data/navbruker/navbruker";
import * as actions from "../../src/data/navbruker/navbruker_actions";

describe("navbruker", () => {
  it("Håndterer NAVBRUKER_HENTET når man ikke har data fra før", () => {
    const initialState = deepFreeze({});
    const action = {
      type: actions.NAVBRUKER_HENTET,
      data: {
        navn: "Kurt Nilsen",
      },
    };
    const nextState = navbruker(initialState, action);

    expect(nextState).to.deep.equal({
      henter: false,
      hentingFeilet: false,
      data: {
        navn: "Kurt Nilsen",
      },
    });
  });

  it("Håndterer NAVBRUKER_HENTET når man har data fra før", () => {
    const initialState = deepFreeze({
      data: {
        kontaktinfo: {
          fnr: "12345689",
        },
      },
    });
    const action = {
      type: actions.NAVBRUKER_HENTET,
      data: {
        navn: "Kurt Nilsen",
      },
    };
    const nextState = navbruker(initialState, action);

    expect(nextState).to.deep.equal({
      henter: false,
      hentingFeilet: false,
      data: {
        navn: "Kurt Nilsen",
        kontaktinfo: {
          fnr: "12345689",
        },
      },
    });
  });

  it("Håndterer HENT_NAVBRUKER_FORESPURT", () => {
    const initialState = deepFreeze({
      data: {
        test: 1,
      },
    });
    const action = {
      type: actions.HENT_NAVBRUKER_FORESPURT,
      fnr: "123456",
    };
    const nextState = navbruker(initialState, action);
    expect(nextState).to.deep.equal({
      data: {
        test: 1,
        kontaktinfo: {
          fnr: "123456",
        },
      },
      henter: true,
      hentingFeilet: false,
    });
  });

  it("Håndterer HENT_NAVBRUKER_FEILET", () => {
    const initialState = deepFreeze({
      data: {
        test: 1,
      },
    });
    const action = {
      type: actions.HENT_NAVBRUKER_FEILET,
    };
    const nextState = navbruker(initialState, action);
    expect(nextState).to.deep.equal({
      data: {
        test: 1,
      },
      henter: false,
      hentingFeilet: true,
    });
  });
});
