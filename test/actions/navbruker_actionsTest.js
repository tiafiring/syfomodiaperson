import { expect } from "chai";
import * as actions from "../../src/data/navbruker/navbruker_actions";

describe("navbruker_actions", () => {
  it("Har en hentNavbruker()-funksjon", () => {
    const res = actions.hentNavbruker("44");
    expect(res).to.deep.equal({
      type: actions.HENT_NAVBRUKER_FORESPURT,
      fnr: "44",
    });
  });
});
