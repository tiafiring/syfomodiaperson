import { expect } from 'chai';
import LederFields, { FyllUtLeder, PreutfyltLeder } from '../../../js/mote/skjema/LederFields';
import ArbeidsgiverDropdown from '../../../js/mote/skjema/ArbeidsgiverDropdown';
import { Field } from 'redux-form';
import { mount, shallow, render } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

describe("FyllUtLeder", () => {
    it("Skal inneholde felter for å skrive inn arbeidsgivers navn og e-post", () => {
        const compo = shallow(<FyllUtLeder />);
        expect(compo.find(Field)).to.have.length(2);
    });

    it("Skal inneholde felter med riktig type for å skrive inn arbeidsgivers opplysninger", () => {
        const compo = shallow(<FyllUtLeder />);
        expect(compo.find(Field).first().prop("name")).to.equal("deltakere[0].navn");
        expect(compo.find(Field).get(1).props.name).equal("deltakere[0].epost");
    });
});

describe("LederFields", () => {
    let arbeidsgiverType;
    let compo;

    beforeEach(() => {
        arbeidsgiverType = {
            input: {
                value: undefined
            }
        }
    })

    it("Skal i utgangspunktet kun vise en ArbeidsgiverDropdown", () => {
        const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
        expect(compo.find(ArbeidsgiverDropdown)).to.have.length(1);
        expect(compo.find(FyllUtLeder)).to.have.length(0);
    });

    it("Skal vise PreutfyltLeder dersom arbeidsgiverType === '0'", () => {
        arbeidsgiverType.input.value = "0";
        const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
        expect(compo.find(ArbeidsgiverDropdown)).to.have.length(1);
        expect(compo.find(PreutfyltLeder)).to.have.length(1);
    });

    it("Skal ikke vise PreutfyltLeder dersom arbeidsgiverType === 'VELG'", () => {
        arbeidsgiverType.input.value = "VELG";
        const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
        expect(compo.find(ArbeidsgiverDropdown)).to.have.length(1);
        expect(compo.find(PreutfyltLeder)).to.have.length(0);
    });

    describe("setLederfelter", () => {
        it("Skal kalle på fyllUtLederfelter dersom valgtArbeidsgiverType = VELG", () => {
            const fyllUtLederfelter = sinon.spy();
            compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
            compo.instance().fyllUtLederfelter = fyllUtLederfelter;
            compo.instance().setLederfelter('VELG');
            expect(fyllUtLederfelter.calledOnce).to.be.true;
        });

        it("Skal kalle på fyllUtLederfelter med leder dersom valgtArbeidsgiverType = '2'", () => {
            const fyllUtLederfelter = sinon.spy();
            const nullstillVirksomhet = sinon.spy();
            const untouch = sinon.spy();
            const ledere = [{
                navn: "Helge",
                epost: "helge@helge.no",
                id: 1
            }, {
                navn: "Ole",
                epost: "ole@ole.no",
                id: 2
            }]
            compo = shallow(<LederFields ledere={ledere} untouch={untouch} nullstillVirksomhet={nullstillVirksomhet} arbeidsgiverType={arbeidsgiverType} />);
            compo.instance().fyllUtLederfelter = fyllUtLederfelter;
            compo.instance().setLederfelter('1');
            expect(fyllUtLederfelter.calledOnce).to.be.true;
            expect(fyllUtLederfelter.calledWith("Helge", "helge@helge.no")).to.be.true;
        });
    });

    describe("fyllUtLederfelter", () => {
        it("Skal kalle på autofill med navn, epost og orgnummer", () => {
            const autofill = sinon.spy();
            const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} autofill={autofill} />);
            compo.instance().fyllUtLederfelter("Helge", "***REMOVED***", "123456789");
            expect(autofill.calledThrice).to.be.true;
            expect(autofill.calledWith("deltakere[0].navn", "Helge")).to.be.true;
            expect(autofill.calledWith("deltakere[0].epost", "***REMOVED***")).to.be.true;
            expect(autofill.calledWith("deltakere[0].orgnummer", "123456789")).to.be.true;
        })
    });

    describe("componentDidUpdate", () => {
        it("Skal kalle på setLederfelter med arbeidsgiverType dersom arbeidsgiverType er forandret", () => {
            const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
            const spy = sinon.spy();
            compo.instance().setLederfelter = spy;
            compo.setProps({
                "arbeidsgiverType": {
                    input: {
                        value: "VELG"
                    }
                }
            });
            compo.instance().componentDidUpdate({
                arbeidsgiverType
            });
            expect(spy.calledOnce).to.be.true;
            expect(spy.calledWith("VELG")).to.be.true;
        });

        it("Skal ikke kalle på setLederfelter med arbeidsgiverType dersom arbeidsgiverType er forandret", () => {
            arbeidsgiverType.input.value = "VELG";
            const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
            const spy = sinon.spy();
            compo.instance().setLederfelter = spy;
            compo.instance().componentDidUpdate({
                arbeidsgiverType
            });
            expect(spy.calledOnce).to.be.false;
        });
    })
});