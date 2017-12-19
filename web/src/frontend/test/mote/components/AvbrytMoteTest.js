import { expect } from 'chai';
import AvbrytMote, { Innholdsviser, InnholdsviserContainer, Innholdsvelger, mapStateToInnholdsviserProps } from '../../../js/mote/components/AvbrytMote';
import Epostmottakere from '../../../js/mote/components/Epostmottakere';
import AppSpinner from '../../../js/components/AppSpinner';
import { mount, shallow } from 'enzyme';
import React from 'react'
import sinon from 'sinon';
import { konstanter } from 'moter-npm';

const { BRUKER, ARBEIDSGIVER } = konstanter;

const getMote = (mote) => {
    return Object.assign({}, {
      "status": "OPPRETTET",
      "opprettetTidspunkt": new Date("2017-02-22T15:18:24.323"),
      "bekreftetTidspunkt": null,
      "deltakere": [{
        "hendelser": [],
        "deltakerUuid": "uuid1",
        "navn": "Are Arbeidsgiver",
        "orgnummer": "***REMOVED***",
        "epost": "are.arbeidsgiver@nav.no",
        "type": "arbeidsgiver",
        "svartidspunkt": null,
        "svar": [{
          "id": 1,
          "tid": new Date("2017-03-07T15:18:24.323"),
          "created": new Date("2017-02-22T15:18:24.323"),
          "sted": "Sannergata 2",
          "valgt": false
        }, {
          "id": 2,
          "tid": new Date("2017-03-09T15:18:24.323"),
          "created": new Date("2017-02-22T15:18:24.323"),
          "sted": "Sannergata 2",
          "valgt": false
        }]
      }, {
        "hendelser": [],
        "deltakerUuid": "uuid2",
        "navn": "Sygve Sykmeldt",
        "orgnummer": null,
        "epost": null,
        "type": "Bruker",
        "svartidspunkt": null,
        "svar": [{
          "id": 1,
          "tid": new Date("2017-03-07T15:18:24.323"),
          "created": new Date("2017-02-22T15:18:24.323"),
          "sted": "Sannergata 2",
          "valgt": false
        }, {
          "id": 2,
          "tid": new Date("2017-03-09T15:18:24.323"),
          "created": new Date("2017-02-22T15:18:24.323"),
          "sted": "Sannergata 2",
          "valgt": false
        }]
      }],
      "bekreftetAlternativ": null,
      "alternativer": [{
        "id": 1,
        "tid": new Date("2017-03-07T15:18:24.323"),
        "created": new Date("2017-02-22T15:18:24.323"),
        "sted": "Sannergata 2",
        "valgt": false
      }, {
        "id": 2,
        "tid": new Date("2017-02-25T15:18:24.323"),
        "created": new Date("2017-02-22T15:18:24.323"),
        "sted": "Sannergata 2",
        "valgt": false
      }]
    }, mote);
};

describe("AvbrytMote-", () => {

    let mote;
    let navbruker;
    let ledetekster;

    beforeEach(() => {
        mote = getMote();
        ledetekster = {
            'mote.avbrytmote.overskrift': "Avbryt møte"
        };
        navbruker = {
            data: {
                kontaktinfo: {
                    skalHaVarsel: true,
                }
            }
        };
    });

    it("Viser tittel", () => {
        let component = shallow(<AvbrytMote
            navbruker={navbruker}
            mote={mote}
            ledetekster={ledetekster} />);
        expect(component.text()).to.contain("Avbryt møte");
    })

    it("Viser Epostmottakere når det er to mottakere", () => {
        let component = shallow(<AvbrytMote mote={mote} navbruker={navbruker} />);
        expect(component.find(Epostmottakere)).to.have.length(1);
        expect(component.find(Epostmottakere).prop("mote")).to.deep.equal(mote)
    });

    it("Viser en InnholdsviserContainer", () => {
        let component = shallow(<AvbrytMote navbruker={navbruker} mote={mote} ledetekster={ledetekster}/>);
        expect(component.find(InnholdsviserContainer)).to.have.length(1);
    });


    describe("mapStateToInnholdsviserProps", () => {

        let state; 

        beforeEach(() => {
            state = {
                epostinnhold: {
                    data: {},
                    henter: false,
                    hentingFeilet: false,
                },
                navbruker: {
                    data: {},
                    henter: false,
                    hentingFeilet: false,
                }
            }
        });

        it("Skal returnere epostinnhold, henter og hentingFeilet", () => {
            const res = mapStateToInnholdsviserProps(state);
            expect(res.epostinnhold).to.deep.equal({});
            expect(res.henter).to.be.false;
            expect(res.hentingFeilet).to.be.false;
        });

        it("Skal returnere hentingFeilet", () => {
            state.epostinnhold.hentingFeilet = true;
            const res = mapStateToInnholdsviserProps(state);
            expect(res.hentingFeilet).to.be.true;
        });

        it("Skal returnere henter", () => {
            state.epostinnhold.henter = true;
            const res = mapStateToInnholdsviserProps(state);
            expect(res.henter).to.be.true;  
        });

    });

});