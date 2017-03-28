import { expect } from 'chai';
import { formaterTid, lagNummer } from '../../js/utils';

describe("utils", () => {

    describe("formaterTid", () => {

        it("Skal returnere tid dersom tid er på riktig format", () => {
            var tid = formaterTid("08.00");
            expect(tid).to.equal("08.00");
        });

        it("Skal returnere tid dersom tid er på feil format uten punktum", () => {
            var tid = formaterTid("0800");
            expect(tid).to.equal("08.00");
        });

        it("Skal sette inn punktum selv om strengen ikke består av 4 tegn", () => {
            var tid = formaterTid("08");
            expect(tid).to.equal("08");

            tid = formaterTid("08.");
            expect(tid).to.equal("08.")

            tid = formaterTid("080");
            expect(tid).to.equal("08.0")

            tid = formaterTid("08.0");
            expect(tid).to.equal("08.0")
        });

        it("Skal fjerne spesialtegn unntatt punktum", () => {
            var dato = formaterTid("08:");
            expect(dato).to.equal("08");
        });

        it("Skal fjerne bokstaver unntatt punktum", () => {
            var dato = formaterTid("34w");
            expect(dato).to.equal("34");
        });


    });

    describe("lagNummer", () => {
        it("Skal fjerne bokstaver", () => {
            const n = lagNummer("12f");
            expect(n).to.equal("12");
        });

        it("Skal fjerne bindestrek", () => {
            const n = lagNummer("12f-");
            expect(n).to.equal("12");
        });
    })

})

