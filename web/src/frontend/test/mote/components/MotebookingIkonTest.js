import { expect } from 'chai';
import MotebookingIkon from '../../../js/mote/components/MotebookingIkon'
import { mount, shallow } from 'enzyme';
import React from 'react'

describe("MotebookinIkon", () => {
    it("Viser ikke svart om bruker ikke har svart", () => {

        const deltaker = {
            svar: [
                {
                    tid: "2012-12-12T11:12:00Z",
                    created: "2012-11-12T11:12:00Z",
                    sted: "sted1",
                    valgt: false,
                },
                {
                    tid: "2012-12-12T12:12:00Z",
                    created: "2012-11-12T12:12:00Z",
                    sted: "sted2",
                    valgt: false,
                }
            ],
            type: "arbeidsgiver",
            navn: "navn"
        };
        const index = 0;

        let component = shallow(<MotebookingIkon deltaker={deltaker} index={index}/>);

        expect(component.find('.motestatus__ikon').prop('src')).to.equal('/sykefravaer/img/svg/status--ikkesvar.svg');
    });

    it("Viser kan om deltaker kan", () => {

        const deltaker = {
            svar: [
                {
                    tid: "2012-12-12T11:12:00Z",
                    created: "2012-11-12T11:12:00Z",
                    sted: "sted1",
                    valgt: true,
                },
                {
                    tid: "2012-12-12T12:12:00Z",
                    created: "2012-11-12T11:12:00Z",
                    sted: "sted2",
                    valgt: false,
                }
            ],
            svartTidspunkt: "2012-12-12T11:12:00Z",
            type: "arbeidsgiver",
            navn: "navn"
        };
        const index = 0;

        let component = shallow(<MotebookingIkon deltaker={deltaker} index={index}/>);

        expect(component.find('.motestatus__ikon').prop('src')).to.equal('/sykefravaer/img/svg/status--kan.svg');
    });

    it("Viser kan ikke om deltaker ikke kan", () => {

        const deltaker = {
            svar: [
                {
                    tid: "2012-12-12T11:12:00Z",
                    created: "2012-11-12T11:12:00Z",
                    sted: "sted1",
                    valgt: true,
                },
                {
                    tid: "2012-12-12T12:12:00Z",
                    created: "2012-11-12T11:12:00Z",
                    sted: "sted2",
                    valgt: false,
                }
            ],
            svartTidspunkt: "2012-12-12T11:12:00Z",
            type: "arbeidsgiver",
            navn: "navn",
        };
        const index = 1;

        let component = shallow(<MotebookingIkon deltaker={deltaker} index={index}/>);

        expect(component.find('.motestatus__ikon').prop('src')).to.equal('/sykefravaer/img/svg/status--kanikke.svg');
    });
});