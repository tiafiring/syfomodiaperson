import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import navBruker from '../../js/reducers/navBruker.js';

describe('navBruker', () => {

    it("Returnerer { data: {} } ved initializering", () => {
        const nextState = navBruker();
        expect(nextState).to.deep.equal({
            data: {}
        });
    });

    it("håndterer NAVBRUKER_HENTET", () => {
        const initialState = deepFreeze({});
        const action = {
            type: 'NAVBRUKER_HENTET',
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