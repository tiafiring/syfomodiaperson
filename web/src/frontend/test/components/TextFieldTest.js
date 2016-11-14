import { expect } from 'chai';
import TextField from '../../js/components/TextField';
import { mount, shallow, render } from 'enzyme';
import React from 'react'

describe("TextField", () => {
    let meta;

    beforeEach(() => {
        meta = {}
    });

    it("Skal vise riktig type", () => {
        const component = mount(<TextField placeholder="Olsen" meta={meta} />)
        expect(component.find("input").prop("placeholder")).to.equal("Olsen")
    }); 
    
    it("Skal vise feilmeldingen når touched = true og error 'Feilmelding'", () => {
        meta.error = "Min feilmelding";
        meta.touched = true;
        const component = shallow(<TextField placeholder="Olsen" meta={meta} />)
        expect(component.text()).to.contain("Min feilmelding")
    });

    it("Skal ikke vise feilmeldingen når touched = false og error = 'fMin eilmelding'", () => {
        meta.error = "Min feilmelding";
        meta.touched = false;
        const component = shallow(<TextField placeholder="Olsen" meta={meta} />)
        expect(component.text()).not.to.contain("Min feilmelding")
    });

})