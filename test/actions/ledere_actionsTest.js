import { expect } from "chai";
import * as actions from "../../src/data/leder/ledere_actions";

describe("ledere_actions", () => {
  it("Har en hentLedere()-funksjon", () => {
    const res = actions.hentLedere("44");
    expect(res).to.deep.equal({
      type: actions.HENT_LEDERE_FORESPURT,
      fnr: "44",
    });
  });
});
