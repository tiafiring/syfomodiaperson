import { expect } from 'chai';
import MotebookingStatus from '../../../js/mote/skjema/MotebookingStatus'
import { mount, shallow } from 'enzyme';
import React from 'react'

describe("møtestatus", () => {
    it("Viser ikke svart om bruker ikke har svart", () => {

        const mote = {
            tidOgStedAlternativer: [
                {
                    tid: "2012-12-12T11:12:00Z",
                    sted: "sted1",
                }, {
                    tid: "2012-12-12T12:12:00Z",
                    sted: "sted2",
                }
            ],
            deltakere: [{
                tidOgSted: [
                    {
                        tid:"2012-12-12T11:12:00Z",
                        sted:"sted1",
                        valgt: false,
                    },
                    {
                        tid: "2012-12-12T12:12:00Z",
                        sted: "sted2",
                        valgt: false,
                    }
                ],
                type: "arbeidsgiver",
                navn: "navn",
                avvik: [],
            }
            ],
        };

        let component = shallow(<MotebookingStatus mote={mote}/>);

        expect(component.find('.motestatus__svartekst--ikkesvar')).to.length(2);
        expect(component.find('.motestatus__svartekst--ikkesvar').first().text()).to.equal('ikke svart');
        expect(component.find('.motestatus__ikon').first().prop('src')).to.equal('/sykefravaer/img/svg/status--ikkesvar.svg');
    });

    it("Viser kan om et tidspunkt passer og kan ikke om et tidspunkt ikke passer", () => {
        const mote = {
            tidOgStedAlternativer: [
                {
                    tid: "2012-12-12T11:12:00Z",
                    sted: "sted1",
                }, {
                    tid: "2012-12-12T12:12:00Z",
                    sted: "sted2",
                }
            ],
            deltakere: [{
                tidOgSted: [
                    {
                        tid:"2012-12-12T11:12:00Z",
                        sted:"sted1",
                        valgt: true,
                    },
                    {
                        tid: "2012-12-12T12:12:00Z",
                        sted: "sted2",
                        valgt: false,
                    }
                ],
                type: "arbeidsgiver",
                navn: "navn",
                avvik: [],
            }
            ],
        };

        let component = shallow(<MotebookingStatus mote={mote}/>);

        expect(component.find('.motestatus__svartekst--ikkesvar')).to.length(0);
        expect(component.find('.motestatus__svartekst--kan')).to.length(1);
        expect(component.find('.motestatus__svartekst--kanikke')).to.length(1);
        expect(component.find('.motestatus__svartekst--kan').text()).to.equal('kan');
        expect(component.find('.motestatus__svartekst--kanikke').text()).to.equal('kan ikke');
        expect(component.find('.motestatus__ikon')).to.be.length(2);
        expect(component.find('.motestatus__ikon').first().prop('src')).to.equal('/sykefravaer/img/svg/status--kan.svg');
        expect(component.find('.motestatus__ikon').last().prop('src')).to.equal('/sykefravaer/img/svg/status--kanikke.svg');
    });
});