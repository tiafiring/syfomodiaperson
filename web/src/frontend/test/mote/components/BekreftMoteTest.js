import { expect } from 'chai';
import BekreftMote, { InnholdsviserContainer } from '../../../js/mote/components/BekreftMote'
import { mount, shallow } from 'enzyme';
import React from 'react'
import { konstanter } from 'moter-npm';
import Epostmottakere from '../../../js/mote/components/Epostmottakere'

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

describe("BekreftMoteComponent", () => {

    let ledetekster;
    let mote;

    beforeEach(() => {
        mote = getMote();
        ledetekster = {
            "mote.bekreftmote.lightbox-overskrift": "Bekreft møteforespørsel"
        }
    })

    it("Viser tittel", () => {
        let component = shallow(<BekreftMote
            mote={mote}
            ledetekster={ledetekster} />);
        expect(component.text()).to.contain("Bekreft møteforespørsel");
    })

    it("Viser mottakere det er to mottakere", () => {
        let component = shallow(<BekreftMote mote={mote} ledetekster={ledetekster} />);
        expect(component.find(Epostmottakere)).to.have.length(1);
        expect(component.find(Epostmottakere).prop("mote")).to.deep.equal(mote);
        expect(component.find(Epostmottakere).prop("ledetekster")).to.deep.equal(ledetekster);
    });

    it("Viser en InnholdsviserContainer", () => {
        let component = shallow(<BekreftMote mote={mote} ledetekster={ledetekster}/>);
        expect(component.find(InnholdsviserContainer)).to.have.length(1);
    });


});