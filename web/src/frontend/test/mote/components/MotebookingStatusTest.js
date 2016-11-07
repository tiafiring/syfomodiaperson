import { expect } from 'chai';
import MotebookingStatus, { Varselstripe } from '../../../js/mote/components/MotebookingStatus'
import { mount, shallow } from 'enzyme';
import React from 'react'
import sinon from 'sinon';

describe("MotebookingStatus", () => {

    let mote = {}
    let avbrytMote;

    beforeEach(() => {
        mote.tidOgStedAlternativer = [{
            sted: "Oslo"
        }];
        mote.deltakere = [{
            type: "arbeidsgiver",
            navn: "Helge",
            epost: "***REMOVED***",
            tidOgSted: [{}],
        }, {
            type: "feil type",
            navn: "Ole",
            epost: "***REMOVED***",
            tidOgSted: [{}],
        }];
        avbrytMote = sinon.spy();
    })

    it("Skal inneholde en varselstripe", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.contains(<Varselstripe epost="***REMOVED***" />)).to.be.true;
    });

    it("Skal vise sted", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.text()).to.contain("Oslo"); 
    });

    it("Skal vise en tabell", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.find("table")).to.have.length(1);
    });

    it("Skal vise en tabell", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.find("table")).to.have.length(1);
    });

    it("Skal vise info om arbeidsgiver", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.text()).to.contain("Helge")
        expect(component.text()).not.to.contain("Ole")
    });

    it("Skal kalle på avbrytMote(uuid) når man klikker på avbrytMote-knappen", () => {
        mote.moteUuid = "min-fine-uuid";
        const component = shallow(<MotebookingStatus mote={mote} avbrytMote={avbrytMote} />);
        component.find(".js-avbryt").simulate("click");
        expect(avbrytMote.calledOnce).to.be.true;
        expect(avbrytMote.withArgs("min-fine-uuid").calledOnce).to.be.true;
    });

    it("Skal vise feilmelding dersom avbrytFeilet", () => {
        const component = shallow(<MotebookingStatus mote={mote} avbrytMote={avbrytMote} avbrytFeilet />);
        expect(component.text()).to.contain("Beklager");
    });

    it("Skal deaktivere knapp når det avbrytes", () => {
        const component = shallow(<MotebookingStatus mote={mote} avbrytMote={avbrytMote} avbryter />);
        expect(component.find(".js-avbryt")).to.be.disabled;
    });

});