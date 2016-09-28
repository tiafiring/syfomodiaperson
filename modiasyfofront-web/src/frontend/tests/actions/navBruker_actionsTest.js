import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/navbruker_actions.js';

describe('navbruker_actions', () => {

    it("Har en setNavbruker()-funksjon", () => {
        const navBruker = {
            navn: "***REMOVED***"
        }
        const res = actions.setNavbruker(navBruker);
        expect(res).to.deep.equal({
            type: "SET_NAVBRUKER",
            data: {
                navn: "***REMOVED***"
            }
        })
    });

});