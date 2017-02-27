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
});