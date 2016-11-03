import { expect } from 'chai';
import MotebookingStatus, { Varselstripe } from '../../../js/mote/components/MotebookingStatus'
import { mount, shallow } from 'enzyme';
import React from 'react'

describe("MotebookingStatus", () => {

    let mote = {}

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
        }]
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



});