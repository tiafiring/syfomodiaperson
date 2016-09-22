import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import brukersSykmeldinger from '../../js/reducers/brukersSykmeldinger';
import * as actions from '../../js/actions/brukersSykmeldinger_actions';

describe("brukersSykmeldinger", () => {
    it("Skal håndtere SET_ARBEIDSGIVERS_SYKMELDINGER", () => {
        const state = deepFreeze({
            data: []
        });
        const nextState = brukersSykmeldinger(state, actions.setBrukersSykmeldinger([{
            navn: "Olsen"
        }]));
        expect(nextState).to.deep.equal({
            data: [{
                navn: "Olsen"
            }]
        })
    });
})
