import { expect } from 'chai';
import MotebookingStatus from '../../../js/mote/components/MotebookingStatus'
import { mount, shallow } from 'enzyme';
import React from 'react'
import sinon from 'sinon';
import { Varselstripe } from 'digisyfo-npm';

describe("MotebookingStatus", () => {

    let mote = {}
    let avbrytMote;

    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: "/sykefravaer"
        }
        mote.alternativer = [{
            "tid": "2012-12-12T11:00:00Z",
            "sted": "Oslo by",
            "valgt": false,
            "id": 1
        }, {
            "tid": "2009-09-09T07:00:00Z",
            "sted": "Oslo by",
            "valgt": false,
            "id": 2
        }];
        mote.deltakere = [{
            type: "arbeidsgiver",
            navn: "Helge",
            epost: "***REMOVED***",
            avvik: [],
            svar: [{
                "tid": "2012-12-12T11:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 1
            }, {
                "tid": "2009-09-09T07:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 2
            }],
        }, {
            type: "feil type",
            navn: "Ole",
            avvik: [],
            epost: "***REMOVED***",
            svar: [{}],
        }];
        avbrytMote = sinon.spy();
    })

    it("Skal inneholde en varselstripe", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.find(Varselstripe)).to.have.length(1);
    });

    it("Skal vise sted", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.text()).to.contain("Oslo by"); 
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
        expect(component.find(Varselstripe)).to.have.length(2);
    });

    it("Skal deaktivere knapp når det avbrytes", () => {
        const component = shallow(<MotebookingStatus mote={mote} avbrytMote={avbrytMote} avbryter />);
        expect(component.find(".js-avbryt")).to.be.disabled;
    });

    it("Skal ikke vise en knapp med teksten 'Velg tidspunkt for møte'", () => {
        const component = shallow(<MotebookingStatus mote={mote} avbrytMote={avbrytMote} />);
        expect(component.find(".js-velg-tidspunkt")).to.have.length(0);
    });


    describe("Når det er kommet svar fra arbeidsgiver og arbeidsgiver kan stille", () => {
        
        beforeEach(() => {
            mote.deltakere[0].svar[0].valgt = true;
        });

        it("Skal vise en knapp med teksten 'Velg tidspunkt for møte'", () => {
            const component = shallow(<MotebookingStatus fnr="***REMOVED***" mote={mote} avbrytMote={avbrytMote} />);
            expect(component.find(".js-velg-tidspunkt")).to.have.length(1);
            expect(component.find(".js-velg-tidspunkt")).prop("href").to.equal("/sykefravaer/***REMOVED***/mote/bekreft/1")
        });

    })

});