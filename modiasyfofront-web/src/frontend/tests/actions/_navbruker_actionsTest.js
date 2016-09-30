import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/navbruker_actions.js';

describe('navbruker_actions', () => {

    it("Har en hentNavbruker()-funksjon", () => {
        const res = actions.hentNavbruker();
        expect(res).to.deep.equal({
            type: "HENT_NAVBRUKER_FORESPURT",
        });
    });

});