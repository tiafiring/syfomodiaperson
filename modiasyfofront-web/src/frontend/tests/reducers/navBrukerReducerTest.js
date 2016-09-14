import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import navBruker from '../../js/reducers/navBruker.js';

describe('navBruker', () => {

    it("Returnerer {} ved initializering", () => {
        const nextState = navBruker();
        expect(nextState).to.deep.equal({});
    });

    it("håndterer SET_NAVBRUKER", () => {
        const initialState = deepFreeze({});
        const action = {
            type: 'SET_NAVBRUKER',
            data: {
                navn: "Kurt Nilsen"
            },
        };
        const nextState = navBruker(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: {
                navn: "Kurt Nilsen"
            }
        });

    });

});