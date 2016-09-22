import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as actions from '../../js/actions/brukersSykmeldinger_actions.js';

describe('navsSykmeldinger_actions', () => {

    it("Har en setBrukersSykmeldinger()-funksjon", () => {
        const sykmeldinger = [{
            navn: "***REMOVED***"
        }]
        const res = actions.setBrukersSykmeldinger(sykmeldinger);
        expect(res).to.deep.equal({
            type: "SET_BRUKERS_SYKMELDINGER",
            data: [{
                navn: "***REMOVED***"
            }]
        })
    });

});