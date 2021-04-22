import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import Tidspunkter from "../../../src/components/mote/skjema/Tidspunkter";
import Tidspunkt from "../../../src/components/mote/skjema/Tidspunkt";
import Datovelger from "../../../src/components/Datovelger";

describe("Tidspunkter", () => {
  let component;

  it("Skal vise et tidspunkter som default", () => {
    component = shallow(<Tidspunkter />);
    expect(component.find(Tidspunkt)).to.have.length(1);
  });

  it("Skal vise tre tidspunkter dersom man dytter det inn eksplisitt", () => {
    component = shallow(<Tidspunkter antallNyeTidspunkt={3} />);
    expect(component.find(Tidspunkt)).to.have.length(3);
  });
});

describe("Tidspunkt", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Tidspunkt antallNyeTidspunkt={1} />);
  });

  it("Skal inneholde en Datovelger", () => {
    expect(component.find(Datovelger)).to.have.length(1);
  });
});
