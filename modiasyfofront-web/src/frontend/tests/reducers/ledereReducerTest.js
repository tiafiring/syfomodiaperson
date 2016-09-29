import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import ledere from '../../js/reducers/ledere.js';

describe('ledere', () => {

    it("Returnerer { data: [] } ved initializering", () => {
        const nextState = ledere();
        expect(nextState).to.deep.equal({ data: []});
    });

    it("håndterer LEDERE_HENTET", () => {
        const initialState = deepFreeze({});
        const action = {
            type: 'LEDERE_HENTET',
            data: [{
                navn: "Kurt Nilsen"
            }, {
                navn: "Hans Hansen"
            }, {
                navn: "Nina Knutsen"
            }],
        };
        const nextState = ledere(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [{
                navn: "Kurt Nilsen"
            }, {
                navn: "Hans Hansen"
            }, {
                navn: "Nina Knutsen"
            }]
        });

    });

    it("håndterer HENTER_LEDERE", () => {
        const initialState = deepFreeze({
            henter: false,
        });
        const action = {
            type: 'HENTER_LEDERE'
        }
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
        })
    });

    it("håndterer HENT_LEDERE_FEILET", () => {
        const initialState = deepFreeze({
            henter: false,
        });
        const action = {
            type: 'HENT_LEDERE_FEILET'
        }
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: true,
            data: []
        })
    });

    it("håndterer TOGGLE_APEN_LEDER når lederen er lukket", () => {
        const initialState = deepFreeze({
            henter: false,
            hentingFeilet: false,
            data: [{
                id: 3,
                navn: "Kurt Nilsen"
            }, {
                id: 4,
                navn: "Kurt Hansen"
            }, {
                id: 5,
                navn: "Kurt Jensen"
            }]
        });
        const action = {
            type: "TOGGLE_APEN_LEDER",
            lederId: 3
        };
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [{
                id: 3,
                navn: "Kurt Nilsen",
                erApen: true,
            }, {
                id: 4,
                navn: "Kurt Hansen"
            }, {
                id: 5,
                navn: "Kurt Jensen"
            }]
        })
    });

    it("håndterer TOGGLE_APEN_LEDER når lederen er åpen", () => {
        const initialState = deepFreeze({
            henter: false,
            hentingFeilet: false,
            data: [{
                id: 3,
                navn: "Kurt Nilsen",
                erApen: true,
            }, {
                id: 4,
                navn: "Kurt Hansen"
            }, {
                id: 5,
                navn: "Kurt Jensen"
            }]
        });
        const action = {
            type: "TOGGLE_APEN_LEDER",
            lederId: 3
        };
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [{
                id: 3,
                navn: "Kurt Nilsen",
                erApen: false,
            }, {
                id: 4,
                navn: "Kurt Hansen"
            }, {
                id: 5,
                navn: "Kurt Jensen"
            }]
        })
    });

});