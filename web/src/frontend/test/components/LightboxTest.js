import { expect } from 'chai';
import Lightbox from '../../js/components/Lightbox'
import { mount, shallow, render } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

describe.only("Lightbox", () => {

    it("Skal vise children", () => {
        const component = shallow(<Lightbox><p>Innhold</p></Lightbox>)
        expect(component.contains(<p>Innhold</p>)).to.be.true;
    });

    it("Skal ha initiell state = erApen === true", () => {
        const component = shallow(<Lightbox><p>Innhold</p></Lightbox>)
        expect(component.state().erApen).to.be.true;
    });

    it("Skal returnere null når man klikker på lukk", () => {
        const component = shallow(<Lightbox><p>Innhold</p></Lightbox>)
        component.find(".js-lukk").simulate("click");
        expect(component.state().erApen).to.be.false;
        expect(component.contains(<p>Innhold</p>)).to.be.false;
    });

    it("Skal kalle onClose når man klikker på lukk", () => {
        const onClose = sinon.spy();
        const component = shallow(<Lightbox onClose={onClose}><p>Innhold</p></Lightbox>)
        component.find(".js-lukk").simulate("click");
        expect(onClose.calledOnce).to.be.true;
    })

})