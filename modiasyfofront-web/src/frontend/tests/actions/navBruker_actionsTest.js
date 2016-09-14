import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/navBruker_actions.js';

describe('navBruker_actions', () => {

    it("Har en setNavBruker()-funksjon", () => {
        const navBruker = {
            navn: "***REMOVED***"
        }
        const res = actions.setNavBruker(navBruker);
        expect(res).to.deep.equal({
            type: "SET_NAVBRUKER",
            data: {
                navn: "***REMOVED***"
            }
        })
    });

});