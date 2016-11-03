import { expect } from 'chai';
import { pad, getTidFraZulu } from '../../../js/mote/utils';

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

    })

});