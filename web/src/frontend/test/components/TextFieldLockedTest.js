import { expect } from 'chai';
import TextFieldLocked from '../../js/components/TextFieldLocked';
import { mount, shallow, render } from 'enzyme';
import React from 'react'

describe("TextFieldLocked", () => {
    let meta;

    beforeEach(() => {
        meta = {}
    });

    it("Skal vise riktig type", () => {
        const component = mount(<TextFieldLocked placeholder="Olsen" meta={meta} />)
        expect(component.find("input").prop("placeholder")).to.equal("Olsen")
    }); 

    it("SKal være disabled by default", () => {
        const component = mount(<TextFieldLocked placeholder="Olsen" meta={meta} />)
        expect(component.find("input")).to.be.disabled()
    })
    
    it("Skal vise feilmeldingen når touched = true og error 'Feilmelding'", () => {
        meta.error = "Min feilmelding";
        meta.touched = true;
        const component = shallow(<TextFieldLocked placeholder="Olsen" meta={meta} />)
        expect(component.text()).to.contain("Min feilmelding")
    });

    it("Skal ikke vise feilmeldingen når touched = false og error = 'fMin eilmelding'", () => {
        meta.error = "Min feilmelding";
        meta.touched = false;
        const component = shallow(<TextFieldLocked placeholder="Olsen" meta={meta} />)
        expect(component.text()).not.to.contain("Min feilmelding")
    });

    it("Skal vise en knapp", () => {
        const component = shallow(<TextFieldLocked placeholder="Olsen" meta={meta} />)
        expect(component.find(".js-rediger")).to.have.length(1);
    });

    it("Skal bli enabled og knappen skal forsvinne når man klikker på knappen", () => {
        const component = shallow(<TextFieldLocked placeholder="Olsen" meta={meta} />)
        component.find(".js-rediger").simulate("click");
        expect(component.find(".js-rediger")).to.have.length(0);
        expect(component.find("input")).not.to.be.disabled();
    })

})