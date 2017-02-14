import {FyllUtVirksomhet, parseOrgnummer} from '../../../js/mote/skjema/FyllUtVirksomhet';
import React from 'react';
import {Field} from 'redux-form';
import {mount, shallow, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import TextField from '../../../js/components/TextField';

describe("FyllUtVirksomhet", () => {
    let ledetekster;
    beforeEach(() => {
        ledetekster = {
            'mote.bookingskjema.fyllutvirksomhet.orgnummer.feilmelding': "feilmelding",
            'mote.bookingskjema.fyllutvirksomhet.orgnummer.henter': "Henter navn på virksomhet"
        };
    });
    it("Skal inneholde et Field", () => {
        const compo = shallow(<FyllUtVirksomhet />);
        expect(compo.find(Field)).to.have.length(1);
        expect(compo.find(Field).prop("component")).to.equal(TextField);
    });

    it("Skal vise virksomhetsnavn dersom det er sendt inn", () => {
        const compo = shallow(<FyllUtVirksomhet virksomhetsnavn={"olsens sykkelbud"}/>);
        expect(compo.text()).to.contain("olsens sykkelbud");
    });

    it("Skal vise feilmelding dersom det er feil", () => {
        const compo = shallow(<FyllUtVirksomhet virksomhetsnavn={"olsens sykkelbud"} erFeil
                                                ledetekster={ledetekster}/>);
        expect(compo.find(".js-feilmelding").text()).not.to.equal("");
    });

    it("Skal ikke vise feilmelding dersom det er feil", () => {
        const compo = shallow(<FyllUtVirksomhet virksomhetsnavn={"olsens sykkelbud"}/>);
        expect(compo.find(".js-feilmelding").text()).to.equal("");
    });

    it("Skal vise henter dersom det henter", () => {
        const compo = shallow(<FyllUtVirksomhet henter ledetekster={ledetekster} />)
        expect(compo.text()).to.contain("Henter navn på virksomhet");
    });

    it("Skal hente virksomhet ved componentDidUpdate() dersom orgnummer består av 9 siffer", () => {
        const hentVirksomhet = sinon.spy();
        const compo = shallow(<FyllUtVirksomhet hentVirksomhet={hentVirksomhet} orgnummer="123456789"/>);
        compo.instance().componentDidUpdate({
            orgnummer: "12345678"
        })
        expect(hentVirksomhet.calledWith("123456789")).to.be.true;
    });

    it("Skal ikke hente virksomhet ved componentDidUpdate() dersom orgnummer består av 8 siffer", () => {
        const hentVirksomhet = sinon.spy();
        const compo = shallow(<FyllUtVirksomhet hentVirksomhet={hentVirksomhet} orgnummer="12356789"/>);
        compo.instance().componentDidUpdate({
            orgnummer: "123456789"
        })
        expect(hentVirksomhet.called).to.be.false;
    });

    it("Skal ikke hente virksomhet ved componentDidUpdate() dersom orgnummer består av 10 siffer", () => {
        const hentVirksomhet = sinon.spy();
        const compo = shallow(<FyllUtVirksomhet hentVirksomhet={hentVirksomhet} orgnummer="1234567890"/>);
        compo.instance().componentDidUpdate({
            orgnummer: "123456789"
        })
        expect(hentVirksomhet.called).to.be.false;
    });

});

describe("parseOrgnummer", () => {

    it("Skal returnere orgnummer", () => {
        const nr = parseOrgnummer("123");
        expect(nr).to.equal("123");
    });

    it("Skal filtrere bort bokstaver", () => {
        const nr = parseOrgnummer("123A");
        expect(nr).to.equal("123");
    });

    it("Skal filtrere bort alt etter 9 siffer", () => {
        const nr = parseOrgnummer("1234567890");
        expect(nr).to.equal("123456789");
    });

});