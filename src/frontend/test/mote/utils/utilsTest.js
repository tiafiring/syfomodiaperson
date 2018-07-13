import {expect} from 'chai';
import {
    pad,
    getTidFraZulu,
    getDatoFraZulu,
    genererDato,
    erAlleAlternativerPassert,
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
    });

    describe("erAlleAlternativerPassert", () => {
        let clock;
        const today = new Date('2017-01-16');

        beforeEach(() => {
            clock = sinon.useFakeTimers(today.getTime()); // 16. januar 2017
        });
        afterEach(() => {
            clock.restore();
        });

        it("gir true på alternativer som er passert", () => {
            const alternativer = [
                {
                    tid: new Date("2017-01-15T11:47:04.673Z")
                },
            ];
            const s = erAlleAlternativerPassert(alternativer);
            expect(s).to.equal(true);
        });

        it("gir false på alternativer som er samme dag", () => {
            const alternativer = [
                {
                    tid: new Date("2017-01-16T08:47:04.673Z")
                },
            ];
            const s = erAlleAlternativerPassert(alternativer);
            expect(s).to.equal(false);
        });

        it("Gir false på alternativer som ikke er passert", () => {
            const alternativer = [
                {
                    tid: new Date("2017-01-17T11:47:04.673Z")
                }
            ];
            const s = erAlleAlternativerPassert(alternativer);
            expect(s).to.equal(false);
        });
    });

    describe("genererDato", () => {
        let clock;
        const today = new Date('2017-05-31');

        it("31. Mai 10.00 blir riktig", () => {
            const s = genererDato("31.05.2017", "10.00");
            expect(s).to.equal("2017-05-31T10:00:00");
        });

        it("31. Mai 10.00 blir riktig", () => {
            clock = sinon.useFakeTimers(today.getTime()); // 31. Mai 2017
            const s = genererDato("16.06.2017", "10.00");
            expect(s).to.equal("2017-06-16T10:00:00");
        });
    });
});