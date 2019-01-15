import { expect } from 'chai';
import sinon from 'sinon';
import KnappBase from 'nav-frontend-knapper';
import BekreftMote, { InnholdsviserContainer } from '../../../js/mote/components/BekreftMoteSkjema';
import BekreftMoteSkjema from '../../../js/mote/components/BekreftMoteSkjema';
import BekreftMoteUtenSvarSkjema from '../../../js/mote/components/BekreftMoteUtenSvarSkjema';
import { mount, shallow } from 'enzyme';
import React from 'react'
import {
    BRUKER,
    ARBEIDSGIVER,
} from '../../../js/konstanter';
import Epostmottakere from '../../../js/mote/components/Epostmottakere';


const getMoteUtenSvar = (mote) => {
    return Object.assign({}, {
      "status": "OPPRETTET",
      "opprettetTidspunkt": new Date("2017-02-22T15:18:24.323"),
      "bekreftetTidspunkt": null,
      "deltakere": [{
        "hendelser": [],
        "deltakerUuid": "uuid1",
        "navn": "Are Arbeidsgiver",
        "orgnummer": "012345678",
        "epost": "are.arbeidsgiver@nav.no",
        "type": ARBEIDSGIVER,
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
        "type": BRUKER,
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

const getMoteMedSvar = (mote) => {
    return Object.assign({}, {
        "status": "OPPRETTET",
        "opprettetTidspunkt": new Date("2017-02-22T15:18:24.323"),
        "bekreftetTidspunkt":  new Date("2017-03-07T15:18:24.323"),
        "deltakere": [{
            "hendelser": [],
            "deltakerUuid": "uuid1",
            "navn": "Are Arbeidsgiver",
            "orgnummer": "012345678",
            "epost": "are.arbeidsgiver@nav.no",
            "type": ARBEIDSGIVER,
            "svartidspunkt": new Date("2017-03-07T15:18:24.323"),
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
                "valgt": true
            }]
        }, {
            "hendelser": [],
            "deltakerUuid": "uuid2",
            "navn": "Sygve Sykmeldt",
            "orgnummer": null,
            "epost": null,
            "type": BRUKER,
            "svartidspunkt": new Date("2017-03-07T15:18:24.323"),
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
                "valgt": true
            }]
        }],
        "bekreftetAlternativ": 1,
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
            "valgt": true
        }]
    }, mote);
};
const getAlternativUtenSvar = (alternativ) => {
    return Object.assign({}, {
        "id": 1,
        "tid": new Date("2017-02-25T15:18:24.323"),
        "created": new Date("2017-02-22T15:18:24.323"),
        "sted": "Sannergata 2",
        "valgt": false
    }, alternativ);
};
const getAlternativMedSvar = (alternativ) => {
    return Object.assign({}, {
        "id": 2,
        "tid": new Date("2017-02-25T15:18:24.323"),
        "created": new Date("2017-02-22T15:18:24.323"),
        "sted": "Sannergata 2",
        "valgt": true
    }, alternativ);
};


describe("BekreftMoteComponent", () => {

    let ledetekster;
    let moteUtenSvar;
    let moteMedSvar;
    let alternativMedSvar;
    let alternativUtenSvar;

    beforeEach(() => {
        moteUtenSvar = getMoteUtenSvar();
        moteMedSvar = getMoteMedSvar();
        alternativMedSvar = getAlternativMedSvar();
        alternativUtenSvar = getAlternativUtenSvar();
        ledetekster = {
            "mote.bekreftmote.lightbox-overskrift": "Bekreft møteforespørsel uten svar"
        }
    });

});

describe("BekreftMoteSkjemaComponent", () => {

    let ledetekster;
    let mote;

    beforeEach(() => {
        mote = getMoteMedSvar();
        ledetekster = {
            "mote.bekreftmote.lightbox-overskrift": "Bekreft møteforespørsel"
        }
    });

    it("Viser tittel", () => {
        let component = shallow(<BekreftMoteSkjema
            mote={mote}
            ledetekster={ledetekster} />);
        expect(component.text()).to.contain("Bekreft møteforespørsel");
    });

    it("Viser mottakere det er to mottakere", () => {
        let component = shallow(<BekreftMoteSkjema mote={mote} ledetekster={ledetekster} />);
        expect(component.find(Epostmottakere)).to.have.length(1);
        expect(component.find(Epostmottakere).prop("mote")).to.deep.equal(mote);
        expect(component.find(Epostmottakere).prop("ledetekster")).to.deep.equal(ledetekster);
    });

    it("Viser en InnholdsviserContainer", () => {
        let component = shallow(<BekreftMoteSkjema mote={mote} ledetekster={ledetekster}/>);
        expect(component.find(InnholdsviserContainer)).to.have.length(1);
    });
});

describe("BekreftMoteUtenSvarSkjemaComponent", () => {

    let ledetekster;
    let mote;
    let handleSubmit = sinon.spy();

    beforeEach(() => {
        mote = getMoteUtenSvar();
        ledetekster = {
            "mote.bekreftmoteutensvar.lightbox-overskrift": "Har du avklart møtet på andre måter?",
        }

    });

    it("Viser tittel", () => {
        let component = shallow(<BekreftMoteUtenSvarSkjema
            mote={mote}
            ledetekster={ledetekster} />);
        expect(component.text()).to.contain("Har du avklart møtet på andre måter?");
    });

    it("Bekrefter at møte er avtalt på annen måte", () => {
        let component = shallow(<BekreftMoteUtenSvarSkjema
            mote={mote}
            ledetekster={ledetekster}
            bekreftMoteUtenSvar={handleSubmit} />);
        component.find(KnappBase).simulate('click');
        expect(handleSubmit.calledOnce).to.be.true;
    });

});
