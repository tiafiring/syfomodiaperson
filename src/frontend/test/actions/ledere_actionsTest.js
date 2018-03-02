import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/ledere_actions.js';

describe('ledere_actions', () => {

    it("Har en hentLedere()-funksjon", () => {
        const res = actions.hentLedere("44");
        expect(res).to.deep.equal({
            type: "HENT_LEDERE_FORESPURT",
            fnr: "44"
        })
    });

});