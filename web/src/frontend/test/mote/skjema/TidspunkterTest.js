import {expect} from "chai";
import Tidspunkter from "../../../js/mote/skjema/Tidspunkter";
import Tidspunkt from "../../../js/mote/skjema/Tidspunkt";
import {mount, shallow, render} from "enzyme";
import React from "react";
import {Field} from "redux-form";

describe("Tidspunkter", () => {

    it("Skal vise to tidspunkter som default", () => {
        const compo = shallow(<Tidspunkter />);
        expect(compo.find(Tidspunkt)).to.have.length(2);
    });

    it("Skal vise tre tidspunkter dersom man dytter det inn eksplisitt", () => {
        const compo = shallow(<Tidspunkter tidspunker={[0,1,2]}/>);
        expect(compo.find(Tidspunkt)).to.have.length(3);
    });
});