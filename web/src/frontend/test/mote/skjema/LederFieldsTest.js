import { expect } from 'chai';
import LederFields, { VelgArbeidsgiver, FyllUtLeder, ArbeidsgiverDropdown } from '../../../js/mote/skjema/LederFields';
import TextFieldLocked from '../../../js/components/TextFieldLocked';
import TextField from '../../../js/components/TextField';
import { Fields, Field } from 'redux-form';
import { mount, shallow, render } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

describe("FyllUtLeder", () => {
    it("Skal inneholde felter for å skrive inn arbeidsgivers opplysninger", () => {
        const compo = shallow(<FyllUtLeder />);
        expect(compo.find(Field)).to.have.length(3);
    });

    it("Skal inneholde felter med riktig type for å skrive inn arbeidsgivers opplysninger", () => {
        const compo = shallow(<FyllUtLeder />);
        expect(compo.find(Field).first().prop("name")).to.equal("deltakere[0].navn");
        expect(compo.find(Field).get(1).props.name).equal("deltakere[0].epost");
        expect(compo.find(Field).last().prop("name")).to.equal("deltakere[0].orgnummer");
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

    it("Skal vise FyllUtLeder med riktig FieldComponent dersom arbeidsgiverType === 'manuell'", () => {
        arbeidsgiverType.input.value = "manuell";
        const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
        expect(compo.find(ArbeidsgiverDropdown)).to.have.length(1);
        expect(compo.find(FyllUtLeder)).to.have.length(1);
        expect(compo.find(FyllUtLeder).prop("FieldComponent")).to.equal(TextField);
    });

    it("Skal vise FyllUtLeder med riktig FieldComponent dersom arbeidsgiverType === '0'", () => {
        arbeidsgiverType.input.value = "0";
        const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
        expect(compo.find(ArbeidsgiverDropdown)).to.have.length(1);
        expect(compo.find(FyllUtLeder)).to.have.length(1);
        expect(compo.find(FyllUtLeder).prop("FieldComponent")).to.equal(TextFieldLocked);
    });

    it("Skal ikke vise FyllUtLeder dersom arbeidsgiverType === 'VELG'", () => {
        arbeidsgiverType.input.value = "VELG";
        const compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
        expect(compo.find(ArbeidsgiverDropdown)).to.have.length(1);
        expect(compo.find(FyllUtLeder)).to.have.length(0);
    });

    describe("setLederfelter", () => {
        it("Skal kalle på fyllUtLederfelter dersom valgtArbeidsgiverType = VELG", () => {
            const fyllUtLederfelter = sinon.spy();
            compo = shallow(<LederFields arbeidsgiverType={arbeidsgiverType} />);
            compo.instance().fyllUtLederfelter = fyllUtLederfelter;
            compo.instance().setLederfelter('VELG');
            expect(fyllUtLederfelter.calledOnce).to.be.true;
        });

        it("Skal kalle på fyllUtLederfelter, nullstillVirksomhet og untouch dersom valgtArbeidsgiverType = 'manuell'", () => {
            const nullstillVirksomhet = sinon.spy();
            const fyllUtLederfelter = sinon.spy();
            const untouch = sinon.spy();
            compo = shallow(<LederFields untouch={untouch} arbeidsgiverType={arbeidsgiverType} nullstillVirksomhet={nullstillVirksomhet} />);
            compo.instance().fyllUtLederfelter = fyllUtLederfelter;
            compo.instance().setLederfelter('manuell');
            expect(fyllUtLederfelter.calledOnce).to.be.true;
            expect(nullstillVirksomhet.calledOnce).to.be.true;
            expect(untouch.calledWith('deltakere[0].navn', 'deltakere[0].epost', 'deltakere[0].orgnummer')).to.be.true;
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
})

describe("ArbeidsgiverDropdown", () => {

    let meta;
    let ledere;

    beforeEach(() => {
        meta = {}
        ledere = [{
            id: 1,
            navn: "Bjarne",
            organisasjonsnavn: "BEKK"
        }, {
            id: 2,
            navn: "Arne", 
            organisasjonsnavn: "BEKK"
        }, {
            id: 3, 
            navn: "Abba",
            organisasjonsnavn: "BEKK"
        }, {
            id: 4,
            navn: "Aage",
            organisasjonsnavn: "ABC Buss"
        }]
    });

    it("Skal inneholde et valg for manuell utfylling", () => {
        const compo = mount(<ArbeidsgiverDropdown meta={meta} ledere={ledere} />);
        expect(compo.find("option")).to.have.length(6);
        expect(compo.find("option").last().text()).to.contain("fyll inn manuelt")
    });

});