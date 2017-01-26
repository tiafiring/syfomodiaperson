import { expect } from 'chai';
import MotebookingStatus, { MotetidspunktValgt } from '../../../js/mote/components/MotebookingStatus'
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
        mote.status = 'OPPRETTET';
        mote.deltakere = [{
            type: "arbeidsgiver",
            navn: "Helge",
            epost: "***REMOVED***",
            avvik: [],
            hendelser: [],
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
            type: "Bruker",
            navn: "Ole",
            avvik: [],
            hendelser: [],
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
    });

    it("Skal vise info om bruker", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.text()).to.contain("Ole")
    });

    it("Skal ikke vise en knapp med teksten 'Velg tidspunkt for møte'", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.find(".js-velg-tidspunkt")).to.have.length(0);
    });

    it("Skal vise en knapp for Avbryt møteforespørsel", () => {
        const component = shallow(<MotebookingStatus mote={mote} />);
        expect(component.find(".js-avbryt")).to.have.length(1);
    });

    describe("Ny møteforespørsel", () => {
        it("Skal vise en knapp for Ny møteforespørsel", () => {
            const component = shallow(<MotebookingStatus mote={mote} />);
            expect(component.find(".js-ny")).to.have.length(1)
        });

        it("Skal kalle på avbrytMoteUtenVarsel med moteUuid og fnr når man klikker på knappen", () => {
            mote.moteUuid = "min-mote-uuid";
            const avbrytMoteUtenVarsel = sinon.spy();
            const component = shallow(<MotebookingStatus mote={mote} fnr="mitt-fnr" avbrytMoteUtenVarsel={avbrytMoteUtenVarsel} />);
            component.find(".js-ny").simulate("click");
            expect(avbrytMoteUtenVarsel.calledWith("min-mote-uuid", "mitt-fnr")).to.be.true;
        })
        
    });


    describe("Når det er kommet svar fra arbeidsgiver og arbeidsgiver kan stille", () => {
        
        beforeEach(() => {
            mote.deltakere[0].svar[0].valgt = true;
        });

        it("Skal vise en knapp med teksten 'Velg tidspunkt for møte'", () => {
            const component = mount(<MotebookingStatus fnr="***REMOVED***" mote={mote} />);
            expect(component.find(".js-velg-tidspunkt")).to.have.length(1);
        });

        it("Skal ikke vise hvilket tidspunkt som er valgt", () => {
            const component = shallow(<MotebookingStatus fnr="***REMOVED***" mote={mote} />);
            expect(component.find(MotetidspunktValgt)).to.have.length(0);
        });

    });

    describe("Når møtet er bekreftet", () => {

        let mote; 

        beforeEach(() => {
            mote = {
              "id": 0,
              "moteUuid": "f26984a2-e038-4de6-a6af-4f4f5db96b26",
              "opprettetAv": "Z990562",
              "status": "BEKREFTET",
              "opprettetTidspunkt": "2016-11-22T12:56:32.561Z",
              "navEnhet": "navEnhet",
              "deltakere": [{
                "deltakerUuid": "3b0dc3b2-587c-4105-98df-99b4205d3ce9",
                "navn": "***REMOVED***",
                "epost": "***REMOVED***",
                "type": "arbeidsgiver",
                "svartTidspunkt": "2016-11-22T12:52:06.489Z",
                "avvik": [],
                "svar": [{
                  "id": 344,
                  "tid": "2019-09-09T07:00:00Z",
                  "sted": "Oslo",
                  "valgt": true
                }, {
                  "id": 345,
                  "tid": "2020-09-09T18:00:00Z",
                  "sted": "Oslo",
                  "valgt": false
                }]
              }],
              "valgtAlternativ": {
                "id": 344,
                "tid": "2019-09-09T07:00:00Z",
                "sted": "Oslo",
                "valgt": true
              },
              "alternativer": [{
                "id": 344,
                "tid": "2019-09-09T07:00:00Z",
                "sted": "Oslo",
                "valgt": true
              }, {
                "id": 345,
                "tid": "2020-09-09T18:00:00Z",
                "sted": "Oslo",
                "valgt": false
              }]
            }
        });

        it("Skal ikke vise knapp med tekst 'velg tidspunkt for møte'", () => {
            const component = shallow(<MotebookingStatus fnr="***REMOVED***" mote={mote} />);
            expect(component.find(".js-velg-tidspunkt")).to.have.length(0);
        })

        it("Skal vise hvilket tidspunkt som er valgt", () => {
            const component = shallow(<MotebookingStatus fnr="***REMOVED***" mote={mote} />);
            expect(component.find(MotetidspunktValgt)).to.have.length(1);
        });


    });

});