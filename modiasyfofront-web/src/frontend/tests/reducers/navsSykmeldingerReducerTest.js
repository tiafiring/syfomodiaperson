import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import navsSykmeldinger from '../../js/reducers/navsSykmeldinger';
import * as actions from '../../js/actions/navsSykmeldinger_actions';

describe("navsSykmeldinger", () => {
    it("Skal håndtere SET_NAVS_SYKMELDINGER", () => {
        const state = deepFreeze({
            data: []
        });
        const nextState = navsSykmeldinger(state, actions.setNavsSykmeldinger([{
            navn: "Olsen"
        }]));
        expect(nextState).to.deep.equal({
            data: [{
                navn: "Olsen"
            }]
        })
    });
})
