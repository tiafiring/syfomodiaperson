import { expect } from 'chai';
import NaermesteLedere from '../../js/components/NaermesteLedere'
import { mount, shallow, render } from 'enzyme';
import React from 'react'

describe("NaermesteLedere", () => {

    const ledere = [{
        arbeidsgiver: {
            navn: "BEKK",
            orgnummer: "123"
        },
        navn: "Ole",
        tlf: "11223344",
        epost: "ole@bekk.no",
        fodselsdato: "08.02.1975"
    }, {
        arbeidsgiver: {
            navn: "NAV",
            orgnummer: "456"
        },
        navn: "Ole",
        tlf: "11223344",
        epost: "ole@nav.no",
        fodselsdato: "08.02.1985"
    }, {
        arbeidsgiver: {
            navn: "Peppes",
            orgnummer: "789"
        },
        navn: "Ole",
        tlf: "11223344",
        epost: "ole@peppes.no",
        fodselsdato: "08.02.1995"
    }];

    const navbruker = {
        navn: "Knut"
    }

    it("Skal vise en oppføring per leder", () => {
        const compo = mount(<NaermesteLedere ledere={ledere} />);
        expect(compo.find(".js-leder")).to.have.length(3);
    });

    it("Skal vise alle opplysninger om lederen", () => {
        const compo = mount(<NaermesteLedere ledere={ledere} />);
        const text = compo.find(".js-leder").first().text();
        expect(text).to.contain("BEKK");
        expect(text).to.contain("123");
        expect(text).to.contain("Ole");
        expect(text).to.contain("11223344");
        expect(text).to.contain("ole@bekk.no");
        expect(text).to.contain("08.02.1975");
    });

    it("Skal vise en melding dersom ingen ledere er oppgitt", () => {
        const compo = render(<NaermesteLedere ledere={[]} navbruker={navbruker} />);
        expect(compo.text()).to.contain("Nærmeste leder med personalansvar for Knut er ikke oppgitt.")
    });

    it("Skal vise riktig tittel dersom det er ingen ledere", () => {
        const compo = render(<NaermesteLedere ledere={ledere} navbruker={navbruker} />);
        expect(compo.find(".js-tittel").text()).to.equal("Nærmeste ledere med personalansvar");
    }); 

    it("Skal vise riktig tittel dersom det er ingen ledere", () => {
        const compo = render(<NaermesteLedere ledere={[]} navbruker={navbruker} />);
        expect(compo.find(".js-tittel").text()).to.equal("Nærmeste leder med personalansvar");
    }); 

    it("Skal vise riktig tittel dersom det er én leder", () => {
        const ledere2 = [{
            arbeidsgiver: {
                navn: "BEKK",
                orgnummer: "123"
            },
            navn: "Ole",
            tlf: "11223344",
            epost: "ole@bekk.no",
            fodselsdato: "08.02.1975"
        }]
        const compo = render(<NaermesteLedere ledere={ledere2} navbruker={navbruker} />);
        expect(compo.find(".js-tittel").text()).to.equal("Nærmeste leder med personalansvar");
    }); 

});