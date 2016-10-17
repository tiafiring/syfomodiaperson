import { expect } from 'chai';
import moter from '../../../js/mote/reducers/moter';
import deepFreeze from 'deep-freeze';

describe("moter", () => {

    it("Håndterer OPPRETT_MOTE", () => {
        const initialState = deepFreeze({
            data: []
        });
        const action = {
            type: 'OPPRETT_MOTE',
            data: {
                "test": 1
            }
        }
        const nextState = moter(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                test: 1
            }]
        });
    })

});