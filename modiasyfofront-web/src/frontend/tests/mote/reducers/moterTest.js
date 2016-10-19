import { expect } from 'chai';
import moter from '../../../js/mote/reducers/moter';
import deepFreeze from 'deep-freeze';

describe("moter", () => {

    it("Håndterer OPPRETTER_MOTE", () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = {
            type: 'OPPRETTER_MOTE',
        }
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
        const action = {
            type: 'MOTE_OPPRETTET',
            data: {
                "test": "OK"
            }
        }
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                "test": "OK"
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
        const action = {
            type: 'OPPRETT_MOTE_FEILET',
        }
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            sender: false,
            sendingFeilet: true,
            henter: false,
            hentingFeilet: false,
        });
    });

});