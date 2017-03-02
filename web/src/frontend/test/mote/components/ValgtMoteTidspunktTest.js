import { expect } from 'chai';
import ValgtMoteTidspunkt from '../../../js/mote/components/ValgtMoteTidspunkt'
import { mount, shallow } from 'enzyme';
import React from 'react'

describe("ValgtMoteTidspunkt", () => {

    let bekreftetTidspunkt = {};
    let valgtAlternativ = {};
    let deltakere = {};
    let ledetekster = {};

    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: "/sykefravaer"
        };
        valgtAlternativ =  {
            "tid": "2012-12-12T11:00:00Z",
            "created": "2011-12-12T11:00:00Z",
            "sted": "Oslo by",
            "valgt": true,
            "id": 1
        };
        bekreftetTidspunkt =  '2013-12-12T11:00:00Z';
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


    it("Indikerer at arbeidsgiver har svart OK", () => {
        let component = shallow(<ValgtMoteTidspunkt ledetekster={ledetekster} deltakere={deltakere} valgtAlternativ={valgtAlternativ} bekreftetTidspunkt={bekreftetTidspunkt} />);
        expect(component.find('.motestatus__svar--valgtTidspunkt')).to.length(1);
    });
    it("Indikerer at sykmeldt ikke har svart", () => {
        let component = shallow(<ValgtMoteTidspunkt ledetekster={ledetekster} deltakere={deltakere} valgtAlternativ={valgtAlternativ} bekreftetTidspunkt={bekreftetTidspunkt} />);
        expect(component.find('.motestatus__svar')).to.length(1);
    });
});