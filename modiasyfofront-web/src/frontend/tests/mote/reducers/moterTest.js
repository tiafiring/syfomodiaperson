import { expect } from 'chai';
import moter from '../../../js/mote/reducers/moter';
import * as actions from '../../../js/mote/actions/moter_actions';
import deepFreeze from 'deep-freeze'; 

describe("moter", () => {

    it("Håndterer OPPRETTER_MOTE", () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = actions.oppretterMote();
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            sender: true,
            sendingFeilet: false,
            henter: false,
            hentingFeilet: false,
        });
    });

    it("Håndterer MOTE_OPPRETTET", () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = actions.moteOpprettet({
            "test": "OK"
        }, "hei")
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                "test": "OK",
                "fnr": "hei"
            }],
            sender: false,
            sendingFeilet: false,
            henter: false,
            hentingFeilet: false,
        });
    });

    it("Håndterer OPPRETT_MOTE_FEILET", () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = actions.opprettMoteFeilet();
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            sender: false,
            sendingFeilet: true,
            henter: false,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENTER_MOTER", () => {
        const initialState = deepFreeze({});
        const action = actions.henterMoter();
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            sender: false,
            henter: true,
            hentingFeilet: false,
            sendingFeilet: false,
        })
    });

    it("Håndterer MOTER_HENTET", () => {
        const initialState = deepFreeze({
            data: [{}],
            henter: true,
        });
        const action = actions.moterHentet([{
            id: 1
        }]);
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                id: 1
            }],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        })
    });

    it("Håndterer HENT_MOTER_FEILET", () => {
        const initialState = deepFreeze({});
        const action = actions.hentMoterFeilet();
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: true,
            sender: false,
            sendingFeilet: false,
        });
    })

});