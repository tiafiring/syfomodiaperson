import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import navbruker from '../../js/reducers/navbruker.js';

describe('navbruker', () => {

    it("Returnerer { data: {} } ved initializering", () => {
        const nextState = navbruker();
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
        const nextState = navbruker(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: {
                navn: "Kurt Nilsen"
            }
        });

    });

});