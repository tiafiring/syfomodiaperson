import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/navsSykmeldinger_actions.js';

describe('navsSykmeldinger_actions', () => {

    it("Har en setNavsSykmeldinger()-funksjon", () => {
        const sykmeldinger = [{
            navn: "***REMOVED***"
        }]
        const res = actions.setNavsSykmeldinger(sykmeldinger);
        expect(res).to.deep.equal({
            type: "SET_NAVS_SYKMELDINGER",
            data: [{
                navn: "***REMOVED***"
            }]
        })
    });

});