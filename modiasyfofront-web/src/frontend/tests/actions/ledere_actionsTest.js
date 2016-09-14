import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/ledere_actions.js';

describe('ledere_actions', () => {

    it("Har en setLedere()-funksjon", () => {
        const ledere = [{
            navn: "***REMOVED***"
        }]
        const res = actions.setLedere(ledere);
        expect(res).to.deep.equal({
            type: "SET_LEDERE",
            data: [{
                navn: "***REMOVED***"
            }]
        })
    });

    it("Har en toggleApenLeder()-funksjon", () => {
        const lederId = 1;
        const res = actions.toggleApenLeder(lederId);
        expect(res).to.deep.equal({
            type: "TOGGLE_APEN_LEDER",
            lederId: 1
        })
    });

});