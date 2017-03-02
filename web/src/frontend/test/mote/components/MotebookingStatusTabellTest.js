import {expect} from "chai";
import MotebookingStatusTabell, {MotetidspunktValgt} from "../../../js/mote/components/MotebookingStatusTabell";
import {mount, shallow} from "enzyme";
import React from "react";
import sinon from "sinon";
import {Varselstripe} from "digisyfo-npm";

describe("MotebookingStatus", () => {


    let alternativer = {}
    let status = {}
    let deltakere = {}
    let avbrytMote;

    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: "/sykefravaer"
        }
        alternativer =  [{
            "tid": "2012-12-12T11:00:00Z",
            "created": "2011-12-12T11:00:00Z",
            "sted": "Oslo by",
            "valgt": false,
            "id": 1
        }, {
            "tid": "2009-09-09T07:00:00Z",
            "created": "2011-12-12T11:00:00Z",
            "sted": "Oslo by",
            "valgt": false,
            "id": 2
        }];
        status =  'OPPRETTET';
        deltakere = [{
            type: "arbeidsgiver",
            navn: "Helge",
            epost: "***REMOVED***",
            avvik: [],
            hendelser: [],
            svar: [{
                "tid": "2012-12-12T11:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 1
            }, {
                "tid": "2009-09-09T07:00:00Z",
                "created": "2011-12-12T11:00:00Z",
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

    it("Skal vise info om arbeidsgiver", () => {
        const component = shallow(<MotebookingStatusTabell alternativer={alternativer} deltakere={deltakere} status={status} />);
        expect(component.text()).to.contain("Helge")
    });

    it("Skal vise info om bruker", () => {
        const component = shallow(<MotebookingStatusTabell alternativer={alternativer} deltakere={deltakere} status={status} />);
        expect(component.text()).to.contain("Ole")
    });


    describe("Når man har mottatt svar", () => {
        let alternativer = {};
        let status = {};
        let deltakere = {};

        beforeEach(() => {
            window.APP_SETTINGS = {
                APP_ROOT: "/sykefravaer"
            }
            alternativer =  [{
                "tid": "2012-12-12T11:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 1
            }, {
                "tid": "2009-09-09T07:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 2
            }];
            status =  'OPPRETTET';
            deltakere = [{
                type: "arbeidsgiver",
                navn: "Ole",
                avvik: [],
                hendelser: [],
                epost: "***REMOVED***",
                svartTidspunkt: "2012-12-12T11:00:00Z",
                svar: [{
                    "tid": "2012-12-12T11:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo by",
                    "valgt": true,
                    "id": 1
                }, {
                    "tid": "2009-09-09T07:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
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
                svar: [{
                    "tid": "2012-12-12T11:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo by",
                    "valgt": false,
                    "id": 1
                }, {
                    "tid": "2009-09-09T07:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo by",
                    "valgt": false,
                    "id": 2
                }],
            }];
        });

        it("Skal vise velg Tidspunkt", () => {
            const component = shallow(<MotebookingStatusTabell alternativer={alternativer} deltakere={deltakere} status={status} />);
            expect(component.find('.js-velg-tidspunkt')).to.length(1);
        });

        it("Skal vise valgtTidspunkt når alternativ er valgt", () => {
            const component = shallow(<MotebookingStatusTabell alternativer={alternativer} deltakere={deltakere} status={status} />);
            expect(component.find('.motestatus__svar--valgtTidspunkt')).to.length(1);
        });

        it("Skal vise avvistTidspunkt når alternativ er ikke valgt", () => {
            const component = shallow(<MotebookingStatusTabell alternativer={alternativer} deltakere={deltakere} status={status} />);
            expect(component.find('.motestatus__svar--avvistTidspunkt')).to.length(1);
        });

        it("Skal vise ingen svar når bruker ikke har tatt stilling til alternativ", () => {
            const component = shallow(<MotebookingStatusTabell alternativer={alternativer} deltakere={deltakere} status={status} />);
            expect(component.find('.motestatus__svar')).to.length(2);
        });
    });

});