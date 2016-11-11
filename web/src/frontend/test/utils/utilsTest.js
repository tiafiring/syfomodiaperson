import { expect } from 'chai';
import { formaterDato, formaterTid } from '../../js/utils';

describe("utils", () => {

    describe("formaterDato", () => {

        it("Skal returnere dato dersom dato er på riktig format", () => {
            var dato = formaterDato("08.02.1985");
            expect(dato).to.equal("08.02.1985");
        });

        it("Skal returnere dato dersom dato er på feil format, uten punktum", () => {
            var dato = formaterDato("08021964");
            expect(dato).to.equal("08.02.1964");
        });


        it("Skal returnere dato dersom dato er på riktig format uten årstall", () => {
            var dato = formaterDato("08.02.85");
            expect(dato).to.equal("08.02.85");
        });

        it("Skal returnere dato dersom dato er på feil format, uten punktum", () => {
            var dato = formaterDato("080264");
            expect(dato).to.equal("08.02.64");
        });

        it("Skal sette inn punktum på riktig sted selv om strengen ikke består av 8 tegn", () => {
            var dato = formaterDato("08");
            expect(dato).to.equal("08");

            var dato1 = formaterDato("23.");
            expect(dato1).to.equal("23.");

            var dato2 = formaterDato("010");
            expect(dato2).to.equal("01.0");

            var dato3 = formaterDato("0202");
            expect(dato3).to.equal("02.02");

            var dato4 = formaterDato("03028");
            expect(dato4).to.equal("03.02.8");

            var dato4 = formaterDato("04.04.");
            expect(dato4).to.equal("04.04.");
        });

        it("Skal fjerne spesialtegn unntatt punktum", () => {
            var dato = formaterDato("08:");
            expect(dato).to.equal("08");
        });

        it("Skal fjerne bokstaver unntatt punktum", () => {
            var dato = formaterDato("34w");
            expect(dato).to.equal("34");
        });

    });

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

})

