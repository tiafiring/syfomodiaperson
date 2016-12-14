import {expect} from 'chai';
import {
    pad,
    getTidFraZulu,
    getDatoFraZulu,
    hentVirksomhetHvis9Siffer,
    virksomhetsnavn
} from '../../../js/mote/utils/index';
import sinon from 'sinon';

describe("utils", () => {

    describe("pad", () => {

        it("Skal legge til en 0 før tall som består av ett siffer (int)", () => {
            const s = pad(8);
            expect(s).to.equal("08");
        });

        it("Skal legge til en 0 før tall som består av ett siffer (streng)", () => {
            const s = pad("8");
            expect(s).to.equal("08");
        });

        it("Skal ikke legge til en 0 før tall som består av to siffer", () => {
            const s = pad("08");
            expect(s).to.equal("08");
        });

    });

    describe("getTidFraZulu", () => {

        it("Skal returnere tid på lesbart format", () => {
            const s = getTidFraZulu("2016-11-03T11:47:04.673Z");
            expect(s).to.equal("03.11.2016 kl. 12.47");
        });

        it("Skal returnere tid på lesbart format når millisekunder ikke er med", () => {
            const s = getTidFraZulu("2016-11-03T11:47:04Z");
            expect(s).to.equal("03.11.2016 kl. 12.47");
        });

    });

    describe("getDatoFraZulu", () => {
        it("Skal returnere dato på lesbart format", () => {
            const s = getDatoFraZulu("2016-11-03T11:47:04.673Z");
            expect(s).to.equal("03.11.2016");
        });
    })

    describe("hentVirksomhetHvis9Siffer", () => {

        beforeEach(() => {
            hentVirksomhet = sinon.spy();
            nullstillVirksomhet = sinon.spy();
        });

        it("kaller hentVirksomhet hvis 9 siffer", () => {
            const input = {
                target: {
                    value: '123456789'
                }
            };
            hentVirksomhetHvis9Siffer(input, hentVirksomhet, nullstillVirksomhet);
            expect(hentVirksomhet.calledOnce).to.be.true;
            expect(nullstillVirksomhet.calledOnce).to.be.false;
        });

        it("kaller nullstillVirksomhet hvis 10 siffer", () => {
            const input = {
                target: {
                    value: '1234567890'
                }
            };
            hentVirksomhetHvis9Siffer(input, hentVirksomhet, nullstillVirksomhet);
            expect(hentVirksomhet.calledOnce).to.be.false;
            expect(nullstillVirksomhet.calledOnce).to.be.true;
        });

        it("kaller nullstillVirksomhet hvis 9 tegn", () => {
            const input = {
                target: {
                    value: 'abcdefghi'
                }
            };
            hentVirksomhetHvis9Siffer(input, hentVirksomhet, nullstillVirksomhet);
            expect(hentVirksomhet.calledOnce).to.be.false;
            expect(nullstillVirksomhet.calledOnce).to.be.true;
        });
    });

    describe("virksomhetsnavn", () => {

        it("henter navn hvis ingenting har feilet", () => {
            const virksomhet = {
                data: {
                    navn: 'BEKK'
                },
                hentingFeilet: false,
                henter: false,
                nullstilt: false,
            };
            const res = virksomhetsnavn(virksomhet);
            expect(res).to.equal("BEKK");
        });

        it("Fant ikke virksomhet hvis henting feilet", () => {
            const virksomhet = {
                data: {
                    navn: 'BEKK'
                },
                hentingFeilet: true,
                henter: false,
                nullstilt: false,
            };
            const res = virksomhetsnavn(virksomhet);
            expect(res).to.equal("Fant ikke virksomhet");
        });

        it("henter virksomhet... hvis henter", () => {
            const virksomhet = {
                data: {
                    navn: 'BEKK'
                },
                hentingFeilet: false,
                henter: true,
                nullstilt: false,
            };
            const res = virksomhetsnavn(virksomhet);
            expect(res).to.equal("henter virksomhet...");
        });

        it("blank hvis nullstilt", () => {
            const virksomhet = {
                data: {
                    navn: 'BEKK'
                },
                hentingFeilet: false,
                henter: false,
                nullstilt: true,
            };
            const res = virksomhetsnavn(virksomhet);
            expect(res).to.equal("");
        });

        it("blank hvis tomt objekt", () => {
            const res = virksomhetsnavn(undefined);
            expect(res).to.equal("");
        });

    });

});