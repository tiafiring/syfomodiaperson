import ArbeidsgiverDropdown from '../../../js/mote/skjema/ArbeidsgiverDropdown';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

describe("ArbeidsgiverDropdown", () => {

    let meta;
    let ledere;

    beforeEach(() => {
        meta = {}
        ledere = [{
            id: 1,
            navn: "Bjarne",
            organisasjonsnavn: "BEKK"
        }, {
            id: 2,
            navn: "Arne", 
            organisasjonsnavn: "BEKK"
        }, {
            id: 3, 
            navn: "Abba",
            organisasjonsnavn: "BEKK"
        }, {
            id: 4,
            navn: "Aage",
            organisasjonsnavn: "ABC Buss"
        }]
    });

    it("Skal inneholde et valg for manuell utfylling", () => {
        const compo = mount(<ArbeidsgiverDropdown meta={meta} ledere={ledere} />);
        expect(compo.find("option")).to.have.length(6);
        expect(compo.find("option").last().text()).to.contain("fyll inn manuelt")
    });

});