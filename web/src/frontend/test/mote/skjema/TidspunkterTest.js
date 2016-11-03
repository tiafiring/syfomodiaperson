import { expect } from 'chai';
import Tidspunkter from '../../../js/mote/skjema/Tidspunkter';
import { mount, shallow, render } from 'enzyme';
import React from 'react'
import { Field } from 'redux-form';

describe("Tidspunkter", () => {

    it("Skal vise to tidspunkter", () => {
        const compo = shallow(<Tidspunkter />);
        expect(compo.find(".js-tidspunkt")).to.have.length(2);
    });

    it("Skal vise to overskrifter", () => {
        const compo = shallow(<Tidspunkter />);
        expect(compo.text()).to.contain("Alternativ 1");
        expect(compo.text()).to.contain("Alternativ 2");
    });

    it("Skal vise to Field per tidspunkt", () => {
        const compo = shallow(<Tidspunkter />);
        expect(compo.find(".js-tidspunkt").first().find(Field)).to.have.length(2);
        expect(compo.find(".js-tidspunkt").last().find(Field)).to.have.length(2);
    });

    it("Skal vise Field med riktig name-attributt", () => {
        const compo = shallow(<Tidspunkter />);
        expect(compo.find(".js-tidspunkt").first().find(Field).first().prop("name")).to.equal("tidspunkter[0].dato")
        expect(compo.find(".js-tidspunkt").first().find(Field).last().prop("name")).to.equal("tidspunkter[0].klokkeslett")
        expect(compo.find(".js-tidspunkt").last().find(Field).first().prop("name")).to.equal("tidspunkter[1].dato")
        expect(compo.find(".js-tidspunkt").last().find(Field).last().prop("name")).to.equal("tidspunkter[1].klokkeslett")
    });

});