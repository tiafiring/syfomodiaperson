import {expect} from "chai";
import Tidspunkter from "../../../js/mote/skjema/Tidspunkter";
import Tidspunkt from "../../../js/mote/skjema/Tidspunkt";
import Datovelger from '../../../js/components/datovelger/Datovelger';
import {mount, shallow, render} from "enzyme";
import React from "react";

describe("Tidspunkter", () => {

    it("Skal vise et tidspunkter som default", () => {
        const compo = shallow(<Tidspunkter />);
        expect(compo.find(Tidspunkt)).to.have.length(1);
    });

    it("Skal vise tre tidspunkter dersom man dytter det inn eksplisitt", () => {
        const compo = shallow(<Tidspunkter antallNyeTidspunkt={3} />);
        expect(compo.find(Tidspunkt)).to.have.length(3);
    });

    it("Skal sende skjemanavn videre til Tidspunkt", () => {
        const compo = shallow(<Tidspunkter skjemanavn="mitt-skjemanavn" antallNyeTidspunkt={3}/>);
        expect(compo.find(Tidspunkt).at(0).prop("skjemanavn")).to.equal("mitt-skjemanavn")
    })
});

describe("Tidspunkt", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<Tidspunkt antallNyeTidspunkt={1} skjemanavn="Bananer" />);
    });

    it("Skal inneholde en Datovelger", () => {
        expect(component.find(Datovelger)).to.have.length(1);
    });

    it("Skal sende skjemanavn videre til Datovelger", () => {
        expect(component.find(Datovelger)).to.have.length(1);
        expect(component.find(Datovelger).prop("skjemanavn")).to.equal("Bananer")
    });

});

