import { expect } from 'chai';
import * as actions from '../../../js/mote/actions/moter_actions';

describe("moter_actions", () => {

    it("Skal ha en opprettMote()-funksjon som returnerer riktig action", () => {
        const action = actions.opprettMote("123456", {
            test: 1
        });
        expect(action).to.deep.equal({
            type: "OPPRETT_MOTE_FORESPURT",
            fnr: "123456",
            data: {
                test: 1
            }
        })
    }); 

    it("Skal ha en oppretterMote()-funksjon som rturnerer riktig action", () => {
        const action = actions.oppretterMote();
        expect(action).to.deep.equal({
            type: "OPPRETTER_MOTE"
        });
    });

    it("Skal ha en hentMoter()-funksjon som returnerer riktig action", () => {
        const action = actions.hentMoter("123");
        expect(action).to.deep.equal({
            type: "HENT_MOTER_FORESPURT",
            fnr: "123"
        })
    });

    it("Skal ha en moteOpprettet()-funksjon som returnerer riktig action", () => {
        const data = {
            test: 1
        }
        const fnr = "1234"
        const action = actions.moteOpprettet(data, fnr);
        expect(action).to.deep.equal({
            type: "MOTE_OPPRETTET",
            data: {
                test: 1
            },
            fnr: "1234"
        })
    });

    it("Skal ha en avbrytMote()-funksjon som returnerer riktig action", () => {
        const action = actions.avbrytMote("fiskekake");
        expect(action).to.deep.equal({
            type: "AVBRYT_MOTE_FORESPURT",
            uuid: "fiskekake"
        })
    })

});