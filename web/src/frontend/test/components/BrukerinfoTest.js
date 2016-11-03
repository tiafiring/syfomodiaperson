import { expect } from 'chai';
import Brukerinfo from '../../js/components/Brukerinfo'
import { mount, shallow, render } from 'enzyme';
import React from 'react'

describe("Brukerinfo", () => {

    const navbruker = {
        navn: "Knut",
        fnr: "1234"
    }

    it("Skal vise brukers personnummer", () => {
        const component = render(<Brukerinfo navbruker={navbruker} />);
        expect(component.text()).to.contain("1234");
    });

    it("Skal vise brukers navn", () => {
        const component = render(<Brukerinfo navbruker={navbruker} />);
        expect(component.text()).to.contain("Knut");
    });

});