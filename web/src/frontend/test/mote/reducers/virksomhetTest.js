import {expect} from 'chai';
import virksomhet from '../../../js/mote/reducers/virksomhet';
import * as actions from '../../../js/mote/actions/virksomhet_actions';
import deepFreeze from 'deep-freeze';

describe("virksomhet", () => {

    it("Har en default state", () => {
        const state = virksomhet();
        expect(state).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: false,
            navn: ""
        })
    });

    it("Håndterer henterVirksomhet()", () => {
        const action = actions.henterVirksomhet();
        const currentState = deepFreeze({})
        const state = virksomhet(currentState, action);
        expect(state).to.deep.equal({
            henter: true,
            hentingFeilet: false,
            navn: "henter virksomhet..."
        })
    });

    it("Håndterer virksomhetHentet", () => {
        const data = {

            navn: "NAV Consulting",
        }
        const action = actions.virksomhetHentet(data);
        const currentState = {
            data: {},
            henter: true,
            hentingFeilet: false
        };
        const nextState = virksomhet(currentState, action);
        expect(nextState).to.deep.equal({
            navn: "NAV Consulting",
            data: {
                navn: "NAV Consulting",
            },
            henter: false,
            hentingFeilet: false,
        })
    });

    it("Håndterer hentVirksomhetFeilet", () => {
        const action = actions.hentVirksomhetFeilet();
        const currentState = {
            data: {},
            henter: true,
            hentingFeilet: false,
        };
        const nextState = virksomhet(currentState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: true,
            navn: "Fant ikke virksomhet",
        })
    });

    it("Håndterer nullstillVirksomhet", () => {
        const action = actions.nullstillVirksomhet();
        const currentState = {
            data: {},
            henter: false,
            hentingFeilet: false,
            navn: "NAV Consulting",
        };
        const nextState = virksomhet(currentState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: false,
            navn: "",
        })
    });

});