import { mount } from "enzyme";
import React from "react";
import {
  SkjemaFeiloppsummering,
  texts as skjemaFeilOppsummeringTexts,
} from "../../src/components/SkjemaFeiloppsummering";
import { Feiloppsummering } from "nav-frontend-skjema";
import { expect } from "chai";

describe("SkjemaFeiloppsummering", () => {
  it("viser ikke feiloppsummering når errors er undefined", () => {
    const wrapper = mount(<SkjemaFeiloppsummering errors={undefined} />);
    expect(wrapper.exists(Feiloppsummering)).to.be.false;
  });
  it("viser ikke feiloppsummering når errors mangler feilmeldinger", () => {
    const wrapper = mount(
      <SkjemaFeiloppsummering errors={{ felt: undefined }} />
    );
    expect(wrapper.exists(Feiloppsummering)).to.be.false;
  });
  it("viser feiloppsummering for errors med feilmeldinger", () => {
    const enFeilmelding = "her er en feilmelding";
    const wrapper = mount(
      <SkjemaFeiloppsummering errors={{ felt: enFeilmelding }} />
    );
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      skjemaFeilOppsummeringTexts.title
    );
    expect(feiloppsummering.text()).to.contain(enFeilmelding);
  });
});
